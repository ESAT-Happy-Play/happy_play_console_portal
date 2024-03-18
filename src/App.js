import "./app.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { routes } from "./routes";
import './assets/fonts/Inter-Regular.otf';

import Layout from "./components/layout/Layout";
import LayoutWrapper from "./components/layout/LayoutWrapper";

import {Login, LoginNewUser, AuthOTP, ForgotPassword, UpdatePassword, Registration, RegistrationOTP,
  CompanyDetails, RegisterDetails, BranchDetails, NotFound } from './views';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="login/new" element={<LoginNewUser />} />
          <Route path="/otp/auth/:code" element={<AuthOTP />} />
          <Route path="forgot/password" element={<ForgotPassword />} />
          <Route path="update/password/:code" element={<UpdatePassword />} />
        
          {/* protected routes */}
          <Route path="/" element={<Layout />}>
            {routes}

            {/* Start Details routes */}
            <Route exact path="/companies/:id" element={<LayoutWrapper state="Administrative.Company"><CompanyDetails /></LayoutWrapper>} />
            <Route exact path="/branches/:id" element={<LayoutWrapper state="Administrative.Branch"><BranchDetails /></LayoutWrapper>} />
            {/* End Details routes */}

          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>


  );
}

export default App;
