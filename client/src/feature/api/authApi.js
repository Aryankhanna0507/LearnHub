import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../authSlice"

// backend base url
const USER_API = "http://localhost:8080/api/v1/user/"

export const authApi = createApi({
  reducerPath: "authApi",

  // base settings for all requests
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include" // to send the cookies
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

      // user saved in redux after login success 
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(userLoggedIn({ user: result.data.user }))
        } catch (error) {
          console.log("Login failed")
        }
      }
    }),
    loadUser:builder.query({
      query:()=>({
        url:"profile",
        method:"GET"
      })
    }),
    updateUser:builder.mutation({
      query:(formData)=>({
        url:"profile/update",
        method:"PUT",
        body:formData,
        credentials:"include"
      })
    })
  })
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation
} = authApi