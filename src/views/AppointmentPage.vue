<template>
  <div class="appointment-page">
    <!-- Header Section -->
    <HeaderComponent />

    <!-- Main Content Section -->
    <main class="main-content container py-5">
      <h2 class="text-center mb-4">Book an Appointment</h2>

      <!-- Appointment Form -->
      <div v-if="!isSubmitted" class="appointment-form mx-auto">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="professional" class="form-label">Select a Professional</label>
            <select
              v-model="form.professional"
              id="professional"
              class="form-select"
              required
            >
              <option disabled value="">Choose a professional</option>
              <option
                v-for="professional in professionals"
                :key="professional.id"
                :value="professional.name"
              >
                {{ professional.name }} - {{ professional.specialty }}
              </option>
            </select>
          </div>

          <!-- FullCalendar Section for Picking a Date and Time -->
          <div class="mb-3">
            <label for="calendar" class="form-label">Select a Date and Time</label>
            <div id="calendar"></div>
          </div>

          <div class="mb-3">
            <label for="selectedTime" class="form-label">Selected Time</label>
            <input
              v-model="form.time"
              type="text"
              id="selectedTime"
              class="form-control"
              readonly
              placeholder="Select a time slot from the calendar above"
            />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

      <!-- Confirmation Message -->
      <div v-if="isSubmitted" class="confirmation text-center">
        <h3>Thank you for booking an appointment!</h3>
        <p>We have received your request and will confirm your appointment soon.</p>
        <router-link to="/" class="btn btn-success mt-3">Go to Homepage</router-link>
      </div>
    </main>

    <!-- Footer Section -->
    
  </div>
  <footer>
    <FooterComponent />
  </footer>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { db } from '@/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import axios from 'axios';

// FullCalendar imports
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'; // Use only the timeGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Required for select interaction

export default {
  name: "AppointmentPage",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      isSubmitted: false,  // Track if the form has been submitted
      form: {
        professional: '',
        date: '', // Selected date
        time: '', // Selected time
      },
      professionals: [
        { id: 1, name: 'Dr. Alice Brown', specialty: 'Therapist' },
        { id: 2, name: 'Dr. John Smith', specialty: 'Psychologist' },
        { id: 3, name: 'Dr. Sarah Lee', specialty: 'Counselor' },
      ],
      users: [], // To store fetched users and their bookings
    };
  },
  methods: {
    // Fetch all users and their bookings from Firestore
    async fetchUsers() {
      try {
        const response = await axios.get('https://us-central1-assignment-cf13c.cloudfunctions.net/getUsers');
        this.users = response.data;
        console.log('Fetched users:', this.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    // Check if the selected professional is already booked for the chosen date and time
    isProfessionalAvailable(professional, date, time) {
      for (const user of this.users) {
        if (user.bookings) {
          for (const booking of user.bookings) {
            if (booking.professional === professional && booking.date === date && booking.time === time) {
              return false; // Professional is already booked for this slot
            }
          }
        }
      }
      return true; // Professional is available
    },

    // Submit the appointment form
    async submitForm() {
      try {
        const currentUID = this.$store.getters.getCurrentUID; // Get the current UID from Vuex

        if (!currentUID) {
          throw new Error('No user is currently logged in');
        }

        // First, check if the professional is available for the selected date and time
        const isAvailable = this.isProfessionalAvailable(this.form.professional, this.form.date, this.form.time);
        if (!isAvailable) {
          alert('The selected professional is already booked at the chosen date and time. Please select another slot.');
          return;
        }

        // Prepare booking details
        const bookingDetails = {
          professional: this.form.professional,
          date: this.form.date,
          time: this.form.time,
          bookingTimestamp: new Date().toISOString(), // Store when the booking was made
        };

        // Reference to the user's document in Firestore using UID
        const userDocRef = doc(db, 'users', currentUID);

        // Update the user's document, adding the booking details to the bookings array
        await updateDoc(userDocRef, {
          bookings: arrayUnion(bookingDetails), // Add the booking to the user's bookings array
        });

        console.log("Booking details saved to Firestore:", bookingDetails);

        // After saving to Firestore, update the currentUser in Vuex
        this.$store.dispatch('addBooking', bookingDetails);

        // Simulate successful form submission (e.g., show confirmation message)
        this.isSubmitted = true;

      } catch (error) {
        console.error("Error saving booking:", error);
        alert("Failed to book appointment. Please try again.");
      }
    },

    // Initialize the FullCalendar instance with week view only, and no All-day section
    initializeCalendar() {
      let calendarEl = document.getElementById('calendar');
      let calendar = new Calendar(calendarEl, {
        plugins: [timeGridPlugin, interactionPlugin], // Only include the timeGrid and interaction plugin
        initialView: 'timeGridWeek', // Set the default view to 'week'
        headerToolbar: {
          left: 'prev,next today', // Previous, next, and today buttons
          center: 'title',         // Title of the week
          right: ''                // No other view options available
        },
        allDaySlot: false, // Remove the "All-day" section from the week view
        selectable: true, // Enable selecting time slots
        selectMirror: true, // Show mirror effect when selecting
        select: (info) => {
          // Update form with selected date and time
          this.form.date = info.start.toISOString().split('T')[0]; // Extract date in 'YYYY-MM-DD' format
          this.form.time = info.start.toTimeString().split(' ')[0]; // Extract time in 'HH:MM:SS' format
          console.log(`Selected date: ${this.form.date}, time: ${this.form.time}`);
        }
      });
      calendar.render();
    }
  },
  mounted() {
    this.fetchUsers();        // Fetch users and their bookings from Firestore on component mount
    this.initializeCalendar();  // Call the method when the component mounts
  }
};
</script>

<style scoped>
/* Centering the main content and limiting its width */
.main-content {
  max-width: 600px;
  margin: 0 auto;
}

/* Styling for the appointment form container */
.appointment-form {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* Styling for form labels */
form label {
  font-weight: 500;
  font-size: 1rem;
  color: #333;
}

/* Basic styling for form inputs */
.form-control, .form-select {
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ced4da;
  transition: border-color 0.2s ease;
}

/* Change input border color on focus */
.form-control:focus, .form-select:focus {
  border-color: #80bdff;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Margin spacing between form fields */
.mb-3 {
  margin-bottom: 1rem;
}

/* Calendar styling - gives the calendar section some structure */
#calendar {
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background-color: #fff;
}

/* Button styling */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

/* Confirmation message styling */
.confirmation h3 {
  color: #28a745;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.confirmation p {
  font-size: 1.1rem;
  color: #555;
}

.confirmation .btn-success {
  background-color: #28a745;
  border-color: #28a745;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 5px;
}

.confirmation .btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }

  .appointment-form {
    padding: 1.5rem;
  }

  .btn-primary, .btn-success {
    width: 100%;
  }
}
</style>
