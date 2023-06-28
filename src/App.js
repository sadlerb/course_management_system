import NavBar from "./components/NavBar/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Courses from "./pages/Courses";
import Manage from "./pages/Manage";
import ErrorPage from "./pages/ErrorPage.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="admin/courses" element={<Courses />} />
          <Route path="manage" element={<Manage />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
