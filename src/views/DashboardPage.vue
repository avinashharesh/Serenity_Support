<template>
  <div class="dashboard-page">
    <!-- Header Section -->
    <HeaderComponent />

    <!-- Dashboard Content Section -->
    <div class="container mt-5">
      <h2 class="text-center mb-4">Welcome, {{ user.fullName }}!</h2>
      <p class="text-center mb-4">You are logged in as: <strong>{{ user.role }}</strong></p>

      <div v-if="user.role === 'admin'">
        <!-- Admin Dashboard for Admin Users -->
        <h3>Admin Dashboard</h3>
        <p>Here is the list of all users:</p>

        <!-- Admin User Table -->
        <table class="table table-striped">
          <thead>
            <tr>
              <th @click="sortUsers('fullName')">Full Name
                <span v-if="userSortKey === 'fullName'">{{ userSortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sortUsers('email')">Email
                <span v-if="userSortKey === 'email'">{{ userSortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sortUsers('role')">Role
                <span v-if="userSortKey === 'role'">{{ userSortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.email">
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Export and Send Email Buttons -->
        <div class="export-buttons mt-3">
          <button @click="exportToCSV" class="btn btn-secondary">Export as CSV</button>
          <button @click="exportToPDF" class="btn btn-secondary">Export as PDF</button>
          <button @click="goToSendEmailPage" class="btn btn-primary">Send Email</button> <!-- New Send Email button -->
        </div>

        <!-- Pagination Controls for Users -->
        <div class="pagination-controls mt-3">
          <button @click="prevUserPage" :disabled="userCurrentPage === 1">Previous</button>
          <span>Page {{ userCurrentPage }} of {{ userTotalPages }}</span>
          <button @click="nextUserPage" :disabled="userCurrentPage === userTotalPages">Next</button>
        </div>

        <!-- Bar Chart for Booking Comparison -->
        <div class="chart-container mt-5">
          <canvas id="bookingChart" width="400" height="200"></canvas>
        </div>
      </div>

      <!-- User Dashboard for Non-Admin Users -->
      <div v-else>
        <h3>User Dashboard</h3>
        <p>Here is the list of your bookings:</p>

        <!-- Search Fields for Bookings -->
        <div class="search-container">
          <input v-model="filters.professional" placeholder="Search by Professional" class="form-control mb-2" />
          <input v-model="filters.date" placeholder="Search by Date (YYYY-MM-DD)" class="form-control mb-2" />
          <input v-model="filters.time" placeholder="Search by Time (HH:MM:SS)" class="form-control mb-2" />
        </div>

        <!-- Bookings Table -->
        <table class="table table-striped">
          <thead>
            <tr>
              <th @click="sort('professional')">Professional
                <span v-if="sortKey === 'professional'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sort('date')">Date
                <span v-if="sortKey === 'date'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
              <th @click="sort('time')">Time
                <span v-if="sortKey === 'time'">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in paginatedBookings" :key="booking.date + booking.time">
              <td>{{ booking.professional }}</td>
              <td>{{ booking.date }}</td>
              <td>{{ booking.time }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls for Bookings -->
        <div class="pagination-controls mt-3">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import axios from 'axios'; 
import { jsPDF } from 'jspdf';
import { Chart, registerables } from 'chart.js'; // Import Chart.js

Chart.register(...registerables); // Register Chart.js components

export default {
  name: "DashboardPage",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      sortKey: 'date',
      sortOrder: 'desc',
      filters: {
        professional: '',
        date: '',
        time: ''
      },
      currentPage: 1,
      perPage: 10,

      // Admin section for users
      users: [],
      userSortKey: 'fullName',
      userSortOrder: 'asc',
      userCurrentPage: 1,
      userPerPage: 10,

      // Chart related
      chart: null, // For holding the chart instance
    };
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
    user() {
      return this.getCurrentUser || {};
    },
    bookings() {
      return this.user.bookings || [];
    },
    filteredBookings() {
      return this.bookings.filter(booking => {
        return (
          booking.professional.toLowerCase().includes(this.filters.professional.toLowerCase()) &&
          booking.date.includes(this.filters.date) &&
          booking.time.includes(this.filters.time)
        );
      });
    },
    sortedBookings() {
      return this.filteredBookings.sort((a, b) => {
        let modifier = this.sortOrder === 'asc' ? 1 : -1;

        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;

        if (this.sortKey === 'date') {
          if (a.time < b.time) return -1 * modifier;
          if (a.time > b.time) return 1 * modifier;
        }

        return 0;
      });
    },
    paginatedBookings() {
      let bookings = this.sortedBookings || []; 
      let start = (this.currentPage - 1) * this.perPage;
      let end = start + this.perPage;
      return bookings.slice(start, end);
    },
    totalPages() {
      return Math.ceil((this.bookings || []).length / this.perPage); 
    },

    // Admin section for users
    sortedUsers() {
      return (this.users || []).sort((a, b) => {
        let modifier = this.userSortOrder === 'asc' ? 1 : -1;
        if (a[this.userSortKey] < b[this.userSortKey]) return -1 * modifier;
        if (a[this.userSortKey] > b[this.userSortKey]) return 1 * modifier;
        return 0;
      });
    },
    paginatedUsers() {
      let users = this.sortedUsers || []; 
      let start = (this.userCurrentPage - 1) * this.userPerPage;
      let end = start + this.userPerPage;
      return users.slice(start, end);
    },
    userTotalPages() {
      return Math.ceil((this.users || []).length / this.userPerPage); 
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://us-central1-assignment-cf13c.cloudfunctions.net/getUsers'); 
        this.users = response.data; 
        this.generateChart(); // Call this after fetching users
        console.log("Fetched users:", this.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    generateChart() {
      if (this.chart) {
        this.chart.destroy(); // Destroy existing chart instance before creating a new one
      }

      const professionalBookingCounts = {};
      this.users.forEach(user => {
        if (user.bookings) {
          user.bookings.forEach(booking => {
            if (professionalBookingCounts[booking.professional]) {
              professionalBookingCounts[booking.professional]++;
            } else {
              professionalBookingCounts[booking.professional] = 1;
            }
          });
        }
      });

      const labels = Object.keys(professionalBookingCounts);
      const data = Object.values(professionalBookingCounts);

      const ctx = document.getElementById('bookingChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bookings per Professional',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'desc';
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
    sortUsers(key) {
      if (this.userSortKey === key) {
        this.userSortOrder = this.userSortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.userSortKey = key;
        this.userSortOrder = 'asc';
      }
    },
    prevUserPage() {
      if (this.userCurrentPage > 1) {
        this.userCurrentPage--;
      }
    },
    nextUserPage() {
      if (this.userCurrentPage < this.userTotalPages) {
        this.userCurrentPage++;
      }
    },
    goToSendEmailPage() {
    this.$router.push('/sendEmail');
  }
  ,
    exportToCSV() {
      const csvRows = [];
      const headers = ['Full Name', 'Email', 'Role']; 
      csvRows.push(headers.join(',')); 

      (this.users || []).forEach(user => {
        const row = [user.fullName, user.email, user.role];
        csvRows.push(row.join(','));
      });

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
    exportToPDF() {
      const doc = new jsPDF();
      let y = 10;
      doc.setFontSize(16);
      doc.text('User Management Report', 10, y);
      doc.setFontSize(12);
      y += 10;

      doc.text('Full Name', 10, y);
      doc.text('Email', 60, y);
      doc.text('Role', 120, y);
      y += 10;

      (this.users || []).forEach(user => {
        doc.text(user.fullName, 10, y);
        doc.text(user.email, 60, y);
        doc.text(user.role, 120, y);
        y += 10;
      });

      doc.save('users.pdf');
    }
  },
  mounted() {
    if (this.user.role === 'admin') {
      this.fetchUsers();
    }
  }
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.container {
  max-width: 800px;
  margin: auto;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 2rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th {
  cursor: pointer;
  padding: 10px;
  text-align: left;
  background-color: #f8f9fa;
  border-bottom: 2px solid #ddd;
}

th:hover {
  background-color: #e9ecef;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.search-container input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.pagination-controls button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #6c757d;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #0056b3;
}

.export-buttons {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}

.export-buttons button {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.export-buttons button.btn-primary {
  background-color: #007bff;
}

.export-buttons button:hover {
  background-color: #218838;
}

.chart-container {
  margin-top: 3rem;
  padding: 2rem;
  background-color: #f0f2f5;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.chart-container canvas {
  max-width: 100%;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .table {
    font-size: 14px;
  }

  .pagination-controls button,
  .export-buttons button {
    font-size: 12px;
    padding: 8px 10px;
  }

  .chart-container {
    padding: 1.5rem;
  }
}
</style>
