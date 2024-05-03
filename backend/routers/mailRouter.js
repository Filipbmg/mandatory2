import "dotenv/config";
import { Resend } from 'resend';
import { Router } from 'express';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/signupMail', async (req, res) => {
  const { email, name } = req.body;
  try {
    const data = await resend.emails.send({
      from: 'Mandatory 2 Onboarding <onboarding@resend.dev>',
      to: [email],
      subject: "Welcome " + [name],
      html: "It works!"
    });

    console.log('Welcome email sent');
    res.status(200).json({ message: 'Welcome email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

export default router;
