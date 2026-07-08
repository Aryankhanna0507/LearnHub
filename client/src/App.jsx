import { Button } from "@/components/ui/button";
import Login from "./pages/login"
import Navbar from "./components/Navbar"
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import SideBar from "./pages/admin/SideBar.jsx";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/searchPage";
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from "./components/ui/ProtectedRoute";
import PurchaseCourseProtectedRoute from "./components/ui/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <>
            <HeroSection />
            {/* courses */}
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element:<AuthenticatedUser><Login /></AuthenticatedUser> 
      },
      {
        path: "my-learning",
        element:<ProtectedRoute><MyLearning /></ProtectedRoute> 
      },
      {
        path: "profile",
        element:<ProtectedRoute><Profile /></ProtectedRoute> 
      },
      {
        path: "course/search",
        element: <ProtectedRoute><SearchPage/></ProtectedRoute>
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetail/></ProtectedRoute>
      },
      {
       path:"course-progress/:courseId",
       element:<PurchaseCourseProtectedRoute><ProtectedRoute><CourseProgress/></ProtectedRoute></PurchaseCourseProtectedRoute>
      },
      // admin path starts from here 
      {
        path: "admin",
        element: <AdminRoute><SideBar /></AdminRoute>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard/>
          },
          {
            path: "course",
            element: <CourseTable/>
          },
          {
            path: "course/create",
            element: <AddCourse/>
          },
          {
            path: "course/:courseId",
            element: <EditCourse/>
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture/>
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture/>
          }
        ]
      }

    ],
  },
])
function App() {
  return (
    <main>
      <ThemeProvider>
      <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;