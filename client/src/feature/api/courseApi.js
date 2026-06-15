import EditCourse from "@/pages/admin/course/EditCourse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course"
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["User"],
  // base settings for all requests
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include" // to send the cookies
  }),
  endpoints: (builder) => ({
    // register api
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Course"],
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: "",
        method: "GET"
      }),
      providesTags: ["Course"],
    }),
    editCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Course"],
    }),
  })
})
export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useEditCourseMutation
} = courseApi;