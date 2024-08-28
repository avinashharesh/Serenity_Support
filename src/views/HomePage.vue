<template>
  <div class="home-page">
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
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

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
          <p>Average Rating: <strong>{{ averageRating }}</strong> ★★★★★</p>
        </div>
      </section>
    </main>

    <!-- Footer Section -->
    <footer class="footer bg-dark text-white text-center py-3">
      <p>&copy; 2024 Health Charity. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      averageRating: 4.5,
    };
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
</style>
