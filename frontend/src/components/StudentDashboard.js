import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css"; // ✅ Import CSS for styling

const StudentDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h1>Welcome to Student Dashboard</h1>

            <div className="dashboard-buttons">
                <button onClick={() => navigate("/view-books")}>View Books</button>
                <button onClick={() => navigate("/change-password")}>Change Password</button> {/* New button for Change Password */}
                <button onClick={() => navigate("/")}>Logout</button>
            </div>
        </div>
    );
};

export default StudentDashboard;
