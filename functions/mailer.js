
const nodemailer = require("nodemailer");

async function mail(subj, body) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "noreply.pricedown@gmail.com", 
      pass: "jimjamessafatarpita", 
    },
  });

  try {
    let info = await transporter.sendMail({
        from: '"Price Tracker Organization 👻" <noreply.pricedown@gmail.com>', 
        to: "jimmashuke@gmail.com", 
        subject: `${subj}`, 
        text: `${body}`, 
        
      });
      console.log("Message sent: %s", info.messageId);
  
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
      console.error(error);
  }
  

//   info.catch(console.error);

 
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



module.exports.mail = mail;