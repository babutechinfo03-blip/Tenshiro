const db = require('../config/db');

// Add a new schedule
exports.addSchedule = async (req, res) => {
    const { title, type, start_time, end_time, description, related_id } = req.body;
    const userId = req.user.id;

    if (!title || !start_time || !end_time) {
        return res.status(400).json({ message: 'Title and times are required' });
    }

    try {
        await db.query(
            'INSERT INTO user_schedules (user_id, title, type, start_time, end_time, description, related_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, title, type, start_time, end_time, description, related_id]
        );
        res.json({ message: 'Schedule added successfully' });
    } catch (err) {
        console.error('Schedule Error:', err);
        res.status(500).json({ message: 'Failed to add schedule' });
    }
};

// Get all schedules for a user
exports.getSchedules = async (req, res) => {
    const userId = req.user.id;
    try {
        const [schedules] = await db.query(
            'SELECT * FROM user_schedules WHERE user_id = ? ORDER BY start_time ASC',
            [userId]
        );
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch schedules' });
    }
};

// Delete a schedule
exports.deleteSchedule = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        await db.query('DELETE FROM user_schedules WHERE id = ? AND user_id = ?', [id, userId]);
        res.json({ message: 'Schedule deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete' });
    }
};

// Update a schedule status (completed)
exports.toggleCompletion = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const [results] = await db.query('SELECT is_completed FROM user_schedules WHERE id = ? AND user_id = ?', [id, userId]);
        if (results.length === 0) return res.status(404).json({ message: 'Not found' });

        const newStatus = !results[0].is_completed;
        await db.query('UPDATE user_schedules SET is_completed = ? WHERE id = ?', [newStatus, id]);
        res.json({ is_completed: newStatus });
    } catch (err) {
        res.status(500).json({ message: 'Update failed' });
    }
};
