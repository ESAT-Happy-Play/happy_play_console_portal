import "./app.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { routes } from "./routes";
import './assets/fonts/Inter-Regular.otf';

import Layout from "./components/layout/Layout";

import { Login, LoginNewUser, AuthOTP, ForgotPassword, UpdatePassword, Registration, RegistrationOTP, 
  NotFound, RegisterDetails, Profile } from './views';
import LayoutWrapper from "./components/layout/LayoutWrapper";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="login/new" element={<LoginNewUser />} />

          <Route path="/otp/auth/:code" element={<AuthOTP />} />
          <Route path="/otp/register/:code" element={<RegistrationOTP />} />

          <Route path="forgot/password" element={<ForgotPassword />} />
          <Route path="update/password/:code" element={<UpdatePassword />} />
          
          <Route path="register/:code?" element={<Registration />} />
          <Route path="register/info/:code" element={<RegisterDetails />} />

          {/* protected routes */}
          <Route path="/" element={<Layout />}>
            <Route exact path="/profile" element= { <LayoutWrapper state="Profile.Profile"><Profile /></LayoutWrapper> } />
            {routes}
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
