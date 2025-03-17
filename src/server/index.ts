
import express from 'express';
import { sendEmail } from './emailService';

const app = express();
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const result = await sendEmail(req.body);
    if (result.success) {
      res.json({ success: true, messageId: result.messageId });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
