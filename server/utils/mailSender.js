const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {                            // with the help of this function we send mail of otp;      
    try{

            console.log("email is" ,email);

            console.log("title   :" , title);
            console.log("body   :" , body);
            console.log("mailuser   :" , process.env.MAIL_USER);
            console.log("mailhost   :" , process.env.MAIL_HOST);
            console.log("mailpass   :" , process.env.MAIL_PASS);




            let transporter = nodemailer.createTransport({                    // we send mail with the help of transporter and here MAIL_USER , MAIL_PASS contain app password of that email which send email 
                host:process.env.MAIL_HOST,                               
                auth:{
                    user: process.env.MAIL_USER,                           
                    pass: process.env.MAIL_PASS,
                }
            })

            let info = await transporter.sendMail({
                from: 'StudyNotion - by Harsh Chanchad',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log("info is : " , info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;