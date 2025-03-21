import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default async function sendOTP(email: string, otp: string) {
  try {
    const info = await transporter.sendMail({
      from: '"Mustard 👻" <devnios7@gmail.com>', // sender address
      to: email, // recipient's email
      subject: "Your Mustard OTP ✔", // Subject line
      text: `Your OTP is: ${otp}`, // plain text body
      html: `
        <div style="padding: 16px; background-color: #f4f4f5; display: flex; justify-content: space-between; align-items: center; font-family: Arial, sans-serif;">
          <div style="font-size: 28px; font-weight: 500; color: #333;">Mustard.</div>
        </div>
        <div style="padding: 24px; font-size: 16px;">
          <p>Your OTP from Mustard is <strong>${otp}</strong></p>
          <p>Please use this OTP to complete your verification. It will expire in 10 minutes.</p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
}
