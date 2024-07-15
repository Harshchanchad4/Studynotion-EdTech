const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


//resetPasswordToken :- it generate token and send URL with Token to the user;
const resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: 'Your Email is not registered' });
        }

        const token = crypto.randomBytes(20).toString("hex");
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 60 * 1000,
            },
            { new: true });

        const baseUrl = process.env.NODE_ENV === 'production'
            ? 'https://studynotion-ed-tech-uohf.vercel.app/' // replace with your actual deployed URL
            : 'http://localhost:5173';

        const url = `${baseUrl}/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Your Link for email verification is ${url}. Please click this url to reset your password.`);   //send mail containing the url

        return res.json({
            success: true,
            message: 'Email sent successfully, please check email and change pwd',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending reset pwd mail'
        })
    }
};


//resetPassword/
const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;



        if (password !== confirmPassword) {
            return res.json({ success: false, message: 'Password not matching', });
        }

        const userDetails = await User.findOne({ token: token });

        console.log("USERDetails", userDetails);
        ;
        if (!userDetails) {
            return res.json({ success: false, message: 'Token is invalid', });
        }

        if (!(userDetails.resetPasswordExpires > Date.now())) {
            console.log('Current time:', new Date().toISOString());
            console.log('Token expiration time:', userDetails.resetPasswordExpires);
            return res.json({
                success: false,
                message: 'Token is expired, please regenerate your token',
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ token: token }, { password: encryptedPassword }, { new: true },);

        return res.status(200).json({
            success: true,
            message: 'Password reset successful',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending reset pwd mail'
        })
    }
};

module.exports = { resetPasswordToken, resetPassword };