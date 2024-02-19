import "./app.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { routes } from "./routes";
import Login from "./views/login/Login";
import Registration from "./pages/registration/Registration";
import NotFound from "./pages/404/NotFound";

import AgentLogin from "./pages/console/login/AgentLogin";

import CompanyDetails from "./views/company/CompanyDetails";
import BranchDetails from "./pages/superadmin/branch/BranchDetails";
import EditProfileInfo from "./pages/profile/profileInfo/EditProfileInfo";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PageLayout from "./components/layout/PageLayout";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import IndexPage from "./pages/index/IndexPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/happyplay" element={<IndexPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register/:code?" element={<Registration />} />

          {/* protected routes */}
          <Route path="/" element={<Layout />}>
            {routes}

            {/* Start Details routes */}
            <Route exact path="/company/:id" element={<LayoutWrapper state="SuperAdmin.Company"><CompanyDetails /></LayoutWrapper>} />
            <Route exact path="/branch/:branchCode/:companyId" element={<LayoutWrapper state="SuperAdmin.Branch"><BranchDetails /></LayoutWrapper>} />
            <Route exact path="/profile/info/getverified" element={<LayoutWrapper state="Profile.ProfileInformation"><EditProfileInfo /></LayoutWrapper>} />
            {/* End Details routes */}
            
          </Route>
          <Route path='*' element={<NotFound />}/>
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
