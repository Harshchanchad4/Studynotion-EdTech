// const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
// const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");





exports.enrollStudents = async(req,res) => {

    
    const {courses} = req.body;
    const userId = req.user.id;
    

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{                                            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate({_id:courseId}, {$push:{studentsEnrolled:userId}}, {new:true},)            

        if(!enrolledCourse){
            return res.status(500).json({success:false,message:"Course not Found"});
        }
        // created courseProgress for enrolled Courses in DB;
        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos: [],
        })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,  {$push:{ courses: courseId,  courseProgress: courseProgress._id, }},{new:true})

        ///Send mail to the Student;
        const emailResponse = await mailSender( enrolledStudent.email, `Successfully Enrolled into ${enrolledCourse.courseName}`,  courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)) 

        return res.status(200).json({
            success : true,
            message : `Student Enrolled Successfully into ${enrolledCourse.courseName}`,
            courseProgress
        })

    }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}

