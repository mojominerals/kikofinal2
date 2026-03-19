
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Alle Felder sind erforderlich.' });
    }

    // Check for email credentials
    const user = process.env.EMAIL_USER?.trim();
    const pass = process.env.EMAIL_PASS?.replace(/\s+/g, ''); // Remove all spaces from app password
    const to = process.env.EMAIL_TO?.trim() || 'kikomedy@gmail.com';

    if (!user || !pass) {
      console.error('Email credentials missing in environment variables.');
      return res.status(500).json({ error: 'E-Mail-Konfiguration fehlt auf dem Server.' });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: user,
          pass: pass,
        },
      });

      // Verify connection configuration
      try {
        await transporter.verify();
        console.log('Server is ready to take our messages');
      } catch (verifyError) {
        console.error('SMTP Verification Error:', verifyError);
        return res.status(500).json({ 
          error: 'Verbindung zum E-Mail-Server fehlgeschlagen.',
          details: verifyError instanceof Error ? verifyError.message : 'Unbekannter Fehler'
        });
      }

      const mailOptions = {
        from: `"KIKO BOOKING" <${user}>`,
        to: to,
        subject: `KIKO BOOKING ANFRAGE von ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`,
        replyTo: email
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Nachricht erfolgreich gesendet!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        error: 'Fehler beim Senden der Nachricht.',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
