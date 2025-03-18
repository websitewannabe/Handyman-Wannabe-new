
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    const msg = {
      to: 'snolan@websitewannabe.com', // TODO: Change to info@handymanwannabe.com after testing
      from: {
        email: process.env.FROM_EMAIL_ADDRESS || 'noreply@handymanwannabe.com',
        name: 'Your Contact Form'
      },
      subject: `[Contact Form] ${formData.subject}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}
      `.trim()
    };

    await sgMail.send(msg);
    return { success: true, messageId: Date.now().toString() };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      error: error.response?.body?.errors?.[0]?.message || error.message 
    };
  }
};
