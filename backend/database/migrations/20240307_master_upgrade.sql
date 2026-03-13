-- New Tables for Master Upgrade

-- User Schedules (Study & Interviews)
CREATE TABLE IF NOT EXISTS user_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    type ENUM('study', 'interview', 'practice', 'other') DEFAULT 'other',
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    related_id INT, -- To link with roadmap tasks or roles
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Saved AI Roadmaps
CREATE TABLE IF NOT EXISTS user_roadmaps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_title VARCHAR(255),
    roadmap_data JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI Interview Sessions
CREATE TABLE IF NOT EXISTS interview_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_title VARCHAR(255),
    type ENUM('hr', 'technical', 'manager') DEFAULT 'hr',
    feedback JSON,
    score INT,
    transcript JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
