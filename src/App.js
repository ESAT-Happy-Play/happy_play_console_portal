import "./app.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { routes } from "./routes";
import './assets/fonts/Inter-Regular.otf';

import Login from "./views/login/Login";
import Layout from "./components/layout/Layout";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import Registration from "./views/registration/Registration";
import RegistrationOTP from "./views/registration/RegistrationOTP";
import RegisterDetails from "./views/registration/RegisterDetails";
import NotFound from "./views/404/NotFound";

import {CompanyDetails, BranchDetails} from './views';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register/:code?" element={<Registration />} />
          <Route path="register/otp/:mobilenum/:code?" element={<RegistrationOTP />} />
          <Route path="register/info/:mobilenum/:code?" element={<RegisterDetails />} />

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
