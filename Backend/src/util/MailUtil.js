
const mailer=require("nodemailer")

const sendingmail = async (to, subject, text) => {
    try {
      const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
          
      });
  
      const option = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
      };
  
      const mailresponse = await transporter.sendMail(option);
      console.log("Mail sent:", mailresponse);
      return mailresponse;
    } catch (err) {
      console.error("Error in sending mail:", err);
      throw err;
    }
  };
  

module.exports = { sendingmail };