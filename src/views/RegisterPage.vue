<template>
  <div class="register-page">
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
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Registration Form Section -->
    <div class="register-container container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center mb-4">Create Your Account</h2>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="fullName" class="form-label">Full Name:</label>
              <input
                type="text"
                id="fullName"
                v-model="fullName"
                required
                class="form-control"
              />
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">Username:</label>
              <input
                type="text"
                id="username"
                v-model="username"
                required
                @input="validateUsername"
                class="form-control"
              />
              <div v-if="usernameError" class="text-danger mt-1">{{ usernameError }}</div>
            </div>

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
                @input="validatePassword"
                class="form-control"
              />
              <div v-if="passwordError" class="text-danger mt-1">{{ passwordError }}</div>
            </div>

            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                @input="validateConfirmPassword"
                class="form-control"
              />
              <div v-if="confirmPasswordError" class="text-danger mt-1">{{ confirmPasswordError }}</div>
            </div>

            <button type="submit" class="btn btn-primary w-100" :disabled="!formValid">
              Register
            </button>
          </form>

          <p class="text-center mt-3">
            Already have an account? <router-link to="/login">Login here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      usernameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
    };
  },
  computed: {
    formValid() {
      return (
        this.fullName &&
        this.username &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        !this.usernameError &&
        !this.emailError &&
        !this.passwordError &&
        !this.confirmPasswordError
      );
    },
  },
  methods: {
    validateUsername() {
      const usernamePattern = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;
      this.usernameError = usernamePattern.test(this.username)
        ? null
        : "Username must be at least 6 characters, no spaces, and start with a letter.";
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = emailPattern.test(this.email)
        ? null
        : "Please enter a valid email address.";
    },
    validatePassword() {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
      this.passwordError = passwordPattern.test(this.password)
        ? null
        : "Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, and a special character.";
    },
    validateConfirmPassword() {
      this.confirmPasswordError =
        this.confirmPassword === this.password
          ? null
          : "Passwords do not match.";
    },
    register() {
    if (this.formValid) {
      const registeredUser = {
        fullName: this.fullName,
        username: this.username,
        email: this.email,
      };

      // After successful registration, navigate to the dashboard page with query parameters
      this.$router.push({
        name: "Dashboard",
        query: {
          fullName: registeredUser.fullName,
          username: registeredUser.username,
          email: registeredUser.email,
        }
      });
    }
  },
  },
};
</script>

<style scoped>
.register-page {
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

.register-container {
  margin-top: 3rem;
}

.text-danger {
  font-size: 0.875rem;
}
</style>
