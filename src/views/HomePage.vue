<template>
  <div class="home-page">
    <!-- Header Section -->
    <HeaderComponent />

    <!-- Main Content Section -->
    <main class="main-content py-5">
      <!-- Hero Section -->
      <section class="hero text-center mb-4">
        <div class="container">
          <h2>Supporting Mental Health for All</h2>
          <p>We provide resources, virtual support, and a community to help you manage your mental health.</p>
          <!-- Conditionally render the button if the user is not logged in -->
          <router-link v-if="!isLoggedIn" to="/register" class="btn btn-primary mb-3">Join Us Today</router-link>

          <!-- Conditionally render Book Appointment Button if the user is logged in -->
          <router-link v-if="isLoggedIn" to="/book-appointment" class="btn btn-outline-secondary">Book an Appointment</router-link>
        </div>
      </section>

      <!-- Features Section -->
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

      <!-- Appointment Section -->
      <section class="appointment-section container text-center mt-5" v-if="isLoggedIn">
        <h3>Book an Appointment with a Professional</h3>
        <p>Need personalized support? Schedule an appointment with one of our mental health professionals.</p>
        <router-link to="/book-appointment" class="btn btn-success">Book an Appointment</router-link>
      </section>

      <!-- Map Section -->
      <section class="map-section container mt-5">
        <h3 class="text-center mb-4">Explore Nearby Mental Health Support</h3>
        <div id="map" class="map-container mb-5"></div>

        <!-- Search and Directions Form -->
        <div class="map-features text-center">
          <h4 class="mb-4">Find Places of Interest</h4>
          <div class="input-group mb-4 search-bar">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search places (e.g., clinics, parks)" 
              class="form-control" 
            />
            <button class="btn btn-primary search-btn" @click="searchPlaces">Search</button>
          </div>

          <h4 class="mb-4">Get Directions</h4>
          <div class="input-group mb-4">
            <input 
              v-model="startLocation" 
              type="text" 
              placeholder="Start location" 
              class="form-control mb-3" 
            />
            <input 
              v-model="endLocation" 
              type="text" 
              placeholder="Destination" 
              class="form-control mb-3" 
            />
            <button class="btn btn-secondary direction-btn" @click="getDirections">Get Directions</button>
          </div>
        </div>
      </section>

      <!-- Ratings Section -->
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
  </div>
  <FooterComponent />
</template>

<script>
import { mapGetters } from 'vuex';
import mapboxgl from 'mapbox-gl'; // Import Mapbox
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: "HomePage",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      searchQuery: '', // For place search
      startLocation: '', // For start point in directions
      endLocation: '', // For end point in directions
      map: null, // Mapbox map instance
    };
  },
  computed: {
    ...mapGetters(['averageRating', 'isLoggedIn']),
  },
  methods: {
    renderStars(rating) {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      return (
        '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars)
      );
    },

    // Initialize Map with Melbourne as the default center
    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpbmFzaGhhcmVzaCIsImEiOiJjbTF4ZjVuNXgweW85MmxxMTlqN256ZDJwIn0.z9SZkH3b1ogAluLnq3ettA'; // Replace with your Mapbox token
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [144.9631, -37.8136], // Default coordinates (Melbourne)
        zoom: 12,
      });

      // Add navigation control (zoom in/out)
      this.map.addControl(new mapboxgl.NavigationControl());

      // Get user's location and update map
      this.getUserLocation()
        .then(location => {
          this.map.setCenter([location.longitude, location.latitude]);
        })
        .catch(() => {
          console.log("Using default center: Melbourne");
        });
    },

    // Helper function to get user's location asynchronously
    getUserLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            error => {
              reject(error);
            }
          );
        } else {
          reject(new Error('Geolocation not supported'));
        }
      });
    },

    // Search places near user's location or Melbourne
    async searchPlaces() {
      const query = this.searchQuery.trim(); // Get search input
      if (!query) {
        alert('Please enter a search query.');
        return;
      }

      let proximity = '144.9631,-37.8136'; // Default proximity to Melbourne

      try {
        // Wait for the user's location or use default proximity
        const location = await this.getUserLocation();
        proximity = `${location.longitude},${location.latitude}`;
      } catch (error) {
        console.warn('Using default location (Melbourne) due to error:', error);
      }

      // Call Mapbox Geocoding API with the proximity parameter
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&proximity=${proximity}&limit=5`;

      try {
        const response = await axios.get(url);
        const places = response.data.features;

        // Clear existing markers on the map
        document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());

        if (places.length === 0) {
          alert('No places found for your search.');
          return;
        }

        // Create a new bounds object to adjust the view later
        const bounds = new mapboxgl.LngLatBounds();

        // Add new markers for the search results and extend the bounds
        places.forEach(place => {
          const [longitude, latitude] = place.geometry.coordinates;

          // Add marker to the map
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h5>${place.text}</h5><p>${place.place_name}</p>`))
            .addTo(this.map);

          // Extend the bounds to include this marker's location
          bounds.extend([longitude, latitude]);
        });

        // Fit the map to the bounds of the markers
        this.map.fitBounds(bounds, {
          padding: 50,  // Add some padding to the bounds to avoid markers being on the edge
        });

      } catch (error) {
        console.error('Error searching places:', error);
        alert('Error occurred while searching for places. Please try again later.');
      }
    },
  },
  mounted() {
    this.initializeMap();
  },
};
</script>

<style scoped>
/* General Layout and Spacing */
.main-content {
  padding: 2rem;
}

.map-section {
  padding: 2rem 0;
}

/* Map Styling */
.map-container {
  height: 400px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 1.5rem;
}

/* Search and Directions Styling */
.map-features h4 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
}

.input-group {
  max-width: 600px;
  margin: 0 auto;
}

.search-bar input {
  border-radius: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  flex-grow: 1;
  margin-right: 1rem;
}

.search-btn, .direction-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
}

.search-btn {
  background-color: #007bff;
  color: white;
  border: none;
}

.search-btn:hover {
  background-color: #0056b3;
}

.direction-btn {
  background-color: #6c757d;
  color: white;
  border: none;
}

.direction-btn:hover {
  background-color: #5a6268;
}

/* Hero Section Styling */
.hero {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
}

/* Feature Section */
.feature {
  margin-bottom: 1rem;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* Rating Section */
.ratings {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 10px;
}
</style>
