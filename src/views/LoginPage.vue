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
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { auth, db } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export default {
  name: 'LoginPage',
  components: {
    HeaderComponent, // Register HeaderComponent
    FooterComponent // Register FooterComponent
  },
  data() {
    return {
      email: '',
      password: '',
      fullName: '',
      username: '',
      role: '',
      emailError: null,
      passwordError: null,
      loginError: null // To display login errors
    }
  },
  computed: {
    formValid() {
      return this.email && this.password && !this.emailError && !this.passwordError
    }
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.emailError = emailPattern.test(this.email) ? null : 'Please enter a valid email address.'
    },
    validatePassword() {
      this.passwordError =
        this.password.length >= 6 ? null : 'Password must be at least 6 characters long.'
    },
    async login() {
      if (this.formValid) {
        try {
          // Sign in with email and password
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
          const user = userCredential.user

          console.log('Firebase Login Successful')

          // Retrieve the user data from Firestore using the user's UID
          const userDocSnapshot = await getDoc(doc(db, 'users', user.uid))

          if (userDocSnapshot.exists()) {
            // Extract and store the user data in the variables
            this.$store.dispatch('setCurrentUID', user.uid)
            const userData = userDocSnapshot.data()
            this.fullName = userData.fullName
            this.username = userData.username
            this.email = userData.email
            this.role = userData.role

            alert('Logged in successfully')

            // Optionally, store user data in Vuex store (if you're using Vuex)
            this.$store.dispatch('registerUser', userData)

            // Redirect to the home page after successful login
            this.$router.push({ name: 'Home' })
          } else {
            console.log('No user data found in Firestore.')
            this.loginError = 'User profile not found.'
          }
        } catch (error) {
          console.error('Error during login:', error)
          this.loginError = 'Login failed. Please check your credentials.'
        }
      }
    }
  }
}
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
