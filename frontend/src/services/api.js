import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const loginStudent = async (email, password) => {
    return axios.post(`${API_URL}/student/login`, { Email: email, Password: password });
};

export const loginLibrarian = async (email, password) => {
    return axios.post(`${API_URL}/librarian/login`, { Email: email, Password: password });
};

export const fetchBooks = async () => {
    return axios.get(`${API_URL}/books`);
};

export const addBook = async (bookData) => {
    return axios.post(`${API_URL}/books/add`, bookData);
};

export const updateBook = async (bookData) => {
    return axios.put(`${API_URL}/books/update`, bookData);
};

export const deleteBook = async (bookID) => {
    return axios.delete(`${API_URL}/books/delete`, { data: { BookID: bookID } });
};

export const issueBook = async (issueData) => {
    return axios.post(`${API_URL}/books/issue`, issueData);
};

export const returnBook = async (returnData) => {
    return axios.post(`${API_URL}/books/return`, returnData);
};

export const checkFine = async (studentID) => {
    return axios.get(`${API_URL}/student/fine/${studentID}`);
};
