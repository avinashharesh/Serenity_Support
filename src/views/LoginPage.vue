<template>
    <div class="login-page">
      <!-- Header Section -->
      <header class="header">
        <nav class="navbar">
          <h1 class="brand">Health Charity</h1>
          <ul class="nav-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
          </ul>
        </nav>
      </header>
  
      <!-- Login Form Section -->
      <div class="login-container">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              @input="validateEmail"
            />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
  
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              minlength="6"
              @input="validatePassword"
            />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
  
          <button type="submit" class="login-button" :disabled="!formValid">
            Login
          </button>
        </form>
  
        <p class="register-link">
          Don't have an account? <router-link to="/register">Register here</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    data() {
      return {
        email: "",
        password: "",
        emailError: null,
        passwordError: null,
      };
    },
    computed: {
      formValid() {
        return this.email && this.password && !this.emailError && !this.passwordError;
      },
    },
    methods: {
      validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = emailPattern.test(this.email)
          ? null
          : "Please enter a valid email address.";
      },
      validatePassword() {
        this.passwordError =
          this.password.length >= 6
            ? null
            : "Password must be at least 6 characters long.";
      },
      login() {
        if (this.formValid) {
          // Perform login logic here (e.g., call an API or Firebase Auth)
          alert("Login successful!"); // Replace with actual login logic
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
  }
  
  .header {
    width: 100%;
    background-color: #2c3e50;
    padding: 1rem;
    color: white;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .brand {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
  }
  
  .login-container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
    margin-top: 2rem;
  }
  
  h2 {
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .error {
    color: #e74c3c;
    font-size: 0.875rem;
  }
  
  .login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-button:disabled {
    background-color: #bdc3c7;
  }
  
  .register-link {
    margin-top: 1rem;
    font-size: 0.875rem;
  }
  
  .register-link a {
    color: #3498db;
    text-decoration: none;
  }
  </style>
  