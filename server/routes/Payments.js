const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail , enrollStudents} = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


router.post("/enrollStudent", auth, isStudent, enrollStudents);



module.exports = router