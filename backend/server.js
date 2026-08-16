const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('dotenv').config();
const db = require('./config/db');

// Initialize database tables
const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS resume_analyses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                target_role VARCHAR(255) NOT NULL,
                job_description TEXT NULL,
                ats_score INT NOT NULL,
                job_match_score INT NOT NULL,
                skill_match_score INT NOT NULL,
                resume_quality_score INT NOT NULL,
                placement_readiness_score INT NOT NULL,
                missing_skills TEXT NULL,
                missing_keywords TEXT NULL,
                missing_technologies TEXT NULL,
                resume_weaknesses TEXT NULL,
                ats_formatting_issues TEXT NULL,
                recruiter_review TEXT NULL,
                suggestions TEXT NULL,
                rewrites TEXT NULL,
                roadmap TEXT NULL,
                placement_probability INT NOT NULL,
                interview_probability INT NOT NULL,
                shortlisting_probability INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('Database tables verified/created successfully.');
    } catch (err) {
        console.error('Error initializing database tables:', err);
    }
};
initDb();


const app = express();

// Initialize Passport
require('./config/passport')(passport);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

// Routes
const apiRoutes = require('./routes/api');
const aptitudeRoutes = require('./routes/aptitudeRoutes');
app.use('/api', apiRoutes);
app.use('/api/aptitude', aptitudeRoutes);

// Database Connection Test
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        res.json({ message: 'Database connected', result: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Server is successfully listening on port ' + PORT);
});

// Add a keep-alive interval to prevent process exit if event loop becomes empty
setInterval(() => {
    // console.log('Keep-alive ping...');
}, 60000);

console.log('Server.js reached the end of the file.');

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', err);
    // Don't exit, just log it so we can see what's happening
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Keep the process alive for a bit to ensure log is flushed
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});
