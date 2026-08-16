const db = require('../config/db');
const { Groq } = require('groq-sdk');

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

// Initialize Database Tables
const initAcademyDB = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS academy_curriculum (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(255) NOT NULL,
                skill VARCHAR(255) NOT NULL,
                toc_data JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_role_skill (role, skill)
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS academy_content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(255) NOT NULL,
                skill VARCHAR(255) NOT NULL,
                topic VARCHAR(255) NOT NULL,
                content_data JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_topic (role, skill, topic)
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS academy_progress (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                role VARCHAR(255) NOT NULL,
                skill VARCHAR(255) NOT NULL,
                topic VARCHAR(255) NOT NULL,
                status ENUM('Not Started', 'In Progress', 'Completed', 'Mastered') DEFAULT 'Not Started',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY unique_user_topic (user_id, role, skill, topic),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS gamification_profiles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL UNIQUE,
                xp INT DEFAULT 0,
                level INT DEFAULT 1,
                streak INT DEFAULT 0,
                badges JSON,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
    } catch (err) {
        console.error("Failed to initialize Academy DB:", err);
    }
};

// Call once on load
initAcademyDB();

// ----------------------------------------------------
// Core API Methods
// ----------------------------------------------------

exports.getCurriculum = async (req, res) => {
    const { role, skill, language = 'en' } = req.body;
    
    if (!role || !skill) return res.status(400).json({ message: "Role and skill are required." });

    try {
        // 1. Check cache
        const [cached] = await db.query('SELECT toc_data FROM academy_curriculum WHERE role = ? AND skill = ?', [role, skill]);
        if (cached.length > 0) {
            return res.json(JSON.parse(cached[0].toc_data));
        }

        // 2. If not cached, generate via AI
        if (!groq) throw new Error("No API Key");

        const langName = { en: 'English', ta: 'Tamil', hi: 'Hindi' }[language] || 'English';

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a master curriculum architect for a global tech university. Generate a W3Schools/Roadmap style syllabus. Output strictly in ${langName}.`
                },
                {
                    role: "user",
                    content: `Create a comprehensive curriculum for learning "${skill}" to become a "${role}".
                    
                    Return STRICTLY a JSON object with:
                    {
                        "overview": "Brief introduction to the skill.",
                        "modules": [
                            {
                                "module_title": "e.g., Introduction to HTML",
                                "topics": ["What is HTML?", "HTML Editors", "HTML Basic", "HTML Elements", "HTML Attributes"]
                            },
                            {
                                "module_title": "e.g., Forms and Inputs",
                                "topics": ["HTML Forms", "HTML Form Attributes", "HTML Input Types"]
                            }
                        ]
                    }`
                }
            ],
            response_format: { type: "json_object" }
        });

        const tocData = completion.choices[0].message.content;
        
        // Save to cache
        await db.query('INSERT INTO academy_curriculum (role, skill, toc_data) VALUES (?, ?, ?)', [role, skill, tocData]);

        res.json(JSON.parse(tocData));

    } catch (err) {
        console.error("Curriculum generation failed:", err);
        // Fallback Mock
        res.json({
            overview: `Learn ${skill} fundamentals to advance your ${role} career.`,
            modules: [
                { module_title: `Basics of ${skill}`, topics: ["Introduction", "Syntax", "Variables"] },
                { module_title: `Advanced ${skill}`, topics: ["Functions", "Best Practices", "Projects"] }
            ]
        });
    }
};

exports.getLessonContent = async (req, res) => {
    const { role, skill, topic, language = 'en' } = req.body;
    
    if (!role || !skill || !topic) return res.status(400).json({ message: "Role, skill, and topic are required." });

    try {
        // 1. Check cache
        const [cached] = await db.query('SELECT content_data FROM academy_content WHERE role = ? AND skill = ? AND topic = ?', [role, skill, topic]);
        if (cached.length > 0) {
            return res.json(JSON.parse(cached[0].content_data));
        }

        if (!groq) throw new Error("No API Key");
        const langName = { en: 'English', ta: 'Tamil', hi: 'Hindi' }[language] || 'English';

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a world-class technical instructor writing W3Schools/Roadmap style content. 
                    Be extremely practical, visually descriptive, and comprehensive. Output strictly in ${langName}.`
                },
                {
                    role: "user",
                    content: `Create a comprehensive lesson for the topic "${topic}" within the skill "${skill}" for a "${role}".
                    
                    Return STRICTLY a JSON object matching this exact structure:
                    {
                        "explanation": "Markdown string: Detailed theory and explanation. Use bolding, lists, and headings.",
                        "examples": [
                            {
                                "title": "Example Name",
                                "code": "The exact code snippet",
                                "language": "javascript/html/python/etc",
                                "output": "Expected output"
                            }
                        ],
                        "visual_cards": [
                            { "title": "Concept", "description": "Short explanation like a flashcard" }
                        ],
                        "quiz": {
                            "question": "A multiple choice question testing the concept",
                            "options": ["A", "B", "C", "D"],
                            "correct_answer": "A"
                        },
                        "assignment": "A mini challenge or practice problem",
                        "interview_questions": [
                            { "q": "Question", "a": "Answer" }
                        ],
                        "cheat_sheet": ["Bullet 1", "Bullet 2"]
                    }`
                }
            ],
            response_format: { type: "json_object" }
        });

        const lessonData = completion.choices[0].message.content;

        // Save to cache
        await db.query('INSERT INTO academy_content (role, skill, topic, content_data) VALUES (?, ?, ?, ?)', [role, skill, topic, lessonData]);

        res.json(JSON.parse(lessonData));

    } catch (err) {
        console.error("Lesson generation failed:", err);
        res.status(500).json({ error: "Failed to generate lesson content." });
    }
};

exports.updateProgress = async (req, res) => {
    const { role, skill, topic, status } = req.body;
    const userId = req.user.id;

    try {
        // Ensure Gamification profile exists
        await db.query('INSERT IGNORE INTO gamification_profiles (user_id, badges) VALUES (?, ?)', [userId, '[]']);

        // Update Progress
        await db.query(`
            INSERT INTO academy_progress (user_id, role, skill, topic, status) 
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE status = ?
        `, [userId, role, skill, topic, status, status]);

        // If completed, award XP
        if (status === 'Completed' || status === 'Mastered') {
            const xpReward = status === 'Mastered' ? 100 : 50;
            await db.query('UPDATE gamification_profiles SET xp = xp + ? WHERE user_id = ?', [xpReward, userId]);
            
            // Level up logic (every 500 XP = 1 Level)
            await db.query('UPDATE gamification_profiles SET level = FLOOR(xp / 500) + 1 WHERE user_id = ?', [userId]);
        }

        res.json({ message: "Progress updated successfully" });

    } catch (err) {
        console.error("Progress update failed:", err);
        res.status(500).json({ error: "Failed to update progress" });
    }
};

exports.getGamificationProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const [profiles] = await db.query('SELECT * FROM gamification_profiles WHERE user_id = ?', [userId]);
        if (profiles.length > 0) {
            res.json(profiles[0]);
        } else {
            res.json({ xp: 0, level: 1, streak: 0, badges: [] });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch gamification profile" });
    }
};

exports.getUserProgress = async (req, res) => {
    const { role, skill } = req.params;
    const userId = req.user.id;
    
    try {
        const [progress] = await db.query('SELECT topic, status FROM academy_progress WHERE user_id = ? AND role = ? AND skill = ?', [userId, role, skill]);
        
        const progressMap = {};
        progress.forEach(p => {
            progressMap[p.topic] = p.status;
        });

        res.json(progressMap);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch progress" });
    }
};

exports.askAITutor = async (req, res) => {
    const { topic, message, language = 'en' } = req.body;
    
    try {
        if (!groq) throw new Error("No API Key");

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are an AI teaching assistant. The student is currently learning about "${topic}". Answer their question clearly, providing examples if necessary.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 500
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: "AI Tutor is currently unavailable." });
    }
};
