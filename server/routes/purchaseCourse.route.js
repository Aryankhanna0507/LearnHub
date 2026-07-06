import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession,getAllPurchasedCourse,getCourseDataWithPurchaseStatus,verifyPayment} from "../controllers/coursePurchase.controller.js";
const router = express.Router();
router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSession);
// razorpay payment verify
router.route("/verify-payment").post(isAuthenticated,verifyPayment);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDataWithPurchaseStatus);
router.route("/").get(isAuthenticated,getAllPurchasedCourse);


export default router;