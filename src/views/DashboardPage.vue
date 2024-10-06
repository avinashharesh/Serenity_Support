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
        </ul>

        <!-- Admin User Table -->
        <h3>User Management</h3>
        <div class="table-container">
          <!-- Search Fields -->
          <input
            v-model="filters.fullName"
            placeholder="Search by Full Name"
            class="form-control mb-2"
          />
          <input
            v-model="filters.username"
            placeholder="Search by Username"
            class="form-control mb-2"
          />
          <input
            v-model="filters.email"
            placeholder="Search by Email"
            class="form-control mb-2"
          />

          <!-- Table -->
          <table class="table table-striped">
            <thead>
              <tr>
                <th @click="sort('fullName')">
                  Full Name
                  <span v-if="sortKey === 'fullName'">
                    {{ sortOrder === 'asc' ? '▲' : '▼' }}
                  </span>
                </th>
                <th @click="sort('username')">
                  Username
                  <span v-if="sortKey === 'username'">
                    {{ sortOrder === 'asc' ? '▲' : '▼' }}
                  </span>
                </th>
                <th @click="sort('email')">
                  Email
                  <span v-if="sortKey === 'email'">
                    {{ sortOrder === 'asc' ? '▲' : '▼' }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.username">
                <td>{{ user.fullName }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Export Buttons -->
          <div class="export-buttons mt-3">
            <button class="btn btn-secondary" @click="exportToCSV">Export as CSV</button>
            <button class="btn btn-secondary" @click="exportToPDF">Export as PDF</button>
          </div>

          <!-- Pagination Controls -->
          <div class="pagination-controls mt-3">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- Non-Admin Dashboard Content -->
        <h3>User Dashboard</h3>
        <p>As a non-admin user, you have access to the following features:</p>
        <ul>
          <li>View Your Profile</li>
          <li>Browse Resources</li>
          <li>Participate in Forums</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    
  </div>
  <FooterComponent />
</template>
<script>
import { mapGetters } from 'vuex';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { jsPDF } from 'jspdf'; // For PDF export

export default {
  name: "DashboardPage",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      rating: 0,
      sortKey: 'fullName',  // Default sorting key
      sortOrder: 'asc',  // Default sorting order
      filters: {
        fullName: '',
        username: '',
        email: ''
      },
      currentPage: 1,
      perPage: 10,
      users: [],  // Now an empty array, will be filled from Firebase
    };
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'averageRating', 'getUserRating']),
    user() {
      return this.getCurrentUser || {};
    },
    userRating() {
      return this.getUserRating(this.user.username) || this.rating;
    },
    filteredUsers() {
      return this.users.filter(user => {
        return (
          user.fullName.toLowerCase().includes(this.filters.fullName.toLowerCase()) &&
          user.username.toLowerCase().includes(this.filters.username.toLowerCase()) &&
          user.email.toLowerCase().includes(this.filters.email.toLowerCase())
        );
      });
    },
    sortedUsers() {
      return this.filteredUsers.sort((a, b) => {
        let modifier = this.sortOrder === 'asc' ? 1 : -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },
    paginatedUsers() {
      let start = (this.currentPage - 1) * this.perPage;
      let end = start + this.perPage;
      return this.sortedUsers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedUsers.length / this.perPage);
    }
  },
  methods: {
    async fetchUsers() {
      const usersCollection = collection(db, 'users');  // Ensure the collection name is correct
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      this.users = usersList;
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
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
    // Export as CSV
    exportToCSV() {
      const csvRows = [];
      const headers = ['Full Name', 'Username', 'Email'];
      csvRows.push(headers.join(',')); // Add headers

      // Add user data
      this.users.forEach(user => {
        const row = [user.fullName, user.username, user.email];
        csvRows.push(row.join(','));
      });

      // Create CSV blob and download
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'users.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // Export as PDF
    exportToPDF() {
      const doc = new jsPDF();
      let y = 10;
      doc.setFontSize(16);
      doc.text('User Management Report', 10, y);
      doc.setFontSize(12);
      y += 10;

      // Add table headers
      doc.text('Full Name', 10, y);
      doc.text('Username', 60, y);
      doc.text('Email', 110, y);
      y += 10;

      // Add user data
      this.users.forEach(user => {
        doc.text(user.fullName, 10, y);
        doc.text(user.username, 60, y);
        doc.text(user.email, 110, y);
        y += 10;
      });

      // Save the PDF
      doc.save('users.pdf');
    }
  },
  mounted() {
    this.fetchUsers();  // Fetch users from Firebase when the component is mounted
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

.table-container {
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  cursor: pointer;
}

th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.pagination-controls button {
  padding: 5px 10px;
}

.export-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.export-buttons button {
  margin-left: 10px;
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.export-buttons button:hover {
  background-color: #0056b3;
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
