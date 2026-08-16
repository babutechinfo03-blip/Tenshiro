const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { username, email, password, role, year_of_study, college_name } = req.body;
    try {
        // Check if user exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existing.length > 0) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await db.query(
            'INSERT INTO users (username, email, password_hash, role, year_of_study, college_name) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, role || 'student', year_of_study, college_name]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Users found:', users.length);
        if (users.length === 0) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        console.log('Comparing passwords for user:', user.username);
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create Token
        console.log('Signing token for user:', user.id);
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log('Login successful');
        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, email, role, year_of_study, college_name, preferred_language FROM users WHERE id = ?', [req.user.id]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update User Language/Profile
exports.updateLanguage = async (req, res) => {
    const { language } = req.body;
    if (!language) return res.status(400).json({ message: 'Language is required' });

    try {
        await db.query('UPDATE users SET preferred_language = ? WHERE id = ?', [language, req.user.id]);
        res.json({ message: 'Language updated successfully', language });
    } catch (err) {
        console.error('Update Language Error:', err);
        res.status(500).json({ error: 'Failed to update language' });
    }
};

// Google OAuth Callback Handler
exports.googleAuth = async (req, res) => {
    try {
        const user = req.user;

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Redirect to frontend with token
        res.redirect(`http://localhost:5173/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: user.id,
            username: user.username,
            role: user.role
        }))}`);
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.redirect('http://localhost:5173/login?error=auth_failed');
    }
};

// Developer Bypass Login
exports.devLogin = async (req, res) => {
    const { email, username } = req.body;
    const targetEmail = email || 'devuser@example.com';
    const targetName = username || 'Developer User';

    try {
        // Use a test user or create one
        let [users] = await db.query('SELECT * FROM users WHERE email = ?', [targetEmail]);
        let user;

        if (users.length === 0) {
            const [result] = await db.query(
                'INSERT INTO users (username, email, google_id, role) VALUES (?, ?, ?, ?)',
                [targetName, targetEmail, `dev_bypass_${Date.now()}`, 'student']
            );
            const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
            user = newUser[0];
        } else {
            user = users[0];
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error('Dev Login Error:', err);
        res.status(500).json({ error: 'Dev login failed' });
    }
};

// Subscribe to Job Alerts
exports.subscribeJobAlerts = async (req, res) => {
    const { role, platforms } = req.body;
    const userId = req.user.id;

    if (!role || !platforms || platforms.length === 0) {
        return res.status(400).json({ message: 'Role and at least one platform are required.' });
    }

    try {
        // Ensure the job_alerts table exists
        await db.query(`
            CREATE TABLE IF NOT EXISTS job_alerts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                role VARCHAR(255) NOT NULL,
                platforms JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Check if alert already exists for this role
        const [existing] = await db.query('SELECT id FROM job_alerts WHERE user_id = ? AND role = ?', [userId, role]);

        if (existing.length > 0) {
            // Update existing alert
            await db.query('UPDATE job_alerts SET platforms = ? WHERE id = ?', [JSON.stringify(platforms), existing[0].id]);
        } else {
            // Insert new alert
            await db.query('INSERT INTO job_alerts (user_id, role, platforms) VALUES (?, ?, ?)', [userId, role, JSON.stringify(platforms)]);
        }

        res.json({ message: `Successfully subscribed to ${role} alerts on ${platforms.join(', ')}.` });
    } catch (err) {
        console.error('Job Alerts Subscription Error:', err);
        res.status(500).json({ error: 'Failed to subscribe to job alerts' });
    }
};
