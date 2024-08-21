<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Register</h2>
      <form @submit.prevent="registerUser">
        <!-- Username -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" v-model="username" class="form-control" id="username" required>
          <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
        </div>
  
        <!-- Full Name -->
        <div class="mb-3">
          <label for="fullname" class="form-label">Full Name</label>
          <input type="text" v-model="fullName" class="form-control" id="fullname" required>
        </div>
  
        <!-- Gender -->
        <div class="mb-3">
          <label for="gender" class="form-label">Gender</label>
          <select v-model="gender" class="form-control" id="gender" required>
            <option disabled value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
  
        <!-- Date of Birth -->
        <div class="mb-3">
          <label for="dob" class="form-label">Date of Birth</label>
          <input type="date" v-model="dob" class="form-control" id="dob" required>
        </div>
  
        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" required>
        </div>
  
        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
          <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
        </div>
  
        <!-- Confirm Password -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" required>
          <div v-if="passwordMismatchError" class="text-danger">{{ passwordMismatchError }}</div>
        </div>
  
        <!-- Register Button -->
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        fullName: '',
        gender: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
        usernameError: '',
        passwordError: '',
        passwordMismatchError: ''
      };
    },
    methods: {
      validateUsername() {
        const usernamePattern = /^[A-Za-z][A-Za-z0-9]{5,}$/;
        if (!usernamePattern.test(this.username)) {
          this.usernameError = 'Username must be at least 6 characters long and start with an alphabet.';
          return false;
        } else {
          this.usernameError = '';
          return true;
        }
      },
      validatePassword() {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(this.password)) {
          this.passwordError = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.';
          return false;
        } else {
          this.passwordError = '';
          return true;
        }
      },
      registerUser() {
        if (!this.validateUsername() || !this.validatePassword()) {
          return;
        }
  
        if (this.password !== this.confirmPassword) {
          this.passwordMismatchError = 'Passwords do not match!';
          return;
        } else {
          this.passwordMismatchError = '';
        }
  
        // Simulate successful registration
        alert(`Registered successfully with username: ${this.username}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
  }
  </style>
  