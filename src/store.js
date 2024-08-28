import { createStore } from 'vuex';

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],  // Array to store multiple users
    currentUser: null,  // Store the currently logged-in user
    ratings: [],  // Array to store ratings, each with a reference to the user
    isLogged: false,  // Track if the user is logged in or not
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
      localStorage.setItem('users', JSON.stringify(state.users));  // Save to localStorage
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    addOrUpdateRating(state, { userId, rating }) {
      const existingRating = state.ratings.find(r => r.userId === userId);
      if (existingRating) {
        existingRating.rating = rating;  // Update the existing rating
      } else {
        state.ratings.push({ userId, rating });  // Add new rating if not already rated
      }
    },
    setLoggedIn(state, isLogged) {
      state.isLogged = isLogged;
    },
  },
  actions: {
    registerUser({ commit }, user) {
      commit('addUser', user);
      commit('setCurrentUser', user);
      commit('setLoggedIn', true);  // Set isLogged to true when a user registers
    },
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
    submitRating({ commit, state }, rating) {
      if (state.currentUser) {
        commit('addOrUpdateRating', { userId: state.currentUser.username, rating });
      }
    },
    logoutUser({ commit }) {
      commit('setCurrentUser', null);  // Clear the current user
      commit('setLoggedIn', false);  // Set isLogged to false when the user logs out
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    isLoggedIn(state) {
      return state.isLogged;
    },
    averageRating(state) {
      if (state.ratings.length === 0) return 0;
      const total = state.ratings.reduce((sum, r) => sum + r.rating, 0);
      return (total / state.ratings.length).toFixed(2);
    },
    getUserRating(state) {
      return (userId) => {
        const userRating = state.ratings.find(r => r.userId === userId);
        return userRating ? userRating.rating : 0;
      };
    },
  },
});
