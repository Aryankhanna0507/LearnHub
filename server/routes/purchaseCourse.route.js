import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession,verifyPayment} from "../controllers/coursePurchase.controller.js";
const router = express.Router();
router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSession);
// razorpay payment verify
router.route("/verify-payment").post(isAuthenticated,verifyPayment);
// abhi baad me banayenge
// router.route("/course/:courseId/detail-with-status").get();
// router.route("/").get();


export default router;