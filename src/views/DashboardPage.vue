<template>
    <div class="dashboard-page">
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
          </ul>
        </div>
      </nav>
    </header>
  
      <div class="container mt-5">
        <h2 v-if="user.fullName">Welcome to Your Dashboard, {{ user.fullName }}!</h2>
        <p v-if="user.username">Username: {{ user.username }}</p>
        <p v-if="user.email">Email: {{ user.email }}</p>
        <p v-else>Please log in to view your dashboard.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashboardPage",
    computed: {
      user() {
        return {
          fullName: this.$route.query.fullName,
          username: this.$route.query.username,
          email: this.$route.query.email,
        };
      },
    },
  };
  </script>
  