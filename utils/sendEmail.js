
const sgMail = require("@sendgrid/mail");
require("dotenv").config()

const sendEmail = async(to,from,subject,text) => {

  const msg = {
    to, 
    from, 
    subject,
    text,
    // html: 'hello',
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent.");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;