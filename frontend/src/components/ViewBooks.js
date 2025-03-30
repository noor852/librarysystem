import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewBooks.css"; // ✅ Import CSS for styling

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/books");
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="view-books-container">
            <h1>Available Books</h1>
            
            <table className="books-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Published Year</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.BookID}>
                            <td>{book.BookID}</td>
                            <td>{book.Title}</td>
                            <td>{book.PublishedYear}</td>
                            <td>{book.Quantity}</td>
                            <td>{book.Price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="back-button" onClick={() => navigate("/student-dashboard")}>
                Back to Dashboard
            </button>
        </div>
    );
};

export default ViewBooks;
