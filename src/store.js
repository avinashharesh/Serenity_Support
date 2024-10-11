import { createStore } from 'vuex'

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    currentUser: null,
    currentUID: null,
    isLogged: false
  },
  mutations: {
    // Add a new user and save it to localStorage
    addUser(state, user) {
      state.users.push(user)
      localStorage.setItem('users', JSON.stringify(state.users))
    },
    // Set the current user after login or registration
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    // Mutation to set currentUID manually
    setCurrentUID(state, uid) {
      state.currentUID = uid
    },
    // Set the logged-in state
    setLoggedIn(state, isLogged) {
      state.isLogged = isLogged
    },
    // Add a booking to the current user's bookings array
    addBookingToCurrentUser(state, bookingDetails) {
      const currentUser = state.currentUser

      if (currentUser) {
        // Ensure bookings array exists for the user
        if (!currentUser.bookings) {
          currentUser.bookings = []
        }

        // Add the booking to the current user's bookings
        currentUser.bookings.push(bookingDetails)

        // Persist the change to localStorage
        const userIndex = state.users.findIndex((user) => user.username === currentUser.username)
        if (userIndex !== -1) {
          state.users[userIndex] = currentUser
          localStorage.setItem('users', JSON.stringify(state.users))
        }
      }
    }
  },
  actions: {
    // Action to register a user
    registerUser({ commit }, user) {
      commit('setCurrentUser', user)
      commit('setLoggedIn', true)
    },
    // Action to log in a user with their credentials
    loginUser({ commit, state }, credentials) {
      const foundUser = state.users.find(
        (user) => user.email === credentials.email && user.password === credentials.password
      )
      if (foundUser) {
        commit('setCurrentUser', foundUser)
        commit('setLoggedIn', true)
        return true
      } else {
        return false
      }
    },
    // Action to set currentUID manually
    setCurrentUID({ commit }, uid) {
      commit('setCurrentUID', uid)
    },
    // Action to log out the current user
    logoutUser({ commit }) {
      commit('setCurrentUser', null)
      commit('setLoggedIn', false)
      commit('setCurrentUID', null)
    },

    // Action to add a booking for the current user
    addBooking({ commit }, bookingDetails) {
      commit('addBookingToCurrentUser', bookingDetails)
    }
  },
  getters: {
    // Get the list of all registered users
    getUsers(state) {
      return state.users
    },

    // Get the currently logged-in user
    getCurrentUser(state) {
      return state.currentUser
    },

    getCurrentUserID(state) {
      return state.currentUID
    },

    // Check if a user is logged in
    isLoggedIn(state) {
      return state.isLogged
    },
    // Get the User ID (UID) of the currently logged-in user
    getCurrentUID(state) {
      return state.currentUID
    }
  },
  modules: {}
})
