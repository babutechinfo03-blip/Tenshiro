const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const resumeController = require('../controllers/resumeController');

// All resume intelligence endpoints are protected by JWT authentication
router.post('/analyze', auth, resumeController.analyze);
router.get('/history', auth, resumeController.getHistory);
router.get('/history/:id', auth, resumeController.getById);
router.delete('/history/:id', auth, resumeController.delete);

module.exports = router;
