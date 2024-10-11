const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const sgMail = require('@sendgrid/mail')
const { GoogleGenerativeAI } = require('@google/generative-ai')

admin.initializeApp()
const genAI = new GoogleGenerativeAI(functions.config().gemini.apikey)

const SENDGRID_API_KEY = functions.config().sendgrid.key
sgMail.setApiKey(SENDGRID_API_KEY)

// Function to send welcome email on user registration
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const email = user.email
  const displayName = user.displayName || 'User'

  const msg = {
    to: email,
    from: 'avinashharesh2995@gmail.com', // Replace with your verified SendGrid email
    subject: 'Welcome to Our App!',
    html: `<p>Hello <strong>${displayName}</strong>,<br> Welcome to our platform! We're glad to have you with us.</p>`
  }

  try {
    await sgMail.send(msg)
    console.log('Welcome email sent to:', email)
  } catch (error) {
    console.error('Error sending welcome email:', error)
    if (error.response) {
      console.error('Error details:', error.response.body)
    }
  }
})

// Function to fetch users from Firestore and handle CORS
exports.getUsers = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersSnapshot = await admin.firestore().collection('users').get()
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      res.status(200).json(users)
    } catch (error) {
      console.error('Error fetching users:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
})

// API to fetch a user by email ID from Firestore
exports.getUserByEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const email = req.query.email

    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' })
    }

    try {
      const userSnapshot = await admin
        .firestore()
        .collection('users')
        .where('email', '==', email)
        .limit(1)
        .get()

      if (userSnapshot.empty) {
        return res.status(404).json({ error: 'User not found' })
      }

      const userData = userSnapshot.docs[0].data()
      const userId = userSnapshot.docs[0].id

      res.status(200).json({
        id: userId,
        ...userData
      })
    } catch (error) {
      console.error('Error fetching user by email:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
})

// API to delete a user by userID from Firebase Authentication and Firestore
exports.deleteUserByID = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const userID = req.query.userID // Retrieve userID from query parameter

    if (!userID) {
      return res.status(400).json({ error: 'userID query parameter is required' })
    }

    try {
      await admin.auth().deleteUser(userID)
      console.log(`Successfully deleted user from Firebase Auth: ${userID}`)

      const userDoc = admin.firestore().collection('users').doc(userID)
      const userDocSnapshot = await userDoc.get()

      if (!userDocSnapshot.exists) {
        console.warn(`No user found in Firestore with ID: ${userID}`)
        return res.status(404).json({ error: 'User not found in Firestore' })
      }

      await userDoc.delete()
      console.log(`Successfully deleted user from Firestore: ${userID}`)

      res.status(200).json({
        message: `User with ID ${userID} successfully deleted from both Firebase Auth and Firestore.`
      })
    } catch (error) {
      console.error('Error deleting user:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
})

// API to send email to multiple users with optional attachments
exports.sendEmailWithAttachment = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { emails, subject, message, attachment } = req.body

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: 'Emails array is required and cannot be empty' })
    }

    if (!subject || !message) {
      return res.status(400).json({ error: 'Both subject and message are required' })
    }

    let attachmentContent = null
    if (attachment) {
      if (!attachment.content || !attachment.filename) {
        return res.status(400).json({ error: 'Attachment must have content and filename' })
      }

      attachmentContent = {
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type || 'application/octet-stream',
        disposition: 'attachment'
      }
    }

    const msgs = emails.map((email) => {
      const msg = {
        to: email,
        from: 'avinashharesh2995@gmail.com',
        subject: subject,
        html: `<p>${message}</p>`
      }

      if (attachmentContent) {
        msg.attachments = [attachmentContent]
      }

      return msg
    })

    try {
      await sgMail.send(msgs)
      console.log('Emails sent to:', emails)
      res.status(200).json({ message: 'Emails sent successfully' })
    } catch (error) {
      console.error('Error sending emails:', error)
      if (error.response) {
        console.error('Error details:', error.response.body)
      }
      res.status(500).json({ error: 'Failed to send emails' })
    }
  })
})

exports.askGenAI = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const userQuestion = req.body.prompt

      if (!userQuestion) {
        return res.status(400).send({ error: 'Prompt is required.' })
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(userQuestion)

      res.status(200).send({ response: result.response.text() })
    } catch (error) {
      console.error('Error with GenAI API:', error)
      res.status(500).send({ error: 'Internal Server Error.' })
    }
  })
})

// Create a Cloud Function to return the Mapbox access token
exports.getMapboxToken = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const token = functions.config().mapbox.token
    res.status(200).json({ token })
  })
})
