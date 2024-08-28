<template>
    <div class="dashboard-page">
      <!-- Header Section -->
      <HeaderComponent />

      <!-- Dashboard Content Section -->
      <div class="container mt-5">
        <h2 class="text-center mb-4">Welcome, {{ user.fullName }}!</h2>
        <p class="text-center mb-4">You are logged in as: <strong>{{ user.role }}</strong></p>
  
        <!-- Display based on role -->
        <div v-if="user.role === 'admin'">
          <!-- Admin Dashboard Content -->
          <h3>Admin Dashboard</h3>
          <p>As an admin, you have access to the following features:</p>
          <ul>
            <li>Manage Users</li>
            <li>View Site Analytics</li>
            <li>Configure System Settings</li>
            <!-- Add more admin-specific features here -->
          </ul>
        </div>
  
        <div v-else>
          <!-- Non-Admin Dashboard Content -->
          <h3>User Dashboard</h3>
          <p>As a non-admin user, you have access to the following features:</p>
          <ul>
            <li>View Your Profile</li>
            <li>Browse Resources</li>
            <li>Participate in Forums</li>
            <!-- Add more user-specific features here -->
          </ul>
        </div>
  
        <!-- Rating Section -->
        <div class="rating-section mt-5">
          <h4>Rate Our Website</h4>
          <div class="stars">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= rating }" @click="rate(star)">&#9733;</span>
          </div>
          <button class="btn btn-primary mt-3" @click="submitRating" :disabled="rating === 0">Submit Rating</button>
  
          <p class="mt-3">Your Rating: <strong>{{ userRating }}</strong> / 5</p>
          <p class="mt-3">Average Rating: <strong>{{ averageRating }}</strong> / 5</p>
        </div>
      </div>
    </div>
    <FooterComponent />
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';

  export default {
    name: "DashboardPage",
    components: {
    HeaderComponent,  // Register HeaderComponent
    FooterComponent,  // Register FooterComponent
    },
    data() {
      return {
        rating: 0,  // To hold the user's rating
      };
    },
    computed: {
      ...mapGetters(['getCurrentUser', 'averageRating', 'getUserRating']),
      user() {
        return this.getCurrentUser || {};
      },
      userRating() {
        return this.getUserRating(this.user.username) || this.rating;  // Retrieve user's current rating
      },
    },
    methods: {
      rate(star) {
        this.rating = star;
      },
      submitRating() {
        if (this.rating > 0 && this.rating <= 5) {
          this.$store.dispatch('submitRating', this.rating);
          alert('Thank you for your rating!');
          this.rating = 0;  // Reset rating after submission
        }
      },
    },
    mounted() {
      // Set initial rating from the store if available
      this.rating = this.getUserRating(this.user.username);
    }
  };
  </script>
  
  <style scoped>
  .dashboard-page {
    min-height: 100vh;
  }
  
  .header {
    padding: 1rem 0;
  }
  
  .container {
    max-width: 800px;
    margin: auto;
  }
  
  h3 {
    margin-top: 2rem;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  
  ul li {
    margin-bottom: 0.5rem;
  }
  
  .rating-section {
    text-align: center;
  }
  
  .stars {
    font-size: 2rem;
    color: #ccc;
  }
  
  .star {
    cursor: pointer;
    padding: 0 0.1rem;
  }
  
  .star.filled {
    color: gold;
  }
  </style>
  