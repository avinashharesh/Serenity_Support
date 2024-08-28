<template>
  <div class="home-page">
    <!-- Header Section -->
    <HeaderComponent />

    <!-- Main Content Section -->
    <main class="main-content py-5">
      <section class="hero text-center mb-4">
        <div class="container">
          <h2>Supporting Mental Health for All</h2>
          <p>We provide resources, virtual support, and a community to help you manage your mental health.</p>
          <router-link to="/register" class="btn btn-primary">Join Us Today</router-link>
        </div>
      </section>

      <section class="features container">
        <div class="row">
          <div class="col-md-4">
            <div class="feature bg-light p-4 rounded mb-3">
              <h3>Responsive Design</h3>
              <p>Access our platform on any device, anytime, anywhere.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature bg-light p-4 rounded mb-3">
              <h3>Personalized Support</h3>
              <p>Get support tailored to your needs, with resources that matter to you.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature bg-light p-4 rounded mb-3">
              <h3>Secure & Private</h3>
              <p>Your privacy is our priority. Connect safely and securely.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="ratings text-center mt-5 bg-warning text-white py-4">
        <div class="container">
          <h3>What Our Users Say</h3>
          <p>
            Average Rating: <strong>{{ averageRating }}</strong>
            <span v-html="renderStars(averageRating)"></span>
          </p>
        </div>
      </section>
    </main>

    <!-- Footer Section -->
    <FooterComponent />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: "HomePage",
  components: {
    HeaderComponent,  // Register HeaderComponent
    FooterComponent,  // Register FooterComponent
  },
  computed: {
    ...mapGetters(['averageRating']),  // Fetch the average rating from Vuex
  },
  methods: {
    renderStars(rating) {
      const fullStars = Math.floor(rating);  // Number of full stars
      const halfStar = rating % 1 !== 0;  // Check if there is a half star
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);  // Number of empty stars

      // Generate star HTML
      return (
        '★'.repeat(fullStars) +
        (halfStar ? '½' : '') +
        '☆'.repeat(emptyStars)
      );
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 2rem;
  text-align: center;
}

.hero {
  background-color: #ecf0f1;
  padding: 2rem;
  border-radius: 10px;
}

.feature {
  margin-bottom: 1rem;
}

.ratings {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 10px;
}

.star {
  color: gold;
}
</style>
