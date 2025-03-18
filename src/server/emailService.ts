
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    const emailContent = `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone || 'Not provided'}
      Subject: ${formData.subject}
      
      Message:
      ${formData.message}
    `;

    const mailOptions = {
      from: 'noreply@handymanwannabe.com',
      to: 'snolan@websitewannabe.com', // TODO: Change back to info@handymanwannabe.com after testing
      subject: `New Contact Form Submission from ${formData.name}`,
      text: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};
