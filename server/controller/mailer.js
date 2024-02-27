import nodemailer from "nodemailer";
import Mailgen from "mailgen"

let nodConfig = {
    host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.MAIL_PASS,
  },
}

let transporter = nodemailer.createTransport(nodConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js"
    }
})

export  const registerMail = async (req, res) => {
    const {username, userEmail, text, subject} = req.body;

    let email = {
        body: {
            name: username,
            intro: text || "Welcome to out application",
            outro: "Need help, or have questions? just replay to this email"
        }
    }

    let emailBody = MailGenerator.generate(email);

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "signup successful",
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({msg: "you should recive an email from us."})
        })
        .catch((err) => res.status(500).send({err}))
}