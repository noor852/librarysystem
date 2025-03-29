import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import ViewBooks from "./components/ViewBooks";
import ChangePassword from "./components/ChangePassword"; // Import ChangePassword

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/view-books" element={<ViewBooks />} />
                <Route path="/change-password" element={<ChangePassword />} /> {/* New route for ChangePassword */}
            </Routes>
        </Router>
    );
}

export default App;