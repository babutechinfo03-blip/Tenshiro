const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');
const aiController = require('../controllers/aiController');
const interviewController = require('../controllers/interviewController');
const assistantController = require('../controllers/assistantController');
const communicationController = require('../controllers/communicationController');
const scheduleController = require('../controllers/scheduleController');
const resumeController = require('../controllers/resumeController');
const academyController = require('../controllers/academyController');

// Multer configurations for file upload memory storage
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Auth Routes
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.post('/auth/dev-login', userController.devLogin);
router.get('/auth/user', auth, userController.getProfile);
router.put('/auth/update-language', auth, userController.updateLanguage);
router.post('/auth/job-alerts', auth, userController.subscribeJobAlerts);

// Google OAuth Routes
const googleAuthMiddleware = (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_ID === 'your_google_client_id') {
        return res.status(503).json({ error: 'Google OAuth is not configured on this server' });
    }
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })(req, res, next);
};

const googleCallbackMiddleware = (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_ID === 'your_google_client_id') {
        return res.redirect((process.env.FRONTEND_URL || 'http://localhost:5173') + '/login?error=oauth_not_configured');
    }
    passport.authenticate('google', {
        session: false,
        failureRedirect: (process.env.FRONTEND_URL || 'http://localhost:5173') + '/login?error=auth_failed'
    })(req, res, next);
};

router.get('/auth/google', googleAuthMiddleware);
router.get('/auth/google/callback', googleCallbackMiddleware, userController.googleAuth);

// Data Routes
router.get('/domains', auth, dataController.getDomains);
router.get('/domains/:domainId/roles', auth, dataController.getRolesByDomain);
router.get('/roles/:id', auth, dataController.getRoleDetails);
router.get('/roles/:id/study-plan', auth, dataController.getStudyPlan); // New
router.get('/roadmap/:roleId', auth, dataController.getRoadmap);

// Jobs & Internships Routes
router.get('/jobs', auth, dataController.getAllJobs);
router.get('/jobs/role/:roleId', auth, dataController.getJobsByRole);
router.get('/applications', auth, dataController.getUserApplications);
router.post('/applications', auth, dataController.trackApplication);
router.put('/applications/:id', auth, dataController.updateApplicationStage);

// AI Routes
router.post('/ai/chat', auth, aiController.chat);
router.post('/ai/premium-overview', auth, aiController.getPremiumOverview);
router.get('/ai/chat-history', auth, aiController.getChatHistory); // New
router.post('/ai/course-recommendation', auth, aiController.courseRecommendation); // New
router.post('/ai/project-suggestion', auth, aiController.projectSuggestion); // New
router.post('/ai/job-recommendation', auth, aiController.jobRecommendation); // New
router.post('/ai/placement-guidance', auth, aiController.placementGuidance); // New
router.post('/ai/roadmap', auth, aiController.generateRoadmap); // New
router.post('/ai/translate', auth, aiController.translate); // New
router.post('/ai/skill-tutorial', auth, aiController.getSkillTutorial); // New

// Interview Intelligence Routes
router.post('/interview/generate', auth, interviewController.generateQuestions);
router.post('/interview/analyze', auth, interviewController.analyzeInterview);
router.post('/interview/prep-data', auth, interviewController.getPrepData);
router.get('/interview/history', auth, interviewController.getHistory);

// Communication Intelligence Content Routes
router.get('/comm/grammar', auth, communicationController.getGrammarTopics);
router.get('/comm/quizzes', auth, communicationController.getGrammarQuizzes);
router.get('/comm/courses', auth, communicationController.getCourses);
router.get('/comm/videos', auth, communicationController.getVideos);
router.get('/comm/resources', auth, communicationController.getResources);
router.get('/comm/pdfs', auth, communicationController.getPdfs);
router.post('/comm/analyze-speech', auth, communicationController.analyzeSpeech);
router.post('/comm/ai-chat', auth, communicationController.handleAiChat);
router.get('/comm/topic-quiz', auth, communicationController.getTopicQuiz);

// Schedule Routes
router.get('/schedules', auth, scheduleController.getSchedules);
router.post('/schedules', auth, scheduleController.addSchedule);
router.delete('/schedules/:id', auth, scheduleController.deleteSchedule);
router.put('/schedules/:id/toggle', auth, scheduleController.toggleCompletion);

// Enhanced AI features
router.post('/ai/save-roadmap', auth, aiController.saveUserRoadmap);
router.get('/ai/my-roadmaps', auth, aiController.getUserRoadmaps);

// PathPilot AI — Primary unified endpoint (no auth — accessible to all users)
router.post('/pathpilot-ai', assistantController.pathpilotChat);

// Legacy endpoint (backward compat)
router.post('/assistant', assistantController.chat);

// Resume Intelligence Routes
router.post('/resume/analyze', auth, resumeController.analyze);
router.get('/resume/history', auth, resumeController.getHistory);
router.get('/resume/history/:id', auth, resumeController.getById);
router.delete('/resume/history/:id', auth, resumeController.delete);
router.post('/resume/extract', auth, upload.single('resume'), resumeController.extract);
router.post('/resume/enhance', auth, resumeController.enhance);
router.get('/resume/templates', auth, resumeController.getTemplates);
router.post('/resume/templates', auth, resumeController.createTemplate);

// Career Learning Academy Routes
router.post('/academy/curriculum', auth, academyController.getCurriculum);
router.post('/academy/lesson', auth, academyController.getLessonContent);
router.post('/academy/progress', auth, academyController.updateProgress);
router.get('/academy/progress/:role/:skill', auth, academyController.getUserProgress);
router.get('/academy/gamification', auth, academyController.getGamificationProfile);
router.post('/academy/ask-tutor', auth, academyController.askAITutor);

module.exports = router;
