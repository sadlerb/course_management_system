import NavBar from "./components/NavBar/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Courses from "./pages/Courses";
import ManageCourses from "./pages/ManageCourses/ManageCourses.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";

import "./App.scss";
import { UserProvider } from "./context/UserContext.jsx";


function App() {


  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="admin/courses" element={<Courses />} />
              <Route path="manage" element={<ManageCourses />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
