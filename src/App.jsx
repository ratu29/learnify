import "./assets/tailwind.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Dashboard2 from "./pages/Dashboard2";
// import Schedule from "./pages/Schedule";
// import Courses from "./pages/Courses";
// import Instructors from "./pages/Instructors";
// import Error400 from "./errors-page/Error400";
// import Error401 from "./errors-page/Error401";
// import Error403 from "./errors-page/Error403";
// import Error404 from "./errors-page/Error404";
import Loading from "./components/Loading";
// import MainLayout2 from "./layouts/MainLayout2";
// import Login2 from "./pages/auth/Login2";
// import Register2 from "./pages/auth/Register2";
// import Forgot2 from "./pages/auth/Forgot2";
// import AuthLayout2 from "./layouts/AuthLayout2";
import { Suspense } from "react";

const Dashboard2 = React.lazy(() => import("./pages/Dashboard2"));
const Schedule = React.lazy(() => import("./pages/Schedule"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Instructors = React.lazy(() => import("./pages/Instructors"));

const Error400 = React.lazy(() => import("./errors-page/Error400"));
const Error401 = React.lazy(() => import("./errors-page/Error401"));
const Error403 = React.lazy(() => import("./errors-page/Error403"));
const Error404 = React.lazy(() => import("./errors-page/Error404"));

const MainLayout2 = React.lazy(() => import("./layouts/MainLayout2"));

const Login2 = React.lazy(() => import("./pages/auth/Login2"));
const Register2 = React.lazy(() => import("./pages/auth/Register2"));
const Forgot2 = React.lazy(() => import("./pages/auth/Forgot2"));

const AuthLayout2 = React.lazy(() => import("./layouts/AuthLayout2"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout2 />}>
        <Route path="/" element={<Dashboard2 />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/instructors" element={<Instructors />} />
        </Route>

        {/* Error Pages */}
        <Route element={<AuthLayout2 />}>
          <Route path="/400" element={<Error400 />} />
          <Route path="/401" element={<Error401 />} />
          <Route path="/403" element={<Error403 />} />
          <Route path="*" element={<Error404 />} />{" "}
          <Route path="/login" element={<Login2 />} />
          <Route path="/register" element={<Register2 />} />
          <Route path="/forgot" element={<Forgot2 />} />
        </Route>
      </Routes>
      </Suspense>
 );
}

export default App;
