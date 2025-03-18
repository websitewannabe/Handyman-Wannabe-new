
import express from 'express';
import { config } from 'dotenv';
import { sendEmail } from './emailService';

config();

const app = express();
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.name || !req.body.message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({
        success: false,
        error: 'Email service not properly configured'
      });
    }

    const result = await sendEmail(req.body);
    if (result.success) {
      res.json({ 
        success: true, 
        messageId: result.messageId,
        message: 'Email sent successfully!' 
      });
    } else {
      console.error('Email error:', result.error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
