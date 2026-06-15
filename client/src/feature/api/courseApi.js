import EditCourse from "@/pages/admin/course/EditCourse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course"
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Course"],
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
    getCourseById:builder.query({
      query:(courseId)=>({
        url:`/${courseId}`,
        method:"GET"
      }),
    }),
    createLecture: builder.mutation({
      query: ({courseId,lectureTitle }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: {lectureTitle },
      }),
       invalidatesTags: ["Course"],
    }),
    getCourseLecture: builder.query({
      query: ({courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
       providesTags: ["Course"],
    }),
    editLecture:builder.mutation({
      query:({lectureTitle,isPreviewFree,videoInfo,courseId,lectureId})=>({
        url:`/${courseId}/lecture/${lectureId}`,
        method:"POST",
        body:{lectureTitle,isPreviewFree,videoInfo}
      }),
       invalidatesTags: ["Course"],
    }),
    removeLecture:builder.mutation({
      query:({lectureId})=>({
        url:`/lecture/${lectureId}`,
        method:"DELETE"
      }),
       invalidatesTags: ["Course"],
    })
  })
})
export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation
} = courseApi;