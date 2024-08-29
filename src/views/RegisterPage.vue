<template>
  <div class="register-page">
    <!-- Header Section -->
    <HeaderComponent />

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
                @input="sanitizeInput('fullName')"
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

            <!-- Role Selection -->
            <div class="mb-3">
              <label for="role" class="form-label">Role:</label>
              <select
                id="role"
                v-model="role"
                required
                class="form-select"
              >
                <option value="" disabled>Select a role</option>
                <option value="admin">Admin</option>
                <option value="non-admin">Non-Admin</option>
              </select>
              <div v-if="roleError" class="text-danger mt-1">{{ roleError }}</div>
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
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import DOMPurify from 'dompurify';

export default {
  name: "RegisterPage",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      usernameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      roleError: null,
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
        this.role &&
        !this.usernameError &&
        !this.emailError &&
        !this.passwordError &&
        !this.confirmPasswordError &&
        !this.roleError
      );
    },
  },
  methods: {
    sanitizeInput(field) {
      this[field] = DOMPurify.sanitize(this[field]);
    },
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
      this.validateUsername();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      if (this.formValid) {
        const newUser = {
          fullName: this.fullName,
          username: this.username,
          email: this.email,
          role: this.role === 'admin' ? 'admin' : 'non-admin',
          password: this.password,
        };

        this.$store.dispatch('registerUser', newUser);
        alert("Registered Successfully");
        this.$router.push({ name: 'Home' });
      }
    }
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
