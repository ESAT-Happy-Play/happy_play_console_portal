import "./app.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { routes } from "./routes";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import NotFound from "./pages/404/NotFound";

import AgentLogin from "./pages/console/login/AgentLogin";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="dashboard/login" element={<Login />} />
          <Route path="agent/login" element={<AgentLogin />} />
          <Route path="register/:code" element={<Registration />} />

          {/* protected routes */}
          <Route path="/" element={<Layout />}>
            {routes}
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
