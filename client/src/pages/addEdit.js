import React, { useState, useEffect } from 'react';
import './addEdit.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    contact: '',
    team_name: '',
    domain: '',
    college_name: '',
    participants_no: ''
};

function AddEdit() {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // Fetch existing data if editing
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/get/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        for (const key in formData) {
            if (formData[key] === '') {
                toast.error('Please fill in all input fields.');
                return;
            }
        }

        try {
            if (id) {
                // Update existing contact
                await axios.put(`http://localhost:5000/api/put/${id}`, formData);
                toast.success("Contact updated successfully!");
            } else {
                // Add new contact
                await axios.post("http://localhost:5000/api/post", formData);
                toast.success("Contact added successfully!");
            }
            setFormData(initialState); // Clear form fields after successful submission
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    return (
        <div>
            <header><h1>HACKATHON REGISTRATION PANEL</h1></header>
            <div style={{ marginTop: "100px" }}>
                <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your email" value={formData.email} onChange={handleInputChange} />

                    <label htmlFor="contact">Contact:</label>
                    <input type="text" id="contact" name="contact" placeholder="Your contact" value={formData.contact} onChange={handleInputChange} />

                    <label htmlFor="team_name">Team Name:</label>
                    <input type="text" id="team_name" name="team_name" placeholder="Your team name" value={formData.team_name} onChange={handleInputChange} />

                    <label htmlFor="domain">Domain:</label>
                    <select id="domain" name="domain" value={formData.domain} onChange={handleInputChange}>
                        <option value="">Select domain</option>
                        <option value="Web/APP">Web/APP</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>

                    <label htmlFor="college_name">College Name:</label>
                    <input type="text" id="college_name" name="college_name" placeholder="Your college name" value={formData.college_name} onChange={handleInputChange} />

                    <label htmlFor="participants_no">Participants No:</label>
                    <input type="text" id="participants_no" name="participants_no" placeholder="Number of participants" value={formData.participants_no} onChange={handleInputChange} />

                    <button type="submit">Submit</button>
                    <Link to='/'>
                        <button type="button">Go back</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default AddEdit;
