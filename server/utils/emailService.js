import nodemailer from "nodemailer";

// Configure nodemailer transporter using Gmail SMTP
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || "madhudissa07@gmail.com";
  const emailPass = process.env.EMAIL_PASS || "";

  if (emailPass) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
  }

  // Fallback to test/log transporter if App Password is not yet set in .env
  return {
    sendMail: async (mailOptions) => {
      console.log("=========================================");
      console.log("📧 VERIFICATION EMAIL SENT (DEV MODE)");
      console.log(`From: ${mailOptions.from}`);
      console.log(`To: ${mailOptions.to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log("=========================================");
      return { messageId: "dev-simulated-id" };
    }
  };
};

/**
 * Generate a secure 6-digit verification code
 */
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send HTML verification email to student
 */
export const sendVerificationEmail = async (recipientEmail, code) => {
  const senderEmail = process.env.EMAIL_USER || "madhudissa07@gmail.com";
  const transporter = createTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verification Code - A/L Physics LMS</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px; color: #0d2436; }
        .email-container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(6, 38, 58, 0.1); border: 1px solid #e1e9ee; }
        .email-header { background: linear-gradient(135deg, #06263a 0%, #176b87 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .email-header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px; }
        .email-header p { margin: 6px 0 0; color: #7ad7cf; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .email-body { padding: 32px 28px; text-align: center; }
        .greeting { font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #06263a; }
        .message { font-size: 14px; color: #4a6370; line-height: 1.6; margin-bottom: 24px; }
        .code-box { background: linear-gradient(135deg, #06263a 0%, #0d2436 100%); color: #7ad7cf; font-size: 36px; font-weight: 800; letter-spacing: 10px; padding: 20px; border-radius: 14px; margin: 20px 0; border: 2px solid #176b87; box-shadow: inset 0 2px 8px rgba(0,0,0,0.2); }
        .expiry-note { font-size: 12px; color: #889da8; margin-top: 16px; }
        .email-footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #7a94a2; border-top: 1px solid #edf2f5; }
        .email-footer a { color: #176b87; text-decoration: none; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>A/L Physics LMS</h1>
          <p>Student Account Authentication</p>
        </div>
        <div class="email-body">
          <div class="greeting">Email Verification Code</div>
          <p class="message">
            Welcome to A/L Physics LMS! Use the 6-digit verification code below to complete your registration and log into your student portal.
          </p>
          <div class="code-box">${code}</div>
          <p class="expiry-note">
            ⏱️ This verification code is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.
          </p>
        </div>
        <div class="email-footer">
          Sent by <strong>A/L Physics LMS</strong> &bull; <a href="mailto:${senderEmail}">${senderEmail}</a><br>
          If you did not request this verification code, please ignore this email.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"A/L Physics LMS" <${senderEmail}>`,
    to: recipientEmail,
    subject: `A/L Physics LMS Verification Code: ${code}`,
    html: htmlContent,
    text: `Your A/L Physics LMS verification code is: ${code}. It expires in 10 minutes.`
  };

  return await transporter.sendMail(mailOptions);
};
