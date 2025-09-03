const cron = require("node-cron");
const User = require("./models/user");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

function sendEmail(to, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "🎉 Happy Birthday!",
    html: `<h2>Hey ${name}!</h2><p>"🎂🥳 Wishing you a fantastic birthday! 🎈💐 May God bless you with prosperity 💰, good health 🧘‍♀️🍀, and endless happiness 😄🌟. Enjoy your special day to the fullest 🎊🎁🎶 and keep smiling always! 💖😊"</p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error("Email error:", err);
    else console.log(`🎉 Birthday email sent to ${to}`);
  });
}

function startScheduler() {
  cron.schedule("0 7 * * *", async () => {
    const today = new Date();
    const users = await User.find();

    users.forEach((user) => {
      const bday = new Date(user.birthday);
      if (bday.getDate() === today.getDate() && bday.getMonth() === today.getMonth()) {
        sendEmail(user.email, user.name);
      }
    });
  });

  console.log(" Birthday email scheduler running (every day at 9 AM)");
}

module.exports = startScheduler;
