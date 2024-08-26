<template>
  <div class="home-page">
    <header class="header">
      <nav class="navbar">
        <h1 class="brand">Health Charity</h1>
        <ul class="nav-links">
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="main-content">
      <section class="hero">
        <h2>Supporting Mental Health for All</h2>
        <p>We provide resources, virtual support, and a community to help you manage your mental health.</p>
        <router-link to="/register" class="cta-button">Join Us Today</router-link>
      </section>

      <section class="features">
        <div class="feature">
          <h3>Responsive Design</h3>
          <p>Access our platform on any device, anytime, anywhere.</p>
        </div>
        <div class="feature">
          <h3>Personalized Support</h3>
          <p>Get support tailored to your needs, with resources that matter to you.</p>
        </div>
        <div class="feature">
          <h3>Secure & Private</h3>
          <p>Your privacy is our priority. Connect safely and securely.</p>
        </div>
      </section>

      <section class="ratings">
        <h3>What Our Users Say</h3>
        <p>Average Rating: <strong>4.5</strong> ★★★★★</p>
      </section>
    </main>

    <footer class="footer">
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
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.header {
  background-color: #2c3e50;
  padding: 1rem;
  color: white;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.main-content {
  padding: 2rem;
  text-align: center;
}

.hero {
  background-color: #ecf0f1;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.feature {
  background-color: #ecf0f1;
  padding: 1.5rem;
  border-radius: 10px;
  flex: 1;
  margin: 0 1rem;
}

.ratings {
  background-color: #f39c12;
  color: white;
  padding: 1rem;
  border-radius: 10px;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>
