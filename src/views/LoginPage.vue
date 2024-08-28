<template>
  <div class="login-page">
    <!-- Header Section -->
    <HeaderComponent />

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

            <div v-if="loginError" class="text-danger text-center mt-3">{{ loginError }}</div>

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
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
export default {
  name: "LoginPage",
  components: {
    HeaderComponent,  // Register HeaderComponent
    FooterComponent,  // Register FooterComponent
  },
  data() {
    return {
      email: "",
      password: "",
      emailError: null,
      passwordError: null,
      loginError: null,  // To display login errors
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
    async login() {
      if (this.formValid) {
        const credentials = {
          email: this.email,
          password: this.password,
        };

        const loginSuccessful = await this.$store.dispatch('loginUser', credentials);

        if (loginSuccessful) {  
          alert("Logged In Successfuly")

        // After registration, navigate to the home page
        this.$router.push({ name: 'Home' });

        } else {
          // Show login error if credentials are incorrect
          this.loginError = "Invalid email or password. Please try again.";
        }
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
