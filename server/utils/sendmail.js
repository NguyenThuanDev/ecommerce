const nodemailer = require("nodemailer");
const fs = require("fs");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "thuanptg1999@gmail.com",
        pass: "ipjslgfugwohqpbc",
    },
});
const html = fs.readFileSync("./utils/mail.html").toString();
const sendMail = async (user, token) => {
    const info = await transporter.sendMail({
        from: '"Digital Ecommerce Store" <thuanptg1999@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Reset Password",
        html: html.replace("{{emailName}}", user.lastname).replace("{{Token}}", token), // html body
    });
    return info;



}


module.exports = sendMail;