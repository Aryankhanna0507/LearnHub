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
    getSearchCourses: builder.query({
  query: ({ searchQuery="", categories=[], sortByPrice="" } = {}) => {
    // build query string
    let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;
    // append category
    if (categories && categories.length > 0) {
      const categoriesString = categories.map((category)=>encodeURIComponent(category)).join(",");
      queryString += `&categories=${categoriesString}`;
    }
    // append sort by price if available
    if (sortByPrice) {
      queryString+=`&sortByPrice=${encodeURIComponent(sortByPrice)}`;
    }
    return {
      url: queryString,
      method: "GET",
    };
  },
}),
    getPublishedCourse:builder.query({
      query:()=>({
        url:"/published-courses",
        method:"GET",
      })
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
    }),
    getLectureById:builder.query({
      query:(lectureId)=>({
        url:`/lecture/${lectureId}`
      }),
      providesTags: ["Course"],
    }),
    publishCourse:builder.mutation({
      query:({courseId,query})=>({
        url:`${courseId}/publish?publish=${query}`,
        method:"PUT"
      }),
      invalidatesTags: ["Course"],
    })
  })
})
export const {
  useCreateCourseMutation,
  useGetSearchCoursesQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation
} = courseApi;