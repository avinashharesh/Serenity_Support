<template>
  <div class="home-page">
    <!-- Online/Offline Status Banner -->
    <div v-if="!isOnline" class="offline-banner">
      <p>You are currently offline. Some features may be unavailable.</p>
    </div>

    <!-- Header Section -->
    <HeaderComponent />

    <!-- Main Content Section -->
    <main class="main-content py-5">
      <!-- Hero Section -->
      <section class="hero text-center mb-4">
        <div class="container">
          <h2>Supporting Mental Health for All</h2>
          <p>We provide resources, virtual support, and a community to help you manage your mental health.</p>
          <router-link v-if="!isLoggedIn" to="/register" class="btn btn-primary mb-3">Join Us Today</router-link>
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

      <!-- What We Offer Section -->
      <section class="offer-section container text-center mt-5">
        <h3>What We Offer</h3>
        <p class="lead">Our platform is designed to provide comprehensive mental health support, offering:</p>
        <div class="row">
          <div class="col-md-4">
            <div class="offer bg-light p-4 rounded mb-3">
              <h4>Expert Guidance</h4>
              <p>Connect with certified mental health professionals for personalized support and guidance.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="offer bg-light p-4 rounded mb-3">
              <h4>Community Support</h4>
              <p>Join a caring and supportive community where you can share experiences and find encouragement.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="offer bg-light p-4 rounded mb-3">
              <h4>Self-Help Resources</h4>
              <p>Access a wide range of self-help materials, including articles, videos, and exercises to enhance your well-being.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Articles Section -->
      <section class="articles-section container mt-5" v-if="isLoggedIn">
        <h3>Helpful Articles</h3>
        <p class="lead text-center">Explore a range of articles focused on mental health support and well-being.</p>

        <!-- Mental Health and Well-Being Articles -->
        <h4>Mental Health and Well-Being Articles</h4>
        <div class="row">
          <div class="col-md-4">
            <div class="article-card bg-light p-4 rounded mb-3">
              <h5><a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(07)61238-0/abstract" target="_blank">The Importance of Mental Health Awareness</a></h5>
              <p>Understand why mental health awareness is crucial in today's world.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="article-card bg-light p-4 rounded mb-3">
              <h5><a href="https://japer.in/article/stress-anxiety-and-depression-in-clinical-practice-of-undergraduates-and-awareness-of-its-effective-management-a-survey" target="_blank">How to Manage Anxiety and Stress</a></h5>
              <p>Practical tips for managing stress and anxiety from the Mayo Clinic.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="article-card bg-light p-4 rounded mb-3">
              <h5><a href="https://journals.sagepub.com/doi/abs/10.1177/1559827609335152" target="_blank">Building Emotional Resilience</a></h5>
              <p>Learn how to develop emotional resilience to cope with life's challenges.</p>
            </div>
          </div>
        </div>

        <!-- Resources for Coping with Mental Health Challenges -->
        <h4>Resources for Coping with Mental Health Challenges</h4>
        <div class="row">
          <div class="col-md-4">
            <div class="article-card bg-light p-4 rounded mb-3">
              <h5><a href="https://onlinelibrary.wiley.com/doi/full/10.1111/j.1365-2524.2011.01014.x" target="_blank">Self-Care for Mental Health</a></h5>
              <p>A guide on self-care practices to improve mental well-being.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="article-card bg-light p-4 rounded mb-3">
              <h5><a href="https://www.nejm.org/doi/abs/10.1056/NEJM200012283432607" target="_blank">Managing Depression</a></h5>
              <p>Effective strategies to manage depression, from Healthline.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="article-card bg-light p-4 rounded mb-3">
              <h5><a href="https://spssi.onlinelibrary.wiley.com/doi/abs/10.1111/j.1540-4560.2010.01662.x" target="_blank">Mental Health Support for Specific Groups</a></h5>
              <p>Mental health strategies tailored to different populations, including vulnerable groups.</p>
            </div>
          </div>
        </div>

        <!-- Success Stories and Testimonials -->
        <h4>Success Stories and Testimonials</h4>
        <div class="row">
          <div class="col-md-4">
            <div class="article-card bg-light p-4 rounded mb-3">
              <h5><a href="https://journals.sagepub.com/doi/full/10.1177/10497323221118239" target="_blank">Real Stories of Mental Health Recovery</a></h5>
              <p>Inspirational stories from individuals who have overcome mental health challenges.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Chatbot Section -->
      <section class="chatbot-section container text-center mt-5" v-if="isLoggedIn">
        <h3>Ask Us Anything</h3>
        <p>Get instant answers to your mental health-related questions.</p>

        <div class="input-group mb-4">
          <input 
            v-model="userQuestion"
            type="text"
            class="form-control"
            placeholder="Ask a question..."
          />
          <button class="btn btn-primary" @click="askGenAI">Ask</button>
        </div>

        <!-- Show loading spinner or message while response is being generated -->
        <div v-if="loadingResponse" class="text-center">Thinking...</div>

        <!-- Display the AI-generated response once available -->
        <div v-if="aiResponse" class="ai-response text-left mt-4">
          <h5>AI's Response:</h5>
          <p>{{ aiResponse }}</p>
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
    </main>

    <!-- Footer Section -->
    <FooterComponent />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import mapboxgl from 'mapbox-gl'; // Import Mapbox for map functionality
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
      isOnline: navigator.onLine, // Initial online status
      searchQuery: '', // For place search input
      startLocation: '', // For starting point in the directions
      endLocation: '', // For end point in the directions
      map: null, // Mapbox instance
      userQuestion: '', // The user's question for the AI chatbot
      aiResponse: '', // AI's generated response
      loadingResponse: false, // Loading state while waiting for AI response
    };
  },
  computed: {
    ...mapGetters(['averageRating', 'isLoggedIn']),
  },
  mounted() {
    // Add event listeners for online/offline status
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);

    // Initialize the map when the component is mounted
    this.initializeMap();
  },
  beforeDestroy() {
    // Remove event listeners before destroying the component
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },
  methods: {
    // Update the online status when it changes
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
    },

    // GenAI API Integration: Ask question to GenAI (Gemini API)
    async askGenAI() {
      // Check if the user entered a question
      if (!this.userQuestion.trim()) {
        alert('Please enter a question.');
        return;
      }

      // Set the loading state to true while waiting for the response
      this.loadingResponse = true;
      this.aiResponse = ''; // Clear previous responses

      try {
        // Make a request to the Firebase Cloud Function
        const response = await axios.post('https://us-central1-assignment-cf13c.cloudfunctions.net/askGenAI', {
          prompt: this.userQuestion, // Send the user's question as the prompt
        });

        // Extract the AI-generated text from the response
        this.aiResponse = response.data.response;
      } catch (error) {
        console.error('Error generating response from GenAI:', error);
        this.aiResponse = 'An error occurred while fetching the response. Please try again later.';
      } finally {
        // Turn off the loading state
        this.loadingResponse = false;
      }
    },

    // Initialize the Map with Mapbox and set default location to Melbourne
    async initializeMap() {
      try {
        // Fetch the Mapbox token from the Firebase Cloud Function
        const response = await axios.get('https://us-central1-assignment-cf13c.cloudfunctions.net/getMapboxToken');
        const mapboxToken = response.data.token;

        // Initialize Mapbox with the secure token
        mapboxgl.accessToken = mapboxToken;
        this.map = new mapboxgl.Map({
          container: 'map', // HTML container id for the map
          style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style
          center: [144.9631, -37.8136], // Default center: Melbourne
          zoom: 12, // Initial zoom level
        });

        // Add zoom and rotation controls to the map
        this.map.addControl(new mapboxgl.NavigationControl());

        // Get user's current location if available, and set the map center
        this.getUserLocation()
          .then(location => {
            this.map.setCenter([location.longitude, location.latitude]);
          })
          .catch(() => {
            console.log('Using default center: Melbourne');
          });
      } catch (error) {
        console.error('Error fetching Mapbox token:', error);
      }
    },

    // Helper function to get user's current location
    getUserLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          // Use the browser's Geolocation API to get the user's current position
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude }); // Resolve with the user's location (latitude and longitude)
            },
            error => {
              // Handle error if the user denies location access or there's a problem with geolocation
              reject(new Error('Unable to retrieve your location. Please enable location services.'));
            }
          );
        } else {
          // Reject the promise if Geolocation API is not supported by the browser
          reject(new Error('Geolocation is not supported by your browser.'));
        }
      });
    },

    // Search places near the user's location or Melbourne using Mapbox Geocoding API
    async searchPlaces() {
      const query = this.searchQuery.trim(); // Trim search query input
      if (!query) {
        alert('Please enter a search query.');
        return;
      }

      let proximity = '144.9631,-37.8136'; // Default proximity set to Melbourne

      try {
        // Try to get user's current location for proximity-based searching
        const location = await this.getUserLocation();
        proximity = `${location.longitude},${location.latitude}`;
      } catch (error) {
        console.warn('Using default location (Melbourne) due to error:', error);
      }

      // Make request to Mapbox Geocoding API to find places of interest
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

        // Add markers for each search result and extend the map bounds
        places.forEach(place => {
          const [longitude, latitude] = place.geometry.coordinates;

          // Add a marker to the map
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h5>${place.text}</h5><p>${place.place_name}</p>`)) // Popup with place name
            .addTo(this.map);

          // Extend map bounds to include this marker
          bounds.extend([longitude, latitude]);
        });

        // Fit the map to the bounds of all the markers
        this.map.fitBounds(bounds, { padding: 50 });
      } catch (error) {
        console.error('Error searching places:', error);
        alert('Error occurred while searching for places. Please try again later.');
      }
    },

    // Get directions from startLocation to endLocation using Mapbox Directions API
    async getDirections() {
      const start = this.startLocation.trim();
      const end = this.endLocation.trim();

      if (!start || !end) {
        alert('Please provide both start and end locations.');
        return;
      }

      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(start)};${encodeURIComponent(end)}?access_token=${mapboxgl.accessToken}`;

      try {
        const response = await axios.get(directionsUrl);
        const directions = response.data.routes[0];

        if (directions) {
          alert(`Directions found: ${directions.legs[0].summary}`);
          // You can further process the directions and display them on the map
        } else {
          alert('No directions found.');
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
        alert('Failed to retrieve directions. Please try again.');
      }
    },
  }
};
</script>
<style scoped>
/* General Layout and Spacing */
.main-content {
  padding: 2rem;
}

/* Offline Status Banner */
.offline-banner {
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  padding: 1rem;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  margin-bottom: 1rem;
}

/* Hero Section Styling */
.hero {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.hero h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.hero .btn {
  padding: 0.75rem 1.5rem;
}

/* Feature Section Styling */
.features {
  margin-top: 2rem;
}

.feature {
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.feature p {
  font-size: 1rem;
  color: #555;
}

/* What We Offer Section Styling */
.offer-section {
  margin-top: 3rem;
}

.offer-section h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.offer-section p.lead {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.offer {
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1rem;
}

.offer h4 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.offer p {
  font-size: 1rem;
  color: #555;
}

/* Articles Section Styling */
.articles-section {
  margin-top: 3rem;
}

.articles-section h3, .articles-section h4 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.articles-section p.lead {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.article-card {
  text-align: left;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1rem;
}

.article-card h5 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.article-card p {
  font-size: 1rem;
  color: #555;
}

.article-card a {
  color: #007bff;
  text-decoration: none;
}

.article-card a:hover {
  text-decoration: underline;
}

/* Chatbot Section Styling */
.chatbot-section {
  padding: 2rem 0;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.chatbot-section h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.chatbot-section p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.input-group {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
}

.input-group .form-control {
  border-radius: 0.25rem;
  padding: 0.75rem;
  flex-grow: 1;
  border: 1px solid #ced4da;
  margin-right: 1rem;
}

.input-group .btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  border: none;
}

.input-group .btn:hover {
  background-color: #0056b3;
}

.ai-response {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  text-align: left;
}

.ai-response h5 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.ai-response p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0;
}

/* Map Section Styling */
.map-section {
  margin-top: 3rem;
}

.map-container {
  height: 400px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 1.5rem;
}

.map-features h4 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
}

.input-group.search-bar {
  margin-bottom: 1.5rem;
}

.search-bar input {
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  flex-grow: 1;
  margin-right: 1rem;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
}

.search-btn:hover {
  background-color: #0056b3;
}

.direction-btn {
  padding: 0.75rem 1.5rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 0.25rem;
}

.direction-btn:hover {
  background-color: #5a6268;
}

/* Appointment Section */
.appointment-section {
  margin-top: 3rem;
}

.appointment-section h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.appointment-section p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.appointment-section .btn {
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 0.25rem;
}

.appointment-section .btn:hover {
  background-color: #218838;
}

/* Footer Section */
footer {
  background-color: #f8f9fa;
  padding: 1.5rem 0;
  text-align: center;
  border-top: 1px solid #ddd;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .hero h2 {
    font-size: 1.75rem;
  }

  .feature h3 {
    font-size: 1.25rem;
  }

  .offer-section h3,
  .articles-section h3,
  .articles-section h4,
  .chatbot-section h3,
  .appointment-section h3 {
    font-size: 1.5rem;
  }

  .ai-response {
    padding: 1rem;
  }

  .search-bar input {
    margin-bottom: 1rem;
  }

  .input-group {
    flex-direction: column;
    align-items: stretch;
  }

  .input-group .form-control {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .offer,
  .article-card {
    text-align: center;
  }
}
</style>
