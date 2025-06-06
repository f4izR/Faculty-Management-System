import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(8800, () => {
    console.log("Connected to Backend");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "FacultyManagementSystem"
});

db.connect(err => {
    if (err) {
        console.log("Error connecting to mysql:", err.stack);
        return;
    }
    console.log("Connected to Mysql as id " + db.threadId);
});

app.get('/', (req, res) => {
    res.json("Hello");
});

// Department Routes
app.get("/Department", (req, res) => {
    const q = "SELECT * FROM Department";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Department/:id', (req, res) => {
    const q = "SELECT * FROM Department WHERE Dep_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Department', (req, res) => {
    const { Dep_name, hod } = req.body;
    const q = "INSERT INTO Department (Dep_name, hod) VALUES (?, ?)";
    db.query(q, [Dep_name, hod], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Dep_id: data.insertId });
    });
});

app.put('/Department/:id', (req, res) => {
    const { Dep_name, hod } = req.body;
    const q = "UPDATE Department SET Dep_name = ?, hod = ? WHERE Dep_id = ?";
    db.query(q, [Dep_name, hod, req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Department/:id', (req, res) => {
    const deptId = req.params.id;
    const q = "DELETE FROM Department WHERE Dep_id = ?";
    db.query(q,[deptId] , (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Course Routes
app.get("/Course", (req, res) => {
    const q = "SELECT * FROM Course";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Course/:id', (req, res) => {
    const q = "SELECT * FROM Course WHERE Course_code = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Course', (req, res) => {
    const { Course_name, Credit_hrs } = req.body;
    const q = "INSERT INTO Course (Course_name, Credit_hrs) VALUES (?, ?)";
    db.query(q, [Course_name, Credit_hrs], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Course_code: data.insertId });
    });
});

app.put('/Course/:id', (req, res) => {
    const { Course_name, Credit_hrs } = req.body;
    const q = "UPDATE Course SET Course_name = ?, Credit_hrs = ? WHERE Course_code = ?";
    db.query(q, [Course_name, Credit_hrs, req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Course/:id', (req, res) => {
    const q = "DELETE FROM Course WHERE Course_code = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Experience Routes
app.get("/Experience", (req, res) => {
    const q = "SELECT * FROM Experience";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Experience/:id', (req, res) => {
    const q = "SELECT * FROM Experience WHERE Experience_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Experience', (req, res) => {
    const { Faculty_id, Title, Organization_name } = req.body;
    const q = "INSERT INTO Experience (Faculty_id, Title, Organization_name) VALUES (?, ?, ?)";
    db.query(q, [Faculty_id, Title, Organization_name], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Experience_id: data.insertId });
    });
});

app.put('/Experience/:id', (req, res) => {
    const { Faculty_id, Title, Organization_name } = req.body;
    const q = "UPDATE Experience SET Faculty_id = ?, Title = ?, Organization_name = ? WHERE Experience_id = ?";
    db.query(q, [Faculty_id, Title, Organization_name, req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Experience/:id', (req, res) => {
    const q = "DELETE FROM Experience WHERE Experience_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Faculty Routes
app.get("/Faculty", (req, res) => {
    const q = "SELECT * FROM Faculty";
    const q2 = `SELECT Faculty.Name, Department.Dep_name
    FROM Faculty
    INNER JOIN Department ON Faculty.Dep_id = Department.Dep_id; `
    db.query(q,q2, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});



app.get('/Faculty/:id', (req, res) => {
    const q = "SELECT * FROM Faculty WHERE Faculty_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Faculty', (req, res) => {
    const { Name, Designation, Phone_no, Dep_id } = req.body;
    const q = "INSERT INTO Faculty (Name, Designation, Phone_no, Dep_id) VALUES (?, ?, ?, ?)";
    db.query(q, [Name, Designation, Phone_no, Dep_id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Faculty_id: data.insertId });
    });
});

app.put('/Faculty/:id', (req, res) => {
    const { Name, Designation, Phone_no, Dep_id } = req.body;
    const q = "UPDATE Faculty SET Name = ?, Designation = ?, Phone_no = ?, Dep_id = ? WHERE Faculty_id = ?";
    db.query(q, [Name, Designation, Phone_no, Dep_id, req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Faculty/:id', (req, res) => {
    const q = "DELETE FROM Faculty WHERE Faculty_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Faculty Skills Routes
app.get("/Faculty_Skills", (req, res) => {
    const q = "SELECT * FROM Faculty_Skill";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Faculty_Skills/:id', (req, res) => {
    const q = "SELECT * FROM Faculty_Skill WHERE Faculty_id = ? AND Skill_id = ?";
    db.query(q, [req.params.Faculty_id, req.params.Skill_id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Faculty_Skills', (req, res) => {
    const { Faculty_id, Skill_id } = req.body;
    const q = "INSERT INTO Faculty_Skill (Faculty_id, Skill_id) VALUES (?, ?)";
    db.query(q, [Faculty_id, Skill_id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Faculty_id: data.insertId });
    });
});

app.put('/Faculty_Skills/:Faculty_id/:Skill_id', (req, res) => {
    const { Faculty_id, Skill_id } = req.body;
    const q = "UPDATE Faculty_Skill SET Skill_id = ? WHERE Faculty_id = ? AND Skill_id = ?";
    db.query(q, [Skill_id, Faculty_id, req.params.Skill_id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Faculty_Skills/:Faculty_id/:Skill_id', (req, res) => {
    const q = "DELETE FROM Faculty_Skill WHERE Faculty_id = ? AND Skill_id = ?";
    db.query(q, [req.params.Faculty_id, req.params.Skill_id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Program Routes
app.get("/Program", (req, res) => {
    const q = "SELECT * FROM Program";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Program/:id', (req, res) => {
    const q = "SELECT * FROM Program WHERE Program_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Program', (req, res) => {
    const { Program_name, Program_shift, Dep_id, program_lead } = req.body;
    const q = "INSERT INTO Program (Program_name, Program_shift, Dep_id, program_lead) VALUES (?, ?, ?, ?)";
    db.query(q, [Program_name, Program_shift, Dep_id, program_lead], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Program_id: data.insertId });
    });
});

app.put('/Program/:id', (req, res) => {
    const { Program_name, Program_shift, Dep_id, program_lead } = req.body;
    const q = "UPDATE Program SET Program_name = ?, Program_shift = ?, Dep_id = ?, program_lead = ? WHERE Program_id = ?";
    db.query(q, [Program_name, Program_shift, Dep_id, program_lead, req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Program/:id', (req, res) => {
    const q = "DELETE FROM Program WHERE Program_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Section Routes
app.get("/Section", (req, res) => {
    const q = "SELECT * FROM Section";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Section/:id', (req, res) => {
    const q = "SELECT * FROM Section WHERE Section_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Section', (req, res) => {
    const { Section_name, Enroll_year, class_advisor } = req.body;
    const q = "INSERT INTO Section (Section_name, Enroll_year, class_advisor) VALUES (?, ?, ?)";
    db.query(q, [Section_name, Enroll_year, class_advisor], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Section_id: data.insertId });
    });
});

app.put('/Section/:id', (req, res) => {
    const { Section_name, Enroll_year, class_advisor } = req.body;
    const q = "UPDATE Section SET Section_name = ?, Enroll_year = ?, class_advisor = ? WHERE Section_id = ?";
    db.query(q, [Section_name, Enroll_year, class_advisor, req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Section/:id', (req, res) => {
    const q = "DELETE FROM Section WHERE Section_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});
//---------------------//
app.get("/Skills", (req, res) => {
    const q = "SELECT * FROM Skills";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/Skills/:id', (req, res) => {
    const q = "SELECT * FROM Skills WHERE Skill_id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/Skills', (req, res) => {
    const { Skill_id, name, Education, Experience } = req.body;
    const q = "INSERT INTO Skills (Skill_id, Name, Education, Experience) VALUES (?, ?, ?, ?)";
    db.query(q, [Skill_id, name, Education, Experience], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ Skill_id: data.insertId });
    });
});

app.put('/Skills/:id', (req, res) => {
    const { name, Education, Experience } = req.body;
    const q = "UPDATE Skills SET Name = ?, Education = ?, Experience = ? WHERE Skill_id = ?";
    db.query(q, [name, Education, Experience, req.params.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/Skills/:id', (req, res) => {
    const skillId = req.params.id;
    const sql = 'DELETE FROM Skills WHERE Skill_id = ?';
    db.query(sql, [skillId], (err, result) => {
        if (err) {
            console.error('Error deleting skill:', err);  // Log the error
            return res.status(500).json({ error: 'Error deleting skill' });
        }
        if (result.affectedRows === 0) {
            console.warn('No skill found with id:', skillId);  // Log if no rows were affected
            return res.status(404).json({ error: 'Skill not found' });
        }
        console.log('Skill deleted successfully');
        return res.status(200).json({ message: 'Skill deleted successfully' });
    });
});