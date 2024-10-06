<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="formData.name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="formData.email" required />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea v-model="formData.message" rows="5" required></textarea>
      </div>

      <div class="form-group">
        <label for="file">Attachment:</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <button type="submit">Send</button>
    </form>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
        attachment: null,
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.formData.attachment = event.target.files[0];
    },
    async submitForm() {
      try {
        const data = new FormData();
        data.append('name', this.formData.name);
        data.append('email', this.formData.email);
        data.append('message', this.formData.message);
        data.append('attachment', this.formData.attachment);

        const response = await fetch(
          'https://us-central1-assignment-cf13c.cloudfunctions.net/sendEmail',
          {
            method: 'POST',
            body: data,
          }
        );

        if (response.ok) {
          this.successMessage = 'Email sent successfully!';
          this.errorMessage = '';
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        this.errorMessage = error.message;
        this.successMessage = '';
      }
    },
  },
};
</script>

<!-- Styling remains unchanged -->

  
  <style scoped>
  .contact {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  