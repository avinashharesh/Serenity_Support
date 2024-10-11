<template>
  <div>
    <HeaderComponent />
    <!-- Header Section -->
    <div class="send-email-page">
      <h2>Send Email to Users</h2>

      <!-- Display Users Table -->
      <div class="user-list mb-4">
        <h3>Users List</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <!-- New column for role -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.email">
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <!-- Display user role -->
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Email Form -->
      <form @submit.prevent="sendEmail">
        <!-- Subject -->
        <div class="form-group">
          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            v-model="emailSubject"
            class="form-control"
            placeholder="Enter email subject"
            required
          />
        </div>

        <!-- Message -->
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="emailMessage"
            class="form-control"
            rows="5"
            placeholder="Enter email message"
            required
          ></textarea>
        </div>

        <!-- Recipients (Comma-separated emails) -->
        <div class="form-group">
          <label for="emails">Recipients</label>
          <input
            type="text"
            id="emails"
            v-model="emails"
            class="form-control"
            placeholder="Enter recipient emails, comma-separated"
            required
          />
        </div>

        <!-- Optional File Attachment -->
        <div class="form-group">
          <label for="attachment">Attachment (optional)</label>
          <input type="file" id="attachment" @change="handleFileUpload" class="form-control" />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary mt-3">Send Email</button>
      </form>

      <!-- Loading State -->
      <div v-if="loading" class="loading">Sending emails, please wait...</div>
    </div>
    <FooterComponent />
    <!-- Footer Section -->
  </div>
</template>

<script>
import axios from 'axios'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'SendEmail',
  components: {
    HeaderComponent, // Register HeaderComponent
    FooterComponent // Register FooterComponent
  },
  data() {
    return {
      users: [], // Array to hold user data (fullName, email, and role)
      emailSubject: '', // Email subject
      emailMessage: '', // Email message body
      emails: '', // Comma-separated email addresses
      attachment: null, // Base64 encoded attachment content
      loading: false // Loading state to show while sending emails
    }
  },
  methods: {
    // Fetch users from Firestore (or your API)
    async fetchUsers() {
      try {
        const response = await axios.get(
          'https://us-central1-assignment-cf13c.cloudfunctions.net/getUsers'
        )
        this.users = response.data // Assuming the API returns an array of users with fullName, email, and role
        console.log('Fetched users:', this.users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    // Handle file upload and convert to base64
    handleFileUpload(event) {
      const file = event.target.files[0] // Get the selected file
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          // Convert file to base64 and set as attachment
          this.attachment = {
            content: reader.result.split(',')[1], // Base64 content
            filename: file.name,
            type: file.type
          }
        }
        reader.readAsDataURL(file) // Read file as base64
      }
    },
    // Send email using the backend API
    async sendEmail() {
      try {
        this.loading = true // Set loading state

        // Split the emails input string into an array
        const emailList = this.emails
          .split(',')
          .map((email) => email.trim())
          .filter((email) => email)

        // Construct the payload
        const payload = {
          emails: emailList,
          subject: this.emailSubject,
          message: this.emailMessage,
          attachment: this.attachment || null // Optional attachment
        }

        console.log('Payload being sent:', payload)

        // Make the POST request to your Firebase Cloud Function
        const response = await axios.post(
          'https://us-central1-assignment-cf13c.cloudfunctions.net/sendEmailWithAttachment',
          payload
        )

        if (response.status === 200) {
          alert('Emails sent successfully!')
          this.resetForm() // Clear the form after successful submission
        } else {
          alert('Failed to send emails. Please try again.')
        }
      } catch (error) {
        console.error('Error sending emails:', error)
        alert('An error occurred while sending emails.')
      } finally {
        this.loading = false // Reset loading state
      }
    },
    // Reset form fields after sending emails
    resetForm() {
      this.emailSubject = ''
      this.emailMessage = ''
      this.emails = ''
      this.attachment = null
      document.getElementById('attachment').value = '' // Clear the file input
    }
  },
  mounted() {
    this.fetchUsers() // Fetch users when the component is mounted
  }
}
</script>

<style scoped>
.send-email-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.user-list {
  margin-bottom: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.loading {
  margin-top: 20px;
  color: #007bff;
}
</style>
