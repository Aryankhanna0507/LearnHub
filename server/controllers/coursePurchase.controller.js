import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { User } from "../models/user.model.js";
import { Lecture } from "../models/lecture.model.js";
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// create razorpay order
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    // already puchased
    const existingPurchase = await CoursePurchase.findOne({
      courseId,
      userId,
      status:"completed"
    });

    if(existingPurchase){
      return res.status(400).json({
        success:false,
        message:"Course already purchased"
      })
    }

    // create purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // create razorpay order
    const options = {
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `receipt_${newPurchase._id}`,
    };

    const order = await razorpay.orders.create(options);

    newPurchase.orderId = order.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      order,
      message: "Order created successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};


// verify razorpay payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // verify signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment",
      });
    }

    // find purchase
    const purchase = await CoursePurchase.findOne({
     orderId: razorpay_order_id,
    }).populate("courseId");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }
    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );
    purchase.amount = payment.amount / 100;
    // update purchase
    purchase.status = "completed";
    purchase.paymentId = razorpay_payment_id;
    purchase.signature = razorpay_signature;

    await purchase.save();
    // make all lectures visible
      await Lecture.updateMany(
        {
          _id:{
            $in: purchase.courseId.lectures
          }
        },
        {
          $set:{
            isPreviewFree:true
          }
        }
      );
    // add course to user
    await User.findByIdAndUpdate(
      purchase.userId,
      {
        $addToSet: {
          enrolledCourses: purchase.courseId._id,
        },
      },
       {returnDocument:"after"}
    );

    // add student to course
    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      {
        $addToSet: {
          enrolledStudents: purchase.userId,
        },
      },
       {returnDocument:"after"}
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};