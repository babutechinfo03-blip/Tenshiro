const { OpenAI } = require('openai');
const db = require('../config/db');

// Initialize Groq AI safely via OpenAI SDK
let groq;
try {
    if (process.env.GROQ_API_KEY) {
        groq = new OpenAI({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        });
    }
} catch (e) {
    console.warn("Groq API Key missing or invalid, using mock data.");
}

const getMockCourses = (role) => {
    const platformLinks = {
        "Coursera": "https://www.coursera.org/search?query=",
        "Udemy": "https://www.udemy.com/courses/search/?q=",
        "edX": "https://www.edx.org/search?q=",
        "YouTube": "https://www.youtube.com/results?search_query=",
        "LinkedIn Learning": "https://www.linkedin.com/learning/search?keywords=",
        "Pluralsight": "https://www.pluralsight.com/search?q=",
        "Khan Academy": "https://www.khanacademy.org/search?page_search_query="
    };
    const platforms = Object.keys(platformLinks);
    const levels = ["Beginner", "Intermediate", "Advanced"];
    const courses = [];

    // Return 120 total: 40 per level to satisfy "min 100"
    for (let i = 1; i <= 120; i++) {
        const difficulty = levels[Math.floor((i - 1) / 40)];
        const platform = platforms[i % platforms.length];
        const searchQuery = encodeURIComponent(`${difficulty} ${role}`);

        courses.push({
            title: `${difficulty} ${role} Full Specialization: Volume ${i}`,
            platform: platform,
            rating: (4.0 + (Math.random() * 1.0)).toFixed(1),
            link: platformLinks[platform] + searchQuery,
            difficulty: difficulty,
            duration: `${Math.floor(Math.random() * 40) + 10} hours`,
            thumbnail: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}_${role}_${difficulty}`,
            is_free: i % 4 === 0
        });
    }
    return courses;
};

const getDomainProjects = (domainId, role) => {
    const roleLower = role.toLowerCase();

    // Comprehensive role-to-project mapping
    const projectLibrary = {
        frontend: {
            beginner: [
                { title: 'Personal Portfolio Website', desc: 'Build a responsive portfolio using HTML, CSS, and JavaScript to showcase your skills, projects, and contact information with smooth scroll animations.', stack: ['HTML', 'CSS', 'JavaScript'] },
                { title: 'Weather Dashboard App', desc: 'Create a weather app that fetches live data from OpenWeatherMap API and displays temperature, humidity, and a 5-day forecast with icons.', stack: ['HTML', 'CSS', 'JavaScript', 'REST API'] },
                { title: 'Task Manager Web App', desc: 'Develop a to-do app with add, edit, delete, and filter tasks. Persist data using localStorage and support dark/light mode toggle.', stack: ['HTML', 'CSS', 'JavaScript'] },
                { title: 'Responsive Landing Page', desc: 'Design and build a pixel-perfect landing page for a SaaS product with hero section, features, pricing, and CTA — fully mobile responsive.', stack: ['HTML', 'CSS'] },
                { title: 'Quiz Game App', desc: 'Build an interactive quiz with multiple-choice questions, score tracking, a countdown timer, and a results summary screen.', stack: ['HTML', 'CSS', 'JavaScript'] },
            ],
            intermediate: [
                { title: 'E-Commerce Product UI', desc: 'Build a React-based product listing page with cart, filters, search, and wishlist. Integrate with a mock API and manage state with Context API.', stack: ['React', 'CSS', 'Context API'] },
                { title: 'Blog Platform UI', desc: 'Create a full blog frontend with post listing, detail view, category filters, and a markdown-rendered post editor using React Router.', stack: ['React', 'React Router', 'Markdown'] },
                { title: 'Admin Dashboard', desc: 'Design a data-rich admin panel with charts, user tables, KPI cards, and sidebar navigation using React and a charting library.', stack: ['React', 'Chart.js', 'CSS'] },
                { title: 'Movie Discovery App', desc: 'Build a movie search and discovery app using TMDB API with search, genre filters, ratings, and a personal watchlist feature.', stack: ['React', 'REST API', 'CSS'] },
                { title: 'Real-Time Chat UI', desc: 'Design a WhatsApp-style chat interface with message bubbles, typing indicators, online status, and emoji picker using React.', stack: ['React', 'WebSockets', 'CSS'] },
            ],
            advanced: [
                { title: 'Full-Stack Social Media App', desc: 'Build a complete social platform with auth, posts, likes, comments, follow system, and real-time notifications using React and Node.js.', stack: ['React', 'Node.js', 'MongoDB', 'WebSockets'] },
                { title: 'Progressive Web App (PWA)', desc: 'Convert a web app into a PWA with offline support via Service Workers, push notifications, and installable app experience.', stack: ['React', 'Service Workers', 'IndexedDB'] },
                { title: 'Design System Library', desc: 'Create a reusable React component library with Storybook documentation, theming support, accessibility compliance, and npm publishing.', stack: ['React', 'TypeScript', 'Storybook'] },
                { title: 'Video Streaming Platform UI', desc: 'Build a Netflix-style frontend with video player, recommendation carousel, search, and subscription flow using React and Redux.', stack: ['React', 'Redux', 'Video.js'] },
            ]
        },
        backend: {
            beginner: [
                { title: 'REST API for a Blog', desc: 'Build a Node.js REST API with CRUD operations for blog posts, user authentication using JWT, and input validation middleware.', stack: ['Node.js', 'Express', 'MongoDB'] },
                { title: 'User Authentication System', desc: 'Implement a secure auth system with registration, login, password hashing using bcrypt, JWT tokens, and protected routes.', stack: ['Node.js', 'Express', 'JWT', 'bcrypt'] },
                { title: 'URL Shortener Service', desc: 'Create a URL shortening API that generates short codes, tracks click counts, and redirects users to the original URL.', stack: ['Node.js', 'Express', 'MongoDB'] },
                { title: 'Student Grade Management API', desc: 'Build a REST API to manage students, subjects, and grades with role-based access for admin and teachers.', stack: ['Node.js', 'Express', 'MySQL'] },
                { title: 'Weather Data Aggregator', desc: 'Create a backend service that fetches weather from multiple APIs, caches results in Redis, and exposes a unified endpoint.', stack: ['Node.js', 'Express', 'Redis'] },
            ],
            intermediate: [
                { title: 'E-Commerce Backend API', desc: 'Build a full e-commerce backend with product catalog, cart, orders, payment integration (Razorpay), and admin panel APIs.', stack: ['Node.js', 'Express', 'PostgreSQL', 'Razorpay'] },
                { title: 'Real-Time Chat Server', desc: 'Develop a WebSocket-based chat server supporting multiple rooms, message history, user presence, and file sharing.', stack: ['Node.js', 'Socket.io', 'MongoDB'] },
                { title: 'File Upload & Storage Service', desc: 'Create a file upload API with image compression, cloud storage (AWS S3), CDN delivery, and access control.', stack: ['Node.js', 'AWS S3', 'Multer'] },
                { title: 'Job Board API', desc: 'Build a job listing API with employer and candidate roles, job posting, application tracking, and email notification system.', stack: ['Node.js', 'Express', 'PostgreSQL', 'Nodemailer'] },
                { title: 'Microservices Architecture Demo', desc: 'Design a microservices system with separate auth, product, and order services communicating via REST and a message queue.', stack: ['Node.js', 'RabbitMQ', 'Docker'] },
            ],
            advanced: [
                { title: 'Scalable API Gateway', desc: 'Build an API gateway with rate limiting, request routing, authentication, logging, and load balancing for microservices.', stack: ['Node.js', 'Redis', 'Docker', 'Nginx'] },
                { title: 'Real-Time Analytics Pipeline', desc: 'Create a data pipeline that ingests events, processes them with a stream processor, and exposes real-time dashboards.', stack: ['Node.js', 'Kafka', 'ClickHouse'] },
                { title: 'Multi-Tenant SaaS Backend', desc: 'Architect a multi-tenant backend with isolated data, subscription billing, usage metering, and tenant-specific configurations.', stack: ['Node.js', 'PostgreSQL', 'Stripe', 'Docker'] },
                { title: 'GraphQL API with Subscriptions', desc: 'Build a full GraphQL API with queries, mutations, real-time subscriptions, DataLoader for N+1 prevention, and schema stitching.', stack: ['Node.js', 'GraphQL', 'Apollo', 'PostgreSQL'] },
            ]
        },
        data: {
            beginner: [
                { title: 'Sales Data Analysis Dashboard', desc: 'Analyze a retail sales dataset using Pandas, identify top products and trends, and visualize insights with Matplotlib and Seaborn.', stack: ['Python', 'Pandas', 'Matplotlib'] },
                { title: 'Student Performance Analyzer', desc: 'Explore a student grades dataset, find correlations between study hours and scores, and build visualizations for a school report.', stack: ['Python', 'Pandas', 'Seaborn'] },
                { title: 'COVID-19 Data Tracker', desc: 'Build an interactive visualization of COVID-19 global data showing cases, deaths, and vaccination rates by country over time.', stack: ['Python', 'Plotly', 'Pandas'] },
                { title: 'E-Commerce Customer Segmentation', desc: 'Use clustering algorithms to segment customers by purchase behavior and create targeted marketing recommendations.', stack: ['Python', 'Scikit-learn', 'Pandas'] },
                { title: 'Stock Market Trend Analyzer', desc: 'Fetch historical stock data using yfinance, compute moving averages, and visualize price trends and trading volume.', stack: ['Python', 'yfinance', 'Matplotlib'] },
            ],
            intermediate: [
                { title: 'Movie Recommendation System', desc: 'Build a collaborative filtering recommendation engine using user ratings data and deploy it as a Flask API endpoint.', stack: ['Python', 'Scikit-learn', 'Flask', 'Pandas'] },
                { title: 'Sentiment Analysis Pipeline', desc: 'Create an NLP pipeline to classify product reviews as positive/negative using NLTK and a trained machine learning model.', stack: ['Python', 'NLTK', 'Scikit-learn'] },
                { title: 'Real Estate Price Predictor', desc: 'Train a regression model on housing data to predict property prices, with feature engineering and model evaluation metrics.', stack: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn'] },
                { title: 'Twitter Sentiment Dashboard', desc: 'Fetch tweets using the Twitter API, run sentiment analysis, and display real-time results on an interactive Streamlit dashboard.', stack: ['Python', 'Tweepy', 'Streamlit', 'VADER'] },
                { title: 'Fraud Detection System', desc: 'Build a binary classification model to detect fraudulent transactions using imbalanced data techniques and SHAP explainability.', stack: ['Python', 'Scikit-learn', 'SHAP', 'Pandas'] },
            ],
            advanced: [
                { title: 'End-to-End ML Pipeline', desc: 'Design a production ML pipeline with data ingestion, feature engineering, model training, versioning with MLflow, and API deployment.', stack: ['Python', 'MLflow', 'FastAPI', 'Docker'] },
                { title: 'Real-Time Data Streaming Dashboard', desc: 'Build a real-time analytics system using Kafka for event streaming, Spark for processing, and a live dashboard with Grafana.', stack: ['Python', 'Kafka', 'Spark', 'Grafana'] },
                { title: 'Deep Learning Image Classifier', desc: 'Train a CNN model on a custom image dataset using PyTorch, implement transfer learning, and deploy as a web app.', stack: ['Python', 'PyTorch', 'FastAPI', 'Docker'] },
                { title: 'NLP Document Intelligence System', desc: 'Build a document Q&A system using LangChain and OpenAI embeddings to extract insights from PDFs and reports.', stack: ['Python', 'LangChain', 'OpenAI', 'FAISS'] },
            ]
        },
        fullstack: {
            beginner: [
                { title: 'Personal Blog Platform', desc: 'Build a full-stack blog with React frontend, Node.js backend, and MongoDB. Support post creation, editing, and user authentication.', stack: ['React', 'Node.js', 'MongoDB'] },
                { title: 'Expense Tracker App', desc: 'Create a full-stack expense tracker with category-wise spending, monthly charts, and user accounts with JWT authentication.', stack: ['React', 'Node.js', 'PostgreSQL'] },
                { title: 'Recipe Sharing Platform', desc: 'Build a recipe app where users can post, search, and save recipes. Include image upload, ratings, and ingredient-based search.', stack: ['React', 'Node.js', 'MongoDB', 'Cloudinary'] },
                { title: 'Event Booking System', desc: 'Develop an event listing and booking platform with seat selection, payment integration, and email confirmation.', stack: ['React', 'Node.js', 'MySQL', 'Stripe'] },
                { title: 'Job Board Application', desc: 'Build a job listing site where employers post jobs and candidates apply. Include role-based auth and application tracking.', stack: ['React', 'Node.js', 'PostgreSQL'] },
            ],
            intermediate: [
                { title: 'Real-Time Collaborative Notes App', desc: 'Build a Google Docs-style notes app with real-time multi-user editing using WebSockets, conflict resolution, and version history.', stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'] },
                { title: 'E-Commerce Platform', desc: 'Create a complete e-commerce site with product catalog, cart, checkout, Razorpay payments, order tracking, and admin panel.', stack: ['React', 'Node.js', 'PostgreSQL', 'Razorpay'] },
                { title: 'Social Media Platform', desc: 'Build a social network with posts, likes, comments, follow system, real-time notifications, and media uploads.', stack: ['React', 'Node.js', 'MongoDB', 'WebSockets'] },
                { title: 'Project Management Tool', desc: 'Create a Trello-like project board with drag-and-drop tasks, team collaboration, deadlines, and progress tracking.', stack: ['React', 'Node.js', 'PostgreSQL', 'DnD'] },
                { title: 'Learning Management System', desc: 'Build an LMS with course creation, video lessons, quizzes, progress tracking, and certificate generation.', stack: ['React', 'Node.js', 'MongoDB', 'FFmpeg'] },
            ],
            advanced: [
                { title: 'Multi-Vendor Marketplace', desc: 'Build a marketplace platform with vendor onboarding, product listings, commission system, and real-time order management.', stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe Connect'] },
                { title: 'AI-Powered SaaS Dashboard', desc: 'Create a SaaS product with AI features (summarization, recommendations), subscription billing, and multi-tenant architecture.', stack: ['React', 'Node.js', 'OpenAI', 'Stripe'] },
                { title: 'Real-Time Auction Platform', desc: 'Build a live auction system with real-time bidding, countdown timers, payment escrow, and dispute resolution.', stack: ['React', 'Node.js', 'WebSockets', 'Stripe'] },
                { title: 'Video Conferencing App', desc: 'Create a Zoom-like app with WebRTC peer-to-peer video, screen sharing, chat, and meeting recording capabilities.', stack: ['React', 'Node.js', 'WebRTC', 'Socket.io'] },
            ]
        },
        default: {
            beginner: [
                { title: `${role} Essentials Checklist`, desc: `Create a comprehensive industry-standard documentation for ${role} workflows.`, stack: ['MD', 'Standard Docs'] },
                { title: `Automated ${role} Dashboard`, desc: `Build a clean, responsive dashboard showing real-time data for ${role} performance metrics.`, stack: ['HTML', 'CSS', 'JS'] },
                { title: `Collaborative ${role} Wiki`, desc: `A shared space for teams to document ${role} best practices and common troubleshooting steps.`, stack: ['React', 'Firebase'] },
                { title: `Entry-Level ${role} Case Study`, desc: `A deep-dive analysis of how a top company solves ${role}-related challenges.`, stack: ['Research', 'Canva'] },
            ],
            intermediate: [
                { title: `${role} Process Optimizer`, desc: `Develop a tool that identifies and fixes common bottlenecks in ${role} production lines.`, stack: ['Python', 'Automation'] },
                { title: `Predictive ${role} Analytics`, desc: `Use historical data to forecast trends and supply-demand for ${role} services.`, stack: ['Python', 'Pandas', 'Plotly'] },
                { title: `Global ${role} Compliance Tool`, desc: `A validation engine to ensure ${role} tasks meet international regulatory standards.`, stack: ['Node.js', 'PostgreSQL'] },
            ],
            advanced: [
                { title: `Enterprise ${role} Infrastructure`, desc: `Architect a scalable, high-availability system for managing multi-region ${role} operations.`, stack: ['AWS', 'Terraform', 'Kubernetes'] },
                { title: `AI-Driven ${role} Automation`, desc: `A neural network based model that assists in high-level decision making for ${role} leads.`, stack: ['Python', 'PyTorch', 'OpenAI'] },
                { title: `Real-time ${role} Simulation`, desc: `A sandbox environment for training junior staff on complex ${role} edge cases.`, stack: ['React', 'Three.js', 'WebSockets'] },
            ]
        }
    };

    // Keyword matching to pick the right template
    let template = projectLibrary.default;
    if (roleLower.includes('frontend') || roleLower.includes('front-end') || roleLower.includes('ui developer') || roleLower.includes('react')) {
        template = projectLibrary.frontend;
    } else if (roleLower.includes('backend') || roleLower.includes('back-end') || roleLower.includes('node') || roleLower.includes('api developer')) {
        template = projectLibrary.backend;
    } else if (roleLower.includes('data') || roleLower.includes('analyst') || roleLower.includes('machine learning') || roleLower.includes('ml engineer')) {
        template = projectLibrary.data;
    } else if (roleLower.includes('full stack') || roleLower.includes('fullstack') || roleLower.includes('full-stack')) {
        template = projectLibrary.fullstack;
    }

    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const allProjects = [];

    levels.forEach(level => {
        const levelKey = level.toLowerCase();
        const levelTemplates = template[levelKey] || projectLibrary.default[levelKey];
        const count = 40;

        for (let i = 0; i < count; i++) {
            const base = levelTemplates[i % levelTemplates.length];
            const variation = Math.floor(i / levelTemplates.length);
            // Add variation suffix only after first cycle
            const titleSuffix = variation > 0 ? ` v${variation + 1}` : '';

            allProjects.push({
                title: `${level} – ${base.title}${titleSuffix}`,
                description: base.desc,
                difficulty: level,
                tech_stack: base.stack,
                duration: `${Math.floor(Math.random() * 5) + 2} weeks`
            });
        }
    });

    return allProjects;
};

const getMockJobs = (role) => {
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Gurugram', 'Noida', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Kochi', 'Chandigarh', 'Indore', 'Coimbatore'];
    const portals = ['LinkedIn', 'Indeed', 'Naukri.com', 'Internshala', 'Hirist', 'CutShort', 'Wellfound'];
    const companies = ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Zomato', 'Swiggy', 'Paytm', 'Razorpay', 'CRED', 'Flipkart'];
    const jobs = [];

    const logoMap = {
        'Google': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_\"G\"_logo.svg',
        'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        'TCS': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
        'Infosys': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
        'Wipro': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg',
        'Zomato': 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.svg',
        'Swiggy': 'https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png',
        'Paytm': 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo.logo.svg',
        'Razorpay': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Razorpay_logo.svg',
        'CRED': 'https://upload.wikimedia.org/wikipedia/commons/f/fe/CRED_logo.svg',
        'Flipkart': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg'
    };

    // Generate 50 internships and 50 jobs per role (100 total)
    for (let i = 1; i <= 100; i++) {
        const isInternship = i <= 50;
        const company = companies[i % companies.length];
        const portal = portals[i % portals.length];
        const location = locations[i % locations.length];

        jobs.push({
            title: isInternship ? `${role} Intern` : `${i > 75 ? 'Senior' : 'Junior'} ${role}`,
            company: company,
            type: isInternship ? 'internship' : 'job',
            location: location,
            salary_range: isInternship ? `₹${15 + (i % 20)}k/month` : `₹${5 + (i % 15)}-${12 + (i % 15)} LPA`,
            portal_name: portal,
            portal_link: `https://${portal.toLowerCase().replace('.com', '')}.com/jobs?q=${encodeURIComponent(role)}`,
            posted_date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            deadline: new Date(Date.now() + ((5 + (i % 25)) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            description: `Exciting ${isInternship ? 'internship' : 'job'} opportunity for ${role} at ${company}. Work on industry-leading products and advance your career in ${role}.`,
            requirements: `Required: Strong proficiency in ${role} fundamentals, good communication, and team spirit.`,
            thumbnail: logoMap[company] || `https://api.dicebear.com/7.x/initials/svg?seed=${company}&backgroundColor=6366f1`
        });
    }
    return jobs;
};

const getMockGuidance = (role) => ({
    overview: "Focus on building strong fundamentals and a consistent portfolio.",
    technical_skills: ["Problem Solving", "Core Concepts"],
    soft_skills: ["Communication", "Teamwork"],
    interview_tips: ["Be honest", "Practice coding"],
    resume_tips: ["Use action verbs", "Keep it simple"],
    market_outlook: "Stable demand for skilled professionals."
});

// CareerNavigator AI - Core Chat Interface
exports.chat = async (req, res) => {
    const { message, language = 'en', isVoice = false, context = {} } = req.body;
    const userId = req.user.id;

    if (!message) return res.status(400).json({ message: 'Message is required' });

    try {
        // 1. Save User Message
        await db.query(
            'INSERT INTO ai_conversations (user_id, message, sender, language, is_voice) VALUES (?, ?, ?, ?, ?)',
            [userId, message, 'user', language, isVoice]
        );

        let aiText = "CareerNavigator AI is initialized in demo mode. Please verify the API environment for full strategic capabilities.";
        let quickReplies = [];
        let action = null;

        if (groq) {
            const [users] = await db.query('SELECT username, role FROM users WHERE id = ?', [userId]);
            const userProfile = users[0];

            // Get chat history for continuity
            const [history] = await db.query(
                'SELECT message, sender FROM ai_conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
                [userId]
            );
            const conversationHistory = history.reverse();

            // Structure context for the AI
            const aptitudeData = context.aptitude || {};
            const currentPage = context.page || '/dashboard';
            const appliedJobs = context.appliedJobs || [];

            const langName = { en: 'English', ta: 'Tamil', hi: 'Hindi' }[language] || 'English';

            const systemPrompt = `You are "CareerNavigator AI", a premium, strategic career operating system for Indian college students and professionals.

--------------------------------------------------
IDENTITY & PERSONALITY
--------------------------------------------------
- Tone: Professional, Data-driven, Confident, Smart.
- Restrictions: NO emojis. NO unnecessary filler text. NO overly verbose explanations.
- Goal: Maximize user's career success probability using contextual intelligence.

--------------------------------------------------
USER CONTEXT
--------------------------------------------------
- Name: ${userProfile?.username || 'User'}
- Track: ${userProfile?.role || 'Aptitude & Placement'}
- Experience: ${userProfile?.experience_level || 'Student'}
- Aptitude Performance: ${JSON.stringify(aptitudeData.kpis || 'No data yet')}
- Weak Topics: ${JSON.stringify(aptitudeData.weak || [])}
- Current Page: ${currentPage}
- Applied Jobs/Internships: ${appliedJobs.length}

--------------------------------------------------
INTENT HANDLING RULES
--------------------------------------------------
If user asks for explanation/guidance: Respond in professional text.
If user asks to perform an action (Start mock, Open section, Apply job, Generate plan):
Return structured JSON at the END of your response (or alone if no text needed) like:
{ "type": "action", "action": "navigate", "target": "tcs_mock" }

Available Actions:
- navigate: (targets: "tcs_mock", "aptitude_practice", "progress_dashboard", "resources", "jobs")
- generate_study_plan
- analyze_performance

--------------------------------------------------
SPECIALIZED MODES
--------------------------------------------------
1. COMPANY READINESS: When asked about a specific company (e.g. "Ready for TCS?"), provide: Readiness %, Strong/Weak areas, Predicted Outcome, and Next suggested mock.
2. APTITUDE ANALYSIS: After a test, provide score summary, speed analysis, and improvement roadmap.
3. CAREER ROADMAP: Detail skills, projects, and timeline for requested roles.

--------------------------------------------------
VOICE MODE
--------------------------------------------------
If isVoice=true: Be significantly more concise and conversational. Short 1-2 sentence answers are preferred.

RESPOND IN: ${langName}. If the user speaks in ${langName}, answer in ${langName}. If they ask to translate, translate accurately.`;

            const messages = [{ role: "system", content: systemPrompt }];
            conversationHistory.forEach(msg => messages.push({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.message }));
            messages.push({ role: "user", content: message });

            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: messages,
                max_tokens: isVoice ? 150 : 800
            });

            aiText = completion.choices[0].message.content;

            // Parse for actions
            const jsonActionMatch = aiText.match(/\{[\s\S]*"type":\s*"action"[\s\S]*\}/);
            if (jsonActionMatch) {
                try {
                    action = JSON.parse(jsonActionMatch[0]);
                    // Strip JSON from visible text if it's there
                    aiText = aiText.replace(jsonActionMatch[0], '').trim();
                } catch (e) {
                    console.error("Action parse error", e);
                }
            }

            // Generate Smart Quick Replies
            try {
                const qrCompletion = await groq.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: `Suggest 3 short professional follow-up questions in ${langName} without emojis. Return JSON array of strings.` },
                        { role: "user", content: `Assistant Response: ${aiText}` }
                    ],
                    response_format: { type: "json_object" }
                });
                const qrJson = JSON.parse(qrCompletion.choices[0].message.content);
                quickReplies = qrJson.questions || qrJson;
            } catch (qrErr) {
                quickReplies = language === 'ta' ? ['மேலதிக விவரங்கள்'] : ['More Details'];
            }
        }

        await db.query(
            'INSERT INTO ai_conversations (user_id, message, sender, language, quick_replies) VALUES (?, ?, ?, ?, ?)',
            [userId, aiText, 'ai', language, JSON.stringify(quickReplies)]
        );

        res.json({ response: aiText, quickReplies, language, action });

    } catch (err) {
        console.error('CareerNavigator AI Error:', err);
        res.json({ response: "I encountered a synchronization error while processing your request.", quickReplies: ["Retry Analysis"], language });
    }
};

// Generate Course Recommendations
exports.courseRecommendation = async (req, res) => {
    const { role, domainId, language = 'en' } = req.body;
    if (!role) return res.status(400).json({ message: 'Role is required' });

    try {
        if (!groq) throw new Error("No API Key");

        const domainPlatforms = require('../config/domainPlatforms');
        const platforms = domainPlatforms[domainId] || domainPlatforms[1];
        const allPlatforms = [...platforms.free, ...platforms.paid];
        const platformList = allPlatforms.join(', ');

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a career guidance expert specializing in Indian education and job market. Generate all output strictly in ${language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English'}.`
                },
                {
                    role: "user",
                    content: `Suggest 100 top-rated online courses for becoming a "${role}". 
                    Use platforms: ${platformList}. 
                    Return STRICTLY in JSON format: [{ "title": "...", "platform": "...", "rating": "...", "link": "...", "difficulty": "Beginner/Intermediate/Advanced", "duration": "...", "is_free": boolean, "thumbnail": "..." }]`
                }
            ],
            response_format: { type: "json_object" }
        });

        const text = completion.choices[0].message.content;
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        res.json(JSON.parse(jsonMatch ? jsonMatch[0] : text));
    } catch (err) {
        console.warn(`AI Course Error: ${err.message}`);
        res.json(getMockCourses(role));
    }
};

// Generate Project Suggestions
exports.projectSuggestion = async (req, res) => {
    const { role, domainId, language = 'en' } = req.body;
    if (!role) return res.status(400).json({ message: 'Role is required' });

    const isNonCoding = [2, 3, 5, 6, 9, 11, 13, 14, 15, 16, 17, 18].includes(parseInt(domainId));

    try {
        if (!groq || isNonCoding) throw new Error("Using Mock Data");

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: `Technical project mentor. Language: ${language === 'ta' ? 'Tamil' : 'English'}.` },
                { role: "user", content: `Suggest 100 projects for "${role}". Return JSON: [{ "title": "...", "description": "...", "tech_stack": [], "difficulty": "...", "duration": "..." }]` }
            ],
            response_format: { type: "json_object" }
        });

        const text = completion.choices[0].message.content;
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        res.json(JSON.parse(jsonMatch ? jsonMatch[0] : text));
    } catch (err) {
        res.json(getDomainProjects(domainId, role));
    }
};

// Generate Job/Internship Recommendations
exports.jobRecommendation = async (req, res) => {
    const { role, language = 'en' } = req.body;
    if (!role) return res.status(400).json({ message: 'Role is required' });

    try {
        if (!groq) throw new Error("No API Key");

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: `Career recruiter. Language: ${language === 'ta' ? 'Tamil' : 'English'}.` },
                { role: "user", content: `Suggest 10 internships and 10 jobs for "${role}". Return STRICTLY as a JSON array of objects, where each object has "type": "job" or "internship", "title", "company", "location", "salary_range", "description", "deadline" (YYYY-MM-DD, ensure varied and realistic dates), "portal_name", "portal_link".` }
            ],
            response_format: { type: "json_object" }
        });

        const data = JSON.parse(completion.choices[0].message.content);
        // Ensure we return an array even if AI returns {jobs: [], internships: []}
        if (Array.isArray(data)) {
            res.json(data);
        } else if (data.jobs || data.internships) {
            const combined = [...(data.internships || []), ...(data.jobs || [])];
            res.json(combined);
        } else {
            res.json(getMockJobs(role));
        }
    } catch (err) {
        res.json(getMockJobs(role));
    }
};

// Placement Guidance
exports.placementGuidance = async (req, res) => {
    const { role, language = 'en' } = req.body;
    if (!role) return res.status(400).json({ message: 'Role is required' });

    try {
        if (!groq) throw new Error("No API Key");

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: `Placement officer. Language: ${language === 'ta' ? 'Tamil' : 'English'}.` },
                { role: "user", content: `Placement tips for "${role}". Return JSON: { "overview": "...", "technical_skills": [], "soft_skills": [], "interview_tips": [], "resume_tips": [], "market_outlook": "..." }` }
            ],
            response_format: { type: "json_object" }
        });

        res.json(JSON.parse(completion.choices[0].message.content));
    } catch (err) {
        res.json(getMockGuidance(role));
    }
};

// Chat History
exports.getChatHistory = async (req, res) => {
    const userId = req.user.id;
    try {
        const [messages] = await db.query(
            'SELECT id, message, sender, language, is_voice, quick_replies, created_at FROM ai_conversations WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
            [userId]
        );
        res.json(messages.reverse());
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch' });
    }
};

// Career Roadmap (Dynamic & Adaptive)
// Premium AI Role Overview (V2 - Executive Career Intelligence)
exports.getPremiumOverview = async (req, res) => {
    const { roleTitle } = req.body;
    if (!roleTitle) return res.status(400).json({ message: 'Role title is required' });

    try {
        if (!groq) throw new Error("No API Key");

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `Generate a premium, executive-level Career Intelligence Report for the role: ${roleTitle}.
                    
                    Tone: Strategic, Analytical, High-value, Corporate-grade.
                    Constraints: No emojis, no basic student explanations, no fluff, strictly data-driven.
                    
                    Structure the JSON strictly with these 7 sections:
                    1. strategic_positioning: { headline, summary } (Headline: Sharp positioning. Summary: 2-line executive focus on business value.)
                    2. market_intelligence: [
                         { "label": "COMPENSATION INTELLIGENCE", "value": "Range (India)", "detail": "Top percentile salary" },
                         { "label": "DEMAND VELOCITY", "value": "Accelerating/Stable/Competitive", "detail": "% Growth estimate" },
                         { "label": "CAREER GROWTH PROJECTION", "value": "Yearly growth %", "detail": "Mid-senior demand insight" },
                         { "label": "AI AUTOMATION EXPOSURE", "value": "Low/Medium/High", "detail": "1-line reasoning" }
                    ]
                    3. execution_domains: [
                        { "category": "...", "bullets": ["...", "...", "..."], "relevance": "Technical and business relevance" }
                    ] (Exactly 3 categories)
                    4. skill_depth_map: { 
                        technical_core: ["...", "..."], 
                        infrastructure: ["...", "..."], 
                        strategic: ["...", "..."] 
                    } (Comma-separated tags)
                    5. industry_adoption: ["...", "...", "...", "...", "..."] (Exactly 5 industries)
                    6. career_progression: [
                        { "level": "Entry", "years": "0-2", "salary": "Range" },
                        { "level": "Mid", "years": "3-5", "salary": "Range" },
                        { "level": "Senior", "years": "6-10", "salary": "Range" },
                        { "level": "Lead", "years": "10-15", "salary": "Range" },
                        { "level": "Principal/Director", "years": "15+", "salary": "Range" }
                    ]
                    7. future_outlook: { forecast, ai_disruption, global_vs_india_trend }`
                }
            ],
            response_format: { type: "json_object" }
        });

        res.json(JSON.parse(completion.choices[0].message.content));

    } catch (err) {
        console.warn(`Premium Overview V2 Error: ${err.message}`);
        // Fallback V2 Mock - Premium executive-level report
        res.json({
            strategic_positioning: {
                headline: `System Orchestration & Enterprise ${roleTitle} Architecture.`,
                summary: "Orchestrating complex distributed systems to drive technical innovation and operational efficiency at scale. Directly impacts business velocity and core platform reliability."
            },
            market_intelligence: [
                { label: "COMPENSATION INTELLIGENCE", value: "₹8L - ₹18L", detail: "Top 10% exceed ₹30L" },
                { label: "DEMAND VELOCITY", value: "Accelerating", detail: "18% YoY headcount growth" },
                { label: "CAREER GROWTH PROJECTION", value: "12% CAGR", detail: "Steady demand for mid-level roles" },
                { label: "AI AUTOMATION EXPOSURE", value: "Low", detail: "Complex reasoning and system design core" }
            ],
            execution_domains: [
                {
                    category: "Technical Orchestration",
                    bullets: ["Distributed Systems Design", "Scalability Architecture", "Performance Engineering"],
                    relevance: "Critical for platform reliability and innovation speed."
                },
                {
                    category: "Strategic Leadership",
                    bullets: ["Cross-functional Alignment", "Technical Debt Governance", "Platform Vision"],
                    relevance: "Ensures technical execution supports long-term business growth."
                },
                {
                    category: "Operational Excellence",
                    bullets: ["System Reliability", "Developer Productivity", "Efficiency Metrics"],
                    relevance: "Direct correlation to infrastructure cost-optimization and MTTR."
                }
            ],
            skill_depth_map: {
                technical_core: ["Systems Fundamentals", "Design Patterns", "Data Orchestration"],
                infrastructure: ["Cloud Architecture", "DevOps Systems", "Containerization"],
                strategic: ["Technical Strategy", "Risk Mitigation", "Business ROI Analysis"]
            },
            industry_adoption: ["Technology", "FinTech", "HealthTech", "E-Commerce", "SaaS"],
            career_progression: [
                { level: "Entry", years: "0-2", salary: "₹3L - ₹7L" },
                { level: "Mid", years: "3-5", salary: "₹8L - ₹15L" },
                { level: "Senior", years: "6-10", salary: "₹16L - ₹28L" },
                { level: "Lead/Architect", years: "10-15", salary: "₹28L - ₹50L" },
                { level: "Principal/Director", years: "15+", salary: "₹50L - ₹80L" }
            ],
            future_outlook: {
                forecast: "Critical dominance in enterprise infrastructure for the next decade.",
                ai_disruption: "Augmentation of baseline implementation, creating massive leverage for strategic leads.",
                global_vs_india_trend: "India emerging as global center for complex engineering pods; 2.5x growth forecast."
            }
        });
    }
};

// On-demand Translation Endpoint
exports.translate = async (req, res) => {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) return res.status(400).json({ message: 'Text and targetLanguage are required' });

    try {
        if (!groq) throw new Error("No API Key for translation");

        const langName = { en: 'English', ta: 'Tamil', hi: 'Hindi' }[targetLanguage] || 'English';

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant", // Use a smaller, faster model for translation
            messages: [
                {
                    role: "system",
                    content: `You are a highly accurate translator. Translate the following text into ${langName}. Return ONLY the translated text, no explanations, no quotes.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            max_tokens: 500
        });

        res.json({ translatedText: completion.choices[0].message.content.trim() });
    } catch (err) {
        console.error('Translation Error:', err);
        res.status(500).json({ message: 'Translation failed', error: err.message });
    }
};

exports.generateRoadmap = async (req, res) => {
    const role = req.body.role || req.body.roleTitle;
    const language = req.body.language || 'en';
    const {
        level = 'Beginner',
        duration = '3 Months',
        dailyTime = '2 Hours',
        goal = 'Job Ready'
    } = req.body;

    if (!role) return res.status(400).json({ message: 'Role is required' });

    try {
        if (!groq) throw new Error("No API Key");

        const languageNames = { en: 'English', ta: 'Tamil', hi: 'Hindi' };
        const langName = languageNames[language] || 'English';

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are an expert Career Mentor and Roadmap Architect. 
                    Generate a highly personalized learning roadmap for the role of ${role}.
                    Return all output strictly in ${langName}.`
                },
                {
                    role: "user",
                    content: `Generate a career roadmap based on these constraints:
                    - Role: ${role}
                    - User Level: ${level}
                    - Total Duration: ${duration}
                    - Daily Study Time: ${dailyTime}
                    - Ultimate Goal: ${goal}

                    INSTRUCTIONS:
                    1. Divide the roadmap into logical phases (e.g., 4-6 phases).
                    2. The SUM of all phase durations MUST EQUAL exactly ${duration}. 
                       - Example: If duration is "2 Months", phases could be "2 weeks", "3 weeks", "2 weeks", "1 week".
                    3. Each phase must contain:
                       - Title, duration, and color (hex code).
                       - Actionable skills to learn.
                       - 2-3 specific course suggestions.
                       - 2 mini-projects.
                       - Specific internship/job target focus.
                    
                    4. Adapt content to the User Level:
                       - Beginner: Focus on core fundamentals first.
                       - Advanced: Focus on system design, optimization, and production architecture.
                    
                    5. Respect Daily Time: Give realistic task loads.

                    Return STRICTLY in JSON array format:
                    [{
                        "phase": "Phase X",
                        "title": "Phase Title",
                        "description": "Short description",
                        "duration": "X weeks",
                        "color": "#HEX",
                        "skills": ["Skill1", "Skill2"],
                        "courses": [{"name": "...", "platform": "...", "link": "...", "duration": "...", "outcome": "..."}],
                        "projects": [{"name": "...", "tools": ["..."], "outcome": "...", "portfolio": "High/Medium/Low"}],
                        "tasks": [{"id": 1, "title": "Task 1", "description": "..."}],
                        "internship": {"type": "...", "where": "...", "focus": "..."}
                    }]`
                }
            ],
            response_format: { type: "json_object" }
        });

        const text = completion.choices[0].message.content;
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        res.json(JSON.parse(jsonMatch ? jsonMatch[0] : text));

    } catch (err) {
        console.warn(`AI Roadmap Error (using mock): ${err.message}`);

        // Dynamic Mock Generator based on duration
        const getMockRoadmap = (role, durationStr) => {
            const roleLower = role.toLowerCase();
            const totalWeeks = parseInt(durationStr) * 4 || 4;
            const phases = [];

            // Define skill stacks for authentic mock data
            const stacks = {
                frontend: {
                    skills: ['HTML5 & Semantic UI', 'CSS3 & Flexbox/Grid', 'Modern JavaScript (ES6+)', 'React.js Fundamentals', 'State Management (Redux/Context)', 'API Integration', 'Testing (Jest/RTL)', 'Performance Optimization'],
                    tools: ['VS Code', 'Chrome DevTools', 'Git/GitHub', 'NPM/Yarn', 'Vite/Webpack', 'Postman', 'Vercel/Netlify', 'Lighthouse']
                },
                backend: {
                    skills: ['Node.js & Express', 'Database Design (SQL/NoSQL)', 'RESTful API Architecture', 'Authentication & JWT', 'Server-side Validation', 'Caching (Redis)', 'Message Queues', 'Microservices'],
                    tools: ['PostgreSQL/MongoDB', 'Postman/Insomnia', 'Docker', 'AWS/GCP', 'Redis', 'Nginx', 'PM2', 'Prometheus']
                },
                data: {
                    skills: ['Python for Data Science', 'Data Cleaning & Wrangling', 'Exploratory Data Analysis', 'Statistical Modeling', 'Machine Learning Algorithms', 'Deep Learning Basics', 'Natural Language Processing', 'Data Visualization'],
                    tools: ['Jupyter Notebooks', 'Pandas/NumPy', 'Scikit-learn', 'TensorFlow/PyTorch', 'Matplotlib/Seaborn', 'SQL', 'Tableau/PowerBI', 'Spark']
                },
                fullstack: {
                    skills: ['React & Frontend Core', 'Node.js Backend', 'Database Orchestration', 'Fullstack Security', 'System Architecture', 'Cloud Deployment', 'CI/CD Pipelines', 'Advanced Scalability'],
                    tools: ['MERN/PERN Stack', 'Docker', 'GitLab CI', 'Terraform', 'Kubernetes', 'AWS', 'Sentry', 'New Relic']
                },
                default: {
                    skills: [`${role} Core Principles`, `${role} Workflow Management`, 'Standard Operating Procedures', 'Quality Assurance', 'Strategic Execution', 'Optimization Patterns', 'Advanced Methodology', 'Final Portfolio'],
                    tools: ['Industry Standard IDE', 'Project Management Tools', 'Collaboration Platforms', 'Documentation Systems', 'Version Control', 'Analytics Dashboards', 'Cloud Infrastructure', 'Automation Kits']
                }
            };

            let selectedStack = stacks.default;
            if (roleLower.includes('frontend') || roleLower.includes('front-end') || roleLower.includes('react') || roleLower.includes('ui')) selectedStack = stacks.frontend;
            else if (roleLower.includes('backend') || roleLower.includes('back-end') || roleLower.includes('node') || roleLower.includes('api')) selectedStack = stacks.backend;
            else if (roleLower.includes('data') || roleLower.includes('analyst') || roleLower.includes('ml')) selectedStack = stacks.data;
            else if (roleLower.includes('fullstack') || roleLower.includes('full stack')) selectedStack = stacks.fullstack;

            const titles = ['Foundations', 'Core Concepts', 'Intermediate Skills', 'Advanced Tools', 'Practical Projects', 'Specialization', 'Industry Standards', 'Job Readiness'];
            const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#6366f1'];

            const mockCourses = getMockCourses(role);
            const mockProjects = getDomainProjects(1, role); // Default to domain 1 for mock

            for (let i = 0; i < Math.min(totalWeeks, 8); i++) {
                const phaseSkills = [selectedStack.skills[i] || selectedStack.skills[0]];
                const phaseTools = [selectedStack.tools[i] || selectedStack.tools[0]];

                phases.push({
                    id: i + 1,
                    phase: `Phase ${i + 1}`,
                    title: titles[i] || `Advanced ${role} ${i - 3}`,
                    description: `Mastering ${phaseSkills[0]} and industrial workflows for ${role}.`,
                    duration: '1 week',
                    color: colors[i % colors.length],
                    skills: [...phaseSkills, ...phaseTools],
                    courses: mockCourses.slice(i * 2, (i * 2) + 2).map(c => ({
                        name: c.title,
                        platform: c.platform,
                        link: c.link,
                        duration: c.duration,
                        outcome: 'Certificate of Excellence'
                    })),
                    projects: mockProjects.slice(i, i + 1).map(p => ({
                        name: p.title,
                        tools: p.tech_stack,
                        outcome: 'Industry-standard Portfolio Project',
                        portfolio: 'High'
                    })),
                    tasks: [
                        { id: 1000 + i * 10 + 1, title: `Setup ${phaseTools[0]} environment`, description: `Initialize project structure using ${phaseTools[0]}` },
                        { id: 1000 + i * 10 + 2, title: `Implement ${phaseSkills[0]} concepts`, description: `Practical application of ${phaseSkills[0]} in a mini-module.` }
                    ],
                    internship: i === Math.min(totalWeeks, 8) - 1 ? { type: 'JobSearch', focus: 'Final Portfolio & HR Interview', where: 'LinkedIn / Indeed' } : null
                });
            }

            if (totalWeeks > 8) {
                phases[phases.length - 1].duration = `${totalWeeks - 7} weeks`;
            }

            return phases;
        };
        res.json(getMockRoadmap(role, duration));
    }
};

// Save a roadmap for the user
exports.saveUserRoadmap = async (req, res) => {
    const { roleTitle, roadmapData } = req.body;
    const userId = req.user.id;

    if (!roleTitle || !roadmapData) {
        return res.status(400).json({ message: 'Role title and roadmap data are required' });
    }

    try {
        // Deactivate old roadmaps for this user
        await db.query('UPDATE user_roadmaps SET is_active = FALSE WHERE user_id = ?', [userId]);

        // Insert new one
        await db.query(
            'INSERT INTO user_roadmaps (user_id, role_title, roadmap_data) VALUES (?, ?, ?)',
            [userId, roleTitle, JSON.stringify(roadmapData)]
        );
        res.json({ message: 'Roadmap saved successfully' });
    } catch (err) {
        console.error('Save Roadmap Error:', err);
        res.status(500).json({ message: 'Failed to save roadmap' });
    }
};

// Get all roadmaps for the user
exports.getUserRoadmaps = async (req, res) => {
    const userId = req.user.id;
    try {
        const [roadmaps] = await db.query(
            'SELECT * FROM user_roadmaps WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.json(roadmaps);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch roadmaps' });
    }
};

// Generate Skill Tutorial Content (W3Schools style)
exports.getSkillTutorial = async (req, res) => {
    const { skill, role, language = 'en' } = req.body;
    if (!skill) return res.status(400).json({ message: 'Skill is required' });

    try {
        if (!groq) throw new Error("No API Key");
        
        const langName = { en: 'English', ta: 'Tamil', hi: 'Hindi' }[language] || 'English';

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are an expert technical instructor creating a W3Schools-style interactive tutorial.
                    Output strictly in ${langName}.`
                },
                {
                    role: "user",
                    content: `Create a brief, highly practical interactive tutorial for the skill: "${skill}" in the context of the role: "${role || 'Developer'}".
                    
                    Return STRICTLY a JSON object with:
                    {
                        "title": "Tutorial Title",
                        "theory": "Markdown formatted explanation with headings, bullet points, and brief theory. Do not use code blocks here.",
                        "example_title": "Example Name",
                        "example_code": "The exact code snippet to demonstrate the concept.",
                        "practice_prompt": "A quick challenge for them to modify the code.",
                        "language_mode": "javascript" or "html" or "python" or "sql" etc.
                    }`
                }
            ],
            response_format: { type: "json_object" }
        });

        res.json(JSON.parse(completion.choices[0].message.content));

    } catch (err) {
        console.warn(`Skill Tutorial Error: ${err.message}`);
        // Mock fallback
        res.json({
            title: `${skill} Fundamentals`,
            theory: `### What is ${skill}?\nIt is a core competency required for modern development.\n\n- Essential for building scalable apps.\n- Highly requested by employers.\n\nMastering this will significantly boost your profile.`,
            example_title: `Basic ${skill} Implementation`,
            example_code: `// Example code for ${skill}\nconsole.log("Hello, ${skill}!");\n\nfunction practice() {\n  return true;\n}`,
            practice_prompt: `Try modifying the console.log statement to output your name instead of 'Hello, ${skill}!'.`,
            language_mode: "javascript"
        });
    }
};
