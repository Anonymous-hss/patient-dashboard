const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "admin", // Replace with your MySQL password
  database: "PatientDashboard", // Replace with your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// API endpoint to get patient interactions
// Assuming you have Express set up
app.get('/api/patient-interactions/:id', (req, res) => {
  const interactionId = req.params.id;
  connection.query('SELECT * FROM PatientInteractions WHERE InteractionID = ?', [interactionId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]); // Return the interaction details
  });
});

app.post('/api/patient-interactions/:id/query', (req, res) => {
  const interactionId = req.params.id;
  const { query } = req.body;
  const patientId = 1; // Replace with actual patient ID
  const doctorId = 1; // Replace with actual doctor ID

  connection.query('INSERT INTO PatientInteractions (PatientID, DoctorID, Query) VALUES (?, ?, ?)', [patientId, doctorId, query], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Query submitted successfully' });
  });

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
