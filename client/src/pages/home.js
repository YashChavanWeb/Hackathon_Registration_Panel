import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {  
    const [data, setData] = useState([]);

    const loadData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/get");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this contact?");
        if (!confirmed) {
            return; // If not confirmed, do nothing
        }
    
        try {
            await axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact deleted successfully!");
            // Reload data after deletion
            loadData();
        } catch (error) {
            console.error("Error deleting contact:", error);
            toast.error("Failed to delete contact");
        }
    };
    

    return (
        <div style={{ marginTop: "10px" }}>
            <header><h1>HACKATHON REGISTRATION PANEL</h1></header>
            <Link to="/add">
                <button className='btn btn-contact'>Add Contact</button>
            </Link>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Contact</th>
                        <th style={{ textAlign: "center" }}>Team Name</th>
                        <th style={{ textAlign: "center" }}>Domain</th>
                        <th style={{ textAlign: "center" }}>College Name</th>
                        <th style={{ textAlign: "center" }}>Participants No</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>{item.team_name}</td> 
                                <td>{item.domain}</td>
                                <td>{item.college_name}</td> 
                                <td>{item.participants_no}</td> 
                                <td>
                                    <div>
                                        <Link to={`/update/${item.id}`}>
                                            <button className='btn btn-edit'>Edit</button>
                                        </Link>
                                        <button className='btn btn-delete' onClick={() => deleteContact(item.id)}>Delete</button>
                                        <Link to={`/view/${item.id}`}>
                                            <button className='btn btn-view'>View</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
