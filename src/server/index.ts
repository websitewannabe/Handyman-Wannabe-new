
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

    const result = await sendEmail(req.body);
    if (result.success) {
      res.json({ 
        success: true, 
        messageId: result.messageId,
        message: 'Email sent successfully!' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error || 'Failed to send email' 
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
