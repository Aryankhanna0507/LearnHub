import { createSlice } from "@reduxjs/toolkit"

// initial auth state
const initialState = {
  user: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: "authSlice",
  initialState,

  reducers: {

    // login success -> user store + auth true
    userLoggedIn: (state, action) => {
      state.user = action.payload.user
      state.isAuthenticated = true
    },

    // logout -> reset state
    userLoggedOut: (state) => {
      state.user = null
      state.isAuthenticated = false
    }
  },
})

export const { userLoggedOut, userLoggedIn } = authSlice.actions
export default authSlice.reducer