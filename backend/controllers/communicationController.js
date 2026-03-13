const grammarTopicsData = require('../data/grammarData');
const grammarQuizBank = require('../data/grammarQuizBank');
const coursesData = require('../data/coursesData');
const youtubeData = require('../data/youtubeData');
const resourcesData = require('../data/resourcesData');
const pdfsData = require('../data/pdfsData');

const getGrammarTopics = (req, res) => {
    try {
        res.json(grammarTopicsData);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getGrammarQuizzes = (req, res) => {
    try {
        const quizzes = [
            {
                id: 'q1', topicId: 'subject-verb', question: "Identify the correct sentence:",
                options: ["The list of items are on the desk.", "The list of items is on the desk.", "The lists of item is on the desk.", "The list of items were on the desk."],
                answer: 1, explanation: "The subject 'list' is singular, so it takes the singular verb 'is', regardless of the prepositional phrase 'of items'."
            },
            {
                id: 'q2', topicId: 'tenses', question: "Fill in the blank: By the time I arrived, he _______ left.",
                options: ["has", "had", "will have", "would have"],
                answer: 1, explanation: "Past perfect tense ('had left') is used to describe an action completed before another action in the past ('arrived')."
            },
            {
                id: 'q3', topicId: 'parts-of-speech', question: "In the sentence 'She sings beautifully', what part of speech is 'beautifully'?",
                options: ["Noun", "Adjective", "Adverb", "Verb"],
                answer: 2, explanation: "'Beautifully' describes the verb 'sings', making it an adverb."
            }
        ];
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getTopicQuiz = (req, res) => {
    try {
        const { topicId } = req.query;
        const bank = grammarQuizBank[topicId];
        if (!bank) {
            return res.status(404).json({ error: 'No quiz found for this topic.' });
        }
        // Shuffle and return all 10
        const shuffled = [...bank].sort(() => Math.random() - 0.5);
        res.json(shuffled);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getCourses = (req, res) => {
    try {
        const { search = '', category = '', level = '', platform = '' } = req.query;
        let results = [...coursesData];
        if (search) {
            const q = search.toLowerCase();
            results = results.filter(c =>
                c.title.toLowerCase().includes(q) ||
                c.category.toLowerCase().includes(q) ||
                c.platform.toLowerCase().includes(q)
            );
        }
        if (category) results = results.filter(c => c.category === category);
        if (level) results = results.filter(c => c.level === level);
        if (platform) results = results.filter(c => c.platform === platform);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getVideos = (req, res) => {
    try {
        const { search = '', topic = '' } = req.query;
        let results = [...youtubeData];
        if (search) {
            const q = search.toLowerCase();
            results = results.filter(v =>
                v.title.toLowerCase().includes(q) ||
                v.channel.toLowerCase().includes(q) ||
                v.topic.toLowerCase().includes(q)
            );
        }
        if (topic) results = results.filter(v => v.topic === topic);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getResources = (req, res) => {
    try {
        const { search = '', category = '' } = req.query;
        let results = [...resourcesData];
        if (search) {
            const q = search.toLowerCase();
            results = results.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.siteName.toLowerCase().includes(q) ||
                r.category.toLowerCase().includes(q)
            );
        }
        if (category) results = results.filter(r => r.category === category);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getPdfs = (req, res) => {
    try {
        const { search = '', topic = '' } = req.query;
        let results = [...pdfsData];
        if (search) {
            const q = search.toLowerCase();
            results = results.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.topic.toLowerCase().includes(q)
            );
        }
        if (topic) results = results.filter(p => p.topic === topic);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const analyzeSpeech = (req, res) => {
    try {
        const { text } = req.body;
        // Mock analysis
        const words = text.split(' ').length;
        const score = Math.min(100, words * 5 + 40);

        res.json({
            pronunciation: Math.floor(score * 0.9),
            fluency: score,
            confidence: Math.floor(score * 0.85),
            feedback: "You're speaking at a good pace. Try to project your voice a bit more on key words.",
            grammarFixes: text.toLowerCase().includes('is go') ? ["Say 'is going' instead of 'is go'"] : []
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const handleAiChat = (req, res) => {
    try {
        const { message, aiType, interviewRole } = req.body;

        let response = "";
        if (aiType === 'chat') {
            response = `That's interesting! How long have you been involved in that? Remember to use complete sentences when elaborating.`;
        } else if (aiType === 'interview') {
            const role = interviewRole || 'hr';
            if (role === 'hr') response = `Tell me about a time you had to overcome a communication barrier at work.`;
            else if (role === 'tech') response = `Could you explain the architecture of your last project and why you chose it?`;
            else response = `Where do you see your leadership impact in the next 5 years?`;
        } else if (aiType === 'tutor') {
            response = `Good attempt! A more professional way to say "${message}" would be to focus on the outcome. Try rephrasing it actively.`;
        }

        // Mock delay for realism
        setTimeout(() => {
            res.json({ response });
        }, 1000);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getGrammarTopics,
    getGrammarQuizzes,
    getTopicQuiz,
    getCourses,
    getVideos,
    getResources,
    getPdfs,
    analyzeSpeech,
    handleAiChat
};
