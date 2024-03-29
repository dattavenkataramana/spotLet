const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
 
const app = express();
app.use(express.json())
const dbPath = path.join(__dirname, 'database.db');
let db = null;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

const initializeDbServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(3000, () =>
            console.log(`Server running at http://localhost:3000`)
        );
    } catch (e) {
        console.log(`Db Error: ${e.message}`);
        process.exit(1);
    }
};

initializeDbServer();

app.get('/sqldata', async (req, res) => {
    const getData = `SELECT * FROM sqldata`;
    try {
        const data = await db.all(getData);
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

 
app.post('/api/auth/signup', async (req, res) => {
    const { firstName, lastName, mobileNumber, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const addDataToSqlTable = `
            INSERT INTO sqldata(firstName, lastName, mobileNumber, email, password)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.run(addDataToSqlTable, [firstName, lastName, mobileNumber, email, hashedPassword]);
        res.json({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
    }
});
 

app.post('/api/auth/login', async (request, response) => {
    const { email, password } = request.body;
    const sql = `SELECT * FROM sqldata WHERE email = ? AND password = ?`;
    try {
        const dbUser = await db.get(sql, [email, password]);
        if (dbUser) {
            const { firstName } = dbUser;
            const token = jwt.sign({ firstName }, "our-jsonwebtoken-secret-key", { expiresIn: '9d' });
            return response.json({ Status: "Success", token });
        } else {
            return response.status(401).json({ Message: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
});




app.delete("/api/auth/delete/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteDataQuery = `DELETE FROM sqldata WHERE id = ?`;
        await db.run(deleteDataQuery, [id]);
        response.send("Data Deleted Successfully");
    } catch (error) {
        console.error(`Error deleting data: ${error.message}`);
        response.status(500).send("Internal Server Error");
    }
});

module.exports = app;
