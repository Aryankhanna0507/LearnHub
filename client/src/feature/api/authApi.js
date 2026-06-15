import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice"

// backend base url
const USER_API = "http://localhost:8080/api/v1/user/"

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["User"],
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
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(userLoggedIn({ user: result.data.user }))
          dispatch(authApi.util.invalidateTags(["User"]));
        } catch (error) {
          console.log(error)
        }
      }
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
         await queryFulfilled
          dispatch(userLoggedOut());
          dispatch(authApi.util.invalidateTags(["User"]));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET"
      }),
       providesTags: ["User"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(userLoggedIn({ user: result.data.user }))
        } catch (error) {
          console.log(error)
        }
      }

    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
        credentials: "include"
      })
    }),

  })
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation
} = authApi