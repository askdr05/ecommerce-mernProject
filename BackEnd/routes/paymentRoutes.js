const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { processPayment, sendStripeApikey } = require("../controllers/paymentControllers");
const router = express.Router()

router.route("/payment/process").post(isAuthenticatedUser,processPayment)
router.route("/sendStripeApikey").get(sendStripeApikey)

module.exports = router