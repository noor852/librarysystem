import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // ✅ Importing plain CSS file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        let apiUrl = role === "student"
            ? "http://localhost:5000/student/login"
            : "http://localhost:5000/librarian/login";

        console.log("API Call to:", apiUrl); // ✅ Debugging log

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            console.log("Raw Response:", response); // ✅ Debugging log

            const data = await response.json();
            console.log("Response Data:", data); // ✅ Debugging log

            if (data.success) {
                navigate(role === "student" ? "/student-dashboard" : "/admin-dashboard");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Fetch Error:", err); // ✅ Debugging log
            setError("Server error! Try again.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-box">
                <h2>Library Login</h2>

                <label>Select Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="librarian">Librarian</option> {/* ✅ Fixed admin → librarian */}
                </select>

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                {error && <p className="error">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;