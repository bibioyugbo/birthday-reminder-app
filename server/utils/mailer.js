const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendBirthdayEmail(to, name) {
    try {
        await transporter.sendMail({
            from: `"Birthday App 🎉" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Happy Birthday 🎂",
            html: `<h1>Happy Birthday, ${name}!</h1>
             <p>Big bibssss wishes you a wonderful year ahead 🥳</p>`,
        });
        console.log(`✅ Birthday email sent to ${name} (${to})`);
    } catch (err) {
        console.error("❌ Email error:", err.message);
    }
}

module.exports = { sendBirthdayEmail };
