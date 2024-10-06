// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Set your SendGrid API key
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

  // Send email using SendGrid
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
