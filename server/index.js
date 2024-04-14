require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/api/post", (req, res) => {
    const { name, email, contact, team_name, domain, college_name, participants_no } = req.body;
    
    // Check if all required fields are present
    if (!name || !email || !contact || !team_name || !domain || !college_name || !participants_no) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sqlInsert = "INSERT INTO contact_db (name, email, contact, team_name, domain, college_name, participants_no) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [name, email, contact, team_name, domain, college_name, participants_no], (error, result) => {
        if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        console.log("Data inserted successfully");
        res.status(201).json({ message: "Data inserted successfully" });
    });
});


app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;

    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.error("Error removing data:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        console.log("Data removed successfully");
        res.status(200).json({ message: "Data removed successfully" });
    });
});



app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, [id], (error, result) => {
        if (error) {
            console.error("Error fetching data:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(result[0]); // Return the first (and only) result
    });
});


// api for updating the data
app.put("/api/put/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact, team_name, domain, college_name, participants_no } = req.body;
    
    // Check if all required fields are present
    if (!name || !email || !contact || !team_name || !domain || !college_name || !participants_no) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ?, team_name = ?, domain = ?, college_name = ?, participants_no = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, team_name, domain, college_name, participants_no, id], (error, result) => {
        if (error) {
            console.error("Error updating data:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        console.log("Data updated successfully");
        res.status(200).json({ message: "Data updated successfully" });
    });
});







// creating a get api to get the data from mysql
app.get("/api/get", (req, res)=> {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (errpr, result) => {
        res.send(result);
    })
})

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact, team_name, domain, college_name, participants_no) VALUES ('Kamal', 'krisha@gmail.com', '21212121212', 'Team B', 'example.com', 'ABC College', 5)";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
