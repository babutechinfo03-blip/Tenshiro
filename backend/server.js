const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('dotenv').config();
const db = require('./config/db');

const bcrypt = require('bcryptjs');

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

        // Ensure user exists and has a known password
        const email = 'sanjaibtechit.official@gmail.com';
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const hashedPassword = await bcrypt.hash('1234', 10);
        
        if (existing.length === 0) {
            try {
                await db.query(
                    'INSERT INTO users (username, email, password_hash, role, year_of_study, college_name) VALUES (?, ?, ?, ?, ?, ?)',
                    ['Sanjai', email, hashedPassword, 'student', 4, 'SKCT']
                );
                console.log('User sanjaibtechit.official@gmail.com created successfully with username Sanjai and password 1234');
            } catch (insertErr) {
                if (insertErr.code === 'ER_DUP_ENTRY') {
                    // Try with a unique username
                    const uniqueUsername = `Sanjai_${Math.floor(Math.random() * 1000)}`;
                    await db.query(
                        'INSERT INTO users (username, email, password_hash, role, year_of_study, college_name) VALUES (?, ?, ?, ?, ?, ?)',
                        [uniqueUsername, email, hashedPassword, 'student', 4, 'SKCT']
                    );
                    console.log(`User sanjaibtechit.official@gmail.com created with unique username ${uniqueUsername} and password 1234`);
                } else {
                    throw insertErr;
                }
            }
        } else {
            await db.query('UPDATE users SET password_hash = ? WHERE email = ?', [hashedPassword, email]);
            console.log('User sanjaibtechit.official@gmail.com password reset to: 1234');
        }
    } catch (err) {
        console.error('Error during initDb database verification/user setup:', err);
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

// Health check & root endpoints
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Tenshiro Backend API is running' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime() });
});

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
console.log('Available Env HF Keys:', {
    HF_TOKEN: process.env.HF_TOKEN ? 'Present' : 'Not Present',
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY ? 'Present' : 'Not Present',
    HF_API_KEY: process.env.HF_API_KEY ? 'Present' : 'Not Present'
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', err);
    // Don't exit, just log it so we can see what's happening
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Log error to console without immediately exiting process to keep server alive
});
