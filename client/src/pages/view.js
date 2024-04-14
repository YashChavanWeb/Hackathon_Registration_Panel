import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './view.css'; // Import the CSS file

const View = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <header><h1>HACKATHON REGISTRATION PANEL</h1></header>
      <div className="container">
        <h2 className="heading">User Info</h2>
        {user ? (
          <div className="info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Team Name:</strong> {user.team_name}</p>
            <p><strong>Domain:</strong> {user.domain}</p>
            <p><strong>College Name:</strong> {user.college_name}</p>
            <p><strong>Participants No:</strong> {user.participants_no}</p>
          </div>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default View;
