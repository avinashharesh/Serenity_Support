const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // Import and configure CORS
const sgMail = require('@sendgrid/mail');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Set your SendGrid API key (replace with your own API key)
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

// Function to send welcome email on user registration
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const displayName = user.displayName || "User";

  const msg = {
    to: email,
    from: 'avinashharesh2995@gmail.com', // Replace with your verified SendGrid email
    subject: 'Welcome to Our App!',
    html: `<p>Hello <strong>${displayName}</strong>,<br> Welcome to our platform! We're glad to have you with us.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    if (error.response) {
      console.error('Error details:', error.response.body);
    }
  }
});

// Function to fetch users from Firestore and handle CORS
exports.getUsers = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersSnapshot = await admin.firestore().collection('users').get();
      const users = usersSnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }));
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});


// API to send email to multiple users with optional attachments
exports.sendEmailWithAttachment = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { emails, subject, message, attachment } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: 'Emails array is required and cannot be empty' });
    }

    if (!subject || !message) {
      return res.status(400).json({ error: 'Both subject and message are required' });
    }

    // If an attachment is provided, format it for SendGrid
    let attachmentContent = null;
    if (attachment) {
      if (!attachment.content || !attachment.filename) {
        return res.status(400).json({ error: 'Attachment must have content and filename' });
      }
      // The attachment content should be base64 encoded
      attachmentContent = {
        content: attachment.content, // base64 encoded content
        filename: attachment.filename,
        type: attachment.type || 'application/octet-stream', // default MIME type if not provided
        disposition: 'attachment'
      };
    }

    // Map over the emails to create messages with/without attachment
    const msgs = emails.map(email => {
      const msg = {
        to: email,
        from: 'avinashharesh2995@gmail.com', // Replace with your verified SendGrid email
        subject: subject,
        html: `<p>${message}</p>`, // You can further customize this to have more dynamic content
      };

      // Add attachment to the message if present
      if (attachmentContent) {
        msg.attachments = [attachmentContent];
      }

      return msg;
    });

    try {
      await sgMail.send(msgs); // Send multiple emails
      console.log('Emails sent to:', emails);
      res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
      console.error('Error sending emails:', error);
      if (error.response) {
        console.error('Error details:', error.response.body);
      }
      res.status(500).json({ error: 'Failed to send emails' });
    }
  });
});
