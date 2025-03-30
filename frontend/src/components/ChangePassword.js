
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css"; // ✅ Import CSS for styling

const ChangePassword = () => {
    const [name, setName] = useState(""); // State for Student Name
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [userType, setUserType] = useState(""); // State for User Type
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        if (!userType) {
            setMessage("User Type is required!");
            return;
        }
    
        if (newPassword.length < 6) {
            setMessage("New password must be at least 6 characters long!");
            return;
        }
    
        // ✅ Ensure no duplicate keys
        const requestData = {
            Name: name,
            OldPassword: oldPassword,
            NewPassword: newPassword,
            UserType: userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase(), // ✅ Fi
        };
    
        console.log("Sending Request Data:", requestData); // ✅ Debugging before sending
    
        try {
            const response = await fetch("http://localhost:5000/api/auth/change-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData), // ✅ Only one JSON.stringify call
            });
    
            const data = await response.json();
            console.log("Server Response:", data); // ✅ Debugging response
    
            if (data.success) {
                setMessage("Password changed successfully!");
                setTimeout(() => navigate("/student-dashboard"), 2000);
            } else {
                setMessage(data.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            setMessage("An error occurred, please try again!");
        }
    };
    

    // Handle going back to previous page
    const handleBack = () => {
        navigate(-1); // This will navigate back to the previous page
    };

    return (
        <div className="change-password-container">
            <h1>Change Password</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Input fields for Student Name, Old Password, New Password, and User Type */}
                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="User Type (e.g., Student)"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                />
                <button type="button" onClick={handlePasswordChange}>
                    Change Password
                </button>
                {message && <p>{message}</p>}
            </form>
            {/* Back button to navigate to the previous page */}
            <button type="button" onClick={handleBack} className="back-button">
                Back
            </button>
        </div>
    );
};

export default ChangePassword;