import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCourses from "./pages/ManageCourses/ManageCourses.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import Layout from "./components/Layout/Layout.jsx";

import "./App.scss";
import { UserProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <HashRouter>
            <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route path=""  element={<Dashboard />} />
                <Route path="manage" element={<ManageCourses />} />
                <Route path="course/:id" element={<CourseDetails />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
        </HashRouter>
      </UserProvider>
    </div>
  );
}

export default App;
