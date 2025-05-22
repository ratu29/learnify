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

// export default App;

// import React, { Suspense } from "react";
// import "./assets/tailwind.css";
// import { Route, Routes } from "react-router-dom";
// import Loading from "./components/Loading";
// import Home from "./pages/guest/Home";
// import About from "./pages/guest/About";
// import TopProduct from "./pages/guest/TopProduct";
// import Testimonials from "./pages/guest/TestiMonials";
// import CekStok from "./pages/guest/CekStok";

// import GuestLayout from '../../../Users/user/AppData/Local/Temp/b7440d0a-1f45-459f-a058-869f58025324_src.zip.324/src/layouts/Guest/GuestLayout';
// import Dashboard from "./pages/Dashboard";
// import Customers from './pages/customers';
// import Orders from './pages/orders';
// import NotFound from './pages/NotFound';
// import MainLayout from './layouts/MainLayout';
// import Register from './pages/auth/Register';
// import Forgot from './pages/auth/Forgot';
// import AuthLayout from './layouts/AuthLayout';
// import Login from './pages/auth/Login';

// const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// const Orders = React.lazy(() => import("./pages/Orders"));
// const Customers = React.lazy(() => import("./pages/Customers"));
// const NotFound = React.lazy(() => import("./pages/NotFound"));
// const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
// const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
// const Login = React.lazy(() => import("./pages/auth/Login"));
// const Register = React.lazy(() => import("./pages/auth/Register"));
// const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// function App() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route path="*" element={<NotFound />} />
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/Orders" element={<Orders />} />
//           <Route path="/customers" element={<Customers />} />
//         </Route>

//         <Route element={<AuthLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot" element={<Forgot />} />
//         </Route>

//         <Route element={<GuestLayout />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/product" element={<TopProduct />} />
//           <Route path="/testimoni" element={<Testimonials />} />
//         </Route>
//       <Route path="/Cek" element={<CekStok />} />
//       </Routes>
//     </Suspense>
//   );
// }

export default App;
