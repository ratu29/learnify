import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy-loaded pages
const Dashboard2 = React.lazy(() => import("./pages/Dashboard2"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Instructors = React.lazy(() => import("./pages/Instructors"));
const InstructorDetail = React.lazy(() => import("./pages/InstructorDetail"));
const InstructorForm = React.lazy(() => import("./pages/InstructorForm"));
const CourseDetail = React.lazy(() => import("./pages/CourseDetail"));
const RegistrationForm = React.lazy(() => import("./pages/RegistrationForm"));
const Students = React.lazy(() => import("./pages/Students"));
const StudentDetail = React.lazy(() => import("./pages/StudentDetail"));
const StudentForm = React.lazy(() => import("./pages/StudentForm"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const BlogForm = React.lazy(() => import("./pages/BlogForm"));
const CourseAll = React.lazy(() => import("./pages/CourseAll"));
const CourseAllForm = React.lazy(() => import("./pages/CourseAllForm"));
const CourseAllFormDetail = React.lazy(() => import("./pages/CourseAllFormDetail"));
const Messages = React.lazy(() => import("./pages/Messages"));
const Feedback = React.lazy(() => import("./pages/Feedback"));

// Error & Auth
const Error400 = React.lazy(() => import("./errors-page/Error400"));
const Error401 = React.lazy(() => import("./errors-page/Error401"));
const Error403 = React.lazy(() => import("./errors-page/Error403"));
const Error404 = React.lazy(() => import("./errors-page/Error404"));
const MainLayout2 = React.lazy(() => import("./layouts/MainLayout2"));
const AuthLayout2 = React.lazy(() => import("./layouts/AuthLayout2"));
const Login2 = React.lazy(() => import("./pages/auth/Login2"));
const Register2 = React.lazy(() => import("./pages/auth/Register2"));
const Forgot2 = React.lazy(() => import("./pages/auth/Forgot2"));

// ✅ Cek status login
const isLoggedIn = () => {
  return localStorage.getItem("authToken") === "true";
};

// ✅ Komponen Protected Route
function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ✅ Redirect root "/" ke dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ✅ Halaman utama yang dilindungi */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout2 />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard2 />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/detail/:id" element={<CourseDetail />} />
          <Route path="/courses/form" element={<RegistrationForm />} />
          <Route path="/coursesAll" element={<CourseAll />} />
          <Route path="/coursesAll/form" element={<CourseAllForm />} />
          <Route path="/courses/:id" element={<CourseAllFormDetail />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/instructors/:id" element={<InstructorDetail />} />
          <Route path="/instructors/form" element={<InstructorForm />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/students/form" element={<StudentForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blog/form" element={<BlogForm />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        {/* ✅ Auth & Error Pages (tidak dilindungi login) */}
        <Route element={<AuthLayout2 />}>
          <Route path="/login" element={<Login2 />} />
          <Route path="/register" element={<Register2 />} />
          <Route path="/forgot" element={<Forgot2 />} />
          <Route path="/400" element={<Error400 />} />
          <Route path="/401" element={<Error401 />} />
          <Route path="/403" element={<Error403 />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
