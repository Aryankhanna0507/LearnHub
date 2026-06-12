import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../authSlice"

// backend base url
const USER_API = "http://127.0.0.1:8080/api/v1/user/"

export const authApi = createApi({
  reducerPath: "authApi",

  // base settings for all requests
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include" // cookies send karne ke liye
  }),

  endpoints: (builder) => ({

    // register api
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData
      })
    }),

    // login api
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData
      }),

      // login success ke baad redux me user save
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(userLoggedIn({ user: result.data.user }))
        } catch (error) {
          console.log("Login failed")
        }
      }
    }),
  })
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation
} = authApi