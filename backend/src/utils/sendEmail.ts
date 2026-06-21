import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  }
  return transporter;
}

export const sendEmail = async (email: string, message: string) => {
  const transporter = getTransporter();

  const result = await transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: email,
    subject: "Verification Email",
    html: `<p>${message}</p>`,
  });
};
