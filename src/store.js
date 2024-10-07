import { setUserId } from 'firebase/analytics';
import { createStore } from 'vuex';

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],  // Array to store multiple users
    currentUser: null,  // Store the currently logged-in user
    currentUID: null,    // Store the current user's UID
    ratings: JSON.parse(localStorage.getItem('ratings')) || [],  // Array to store ratings, each with a reference to the user
    isLogged: false,  // Track if the user is logged in or not
  },
  mutations: {
    // Add a new user and save it to localStorage
    addUser(state, user) {
      state.users.push(user);
      localStorage.setItem('users', JSON.stringify(state.users));  // Save to localStorage
    },
    // Set the current user after login or registration
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    // Mutation to set currentUID manually
    setCurrentUID(state, uid) {
      state.currentUID = uid;
    },
    // Add or update a rating for a specific user
    addOrUpdateRating(state, { userId, rating }) {
      const existingRating = state.ratings.find(r => r.userId === userId);
      if (existingRating) {
        existingRating.rating = rating;  // Update the existing rating
      } else {
        state.ratings.push({ userId, rating });  // Add new rating if not already rated
      }
      // Persist ratings to localStorage
      localStorage.setItem('ratings', JSON.stringify(state.ratings));
    },
    // Set the logged-in state
    setLoggedIn(state, isLogged) {
      state.isLogged = isLogged;
    }
  },
  actions: {
    // Action to register a user
    registerUser({ commit }, user) {
      commit('setCurrentUser', user);
      commit('setLoggedIn', true);  // Set isLogged to true when a user registers
    },
    // Action to log in a user with their credentials
    loginUser({ commit, state }, credentials) {
      const foundUser = state.users.find(
        user => user.email === credentials.email && user.password === credentials.password
      );
      if (foundUser) {
        commit('setCurrentUser', foundUser);
        commit('setLoggedIn', true);  // Set isLogged to true when login is successful
        return true;
      } else {
        return false;
      }
    },
    // Action to submit a rating for the current user
    submitRating({ commit, state }, rating) {
      if (state.currentUser) {
        commit('addOrUpdateRating', { userId: state.currentUser.username, rating });
      }
    },
    // Action to set currentUID manually
    setCurrentUID({ commit }, uid) {
      commit('setCurrentUID', uid);  // Commit the mutation to update currentUID
    },
    // Action to log out the current user
    logoutUser({ commit }) {
      commit('setCurrentUser', null);  // Clear the current user
      commit('setLoggedIn', false);  // Set isLogged to false when the user logs out
      commit('setCurrentUID', null);  // Clear the currentUID when the user logs out
    },
  },
  getters: {
    // Get the list of all registered users
    getUsers(state) {
      return state.users;
    },
    
    // Get the currently logged-in user
    getCurrentUser(state) {
      return state.currentUser;
    },

    // Check if a user is logged in
    isLoggedIn(state) {
      return state.isLogged;
    },

    // Get the average rating across all users
    averageRating(state) {
      if (state.ratings.length === 0) return 0;
      const total = state.ratings.reduce((sum, r) => sum + r.rating, 0);
      return (total / state.ratings.length).toFixed(2);
    },

    // Get the rating for a specific user by their userId (username)
    getUserRating: (state) => (userId) => {
      const userRating = state.ratings.find(r => r.userId === userId);
      return userRating ? userRating.rating : 0;
    },

    // Get the currently logged-in user's rating, if available
    getCurrentUserRating(state) {
      if (state.currentUser) {
        const currentUserRating = state.ratings.find(r => r.userId === state.currentUser.username);
        return currentUserRating ? currentUserRating.rating : 0;
      }
      return 0;  // Return 0 if no rating is found
    },

    // Get the User ID (UID) of the currently logged-in user
    getCurrentUID(state) {
      return state.currentUID;
    },
    
    // Get all the ratings
    getAllRatings(state) {
      return state.ratings;
    }
  },
  modules: {},
});
