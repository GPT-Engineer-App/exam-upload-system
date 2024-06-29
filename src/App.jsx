import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import UploadExam from "./pages/UploadExam.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      <Route exact path="/upload-exam" element={<UploadExam />} />
      </Routes>
    </Router>
  );
}

export default App;
