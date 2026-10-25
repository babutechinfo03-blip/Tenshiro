const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CLIENT_ID !== 'your_google_client_id') {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const googleId = profile.id;
                const username = profile.displayName;

                // Check if user exists with this Google ID
                const [existingUsers] = await db.query(
                    'SELECT * FROM users WHERE google_id = ? OR email = ?',
                    [googleId, email]
                );

                if (existingUsers.length > 0) {
                    // User exists, update google_id if not set
                    const user = existingUsers[0];
                    if (!user.google_id) {
                        await db.query('UPDATE users SET google_id = ? WHERE id = ?', [googleId, user.id]);
                    }
                    return done(null, user);
                } else {
                    // Create new user
                    const [result] = await db.query(
                        'INSERT INTO users (username, email, google_id, role) VALUES (?, ?, ?, ?)',
                        [username, email, googleId, 'student']
                    );

                    const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
                    return done(null, newUser[0]);
                }
            } catch (error) {
                return done(error, null);
            }
        }));
        console.log('✅ Google OAuth configured successfully');
    } else {
        console.log('⚠️ Google OAuth credentials not set. Google login disabled.');
    }
};
