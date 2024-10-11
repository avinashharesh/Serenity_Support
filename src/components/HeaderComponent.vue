<template>
  <header class="header bg-dark text-white">
    <nav class="navbar navbar-expand-lg navbar-dark container">
      <h1 class="navbar-brand">
        <router-link class="nav-link" to="/">Health Charity</router-link>
      </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <span class="nav-link">
              Status:
              <span :class="isOnline ? 'text-success' : 'text-danger'">{{
                isOnline ? 'Online 🟢' : 'Offline 🔴'
              }}</span>
            </span>
          </li>

          <template v-if="isLoggedIn">
            <template v-if="isEmailPage || isAppointmentPage">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
              </li>
            </template>

            <li class="nav-item" v-if="isHomePage">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item" v-if="isDashboardPage">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="!isEmailPage && !isAppointmentPage">
              <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
            </li>
          </template>

          <template v-else>
            <li class="nav-item" v-if="isHomePage">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="isHomePage">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item" v-if="isLoginPage">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="isLoginPage">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item" v-if="isRegisterPage">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="isRegisterPage">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { useRoute } from 'vue-router'
import { mapGetters } from 'vuex'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'HeaderComponent',
  setup() {
    const route = useRoute()

    const isHomePage = route.name === 'Home'
    const isLoginPage = route.name === 'Login'
    const isRegisterPage = route.name === 'Register'
    const isDashboardPage = route.name === 'Dashboard'
    const isEmailPage = route.name === 'SendEmail'
    const isAppointmentPage = route.name === 'Appointment'

    const isOnline = ref(navigator.onLine)

    // Function to update online status
    const updateOnlineStatus = () => {
      isOnline.value = navigator.onLine
    }

    // Hook to add/remove event listeners for online/offline events
    onMounted(() => {
      window.addEventListener('online', updateOnlineStatus)
      window.addEventListener('offline', updateOnlineStatus)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    })

    return {
      isHomePage,
      isLoginPage,
      isRegisterPage,
      isDashboardPage,
      isOnline,
      isAppointmentPage,
      isEmailPage
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    logout() {
      alert('Logged Out Successfully!')
      this.$store.dispatch('setCurrentUID', null)
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
}
.text-success {
  color: #28a745;
}
.text-danger {
  color: #dc3545;
}
</style>
