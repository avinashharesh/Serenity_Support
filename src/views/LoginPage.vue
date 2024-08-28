<template>
  <div class="login-page">
    <!-- Header Section -->
    <header class="header bg-dark text-white">
      <nav class="navbar navbar-expand-lg navbar-dark container">
        <h1 class="navbar-brand">
          <router-link class="nav-link" to="/">Health Charity</router-link>
        </h1>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Login Form Section -->
    <div class="login-container container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center mb-4">Login to Your Account</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                @input="validateEmail"
                class="form-control"
              />
              <div v-if="emailError" class="text-danger mt-1">{{ emailError }}</div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input
                type="password"
                id="password"
                v-model="password"
                required
                minlength="6"
                @input="validatePassword"
                class="form-control"
              />
              <div v-if="passwordError" class="text-danger mt-1">{{ passwordError }}</div>
            </div>

            <button type="submit" class="btn btn-primary w-100" :disabled="!formValid">
              Login
            </button>
          </form>

          <p class="text-center mt-3">
            Don't have an account? <router-link to="/register">Register here</router-link>
          </p>
        </div>
      </div>
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
  min-height: 100vh;
  background-color: #f7f7f7;
}

.header {
  width: 100%;
}

.login-container {
  margin-top: 3rem;
}

.text-danger {
  font-size: 0.875rem;
}
</style>
