const nodemailer = require('nodemailer');
let config = require('../config/dev.json');

const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: config.email_id,
        pass: config.password,
      }
    });

    const mailOptions = {
      from: config.email_id,
      to: data.to,
      subject: data.subject,
      html: data.html + "<br>Please do not reply to this mail as this is an automated mail service. <br><br>",
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
