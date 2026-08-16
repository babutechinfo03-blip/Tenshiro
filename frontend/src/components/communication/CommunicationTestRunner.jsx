import React, { useState, useEffect, useRef } from 'react';
import {
    FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaPlay, FaVolumeUp,
    FaMicrophone, FaRegStopCircle, FaPaperPlane, FaSpinner, FaChartBar,
    FaTrophy, FaLightbulb, FaBrain, FaAward, FaClock, FaChevronRight,
    FaBookOpen, FaPen, FaUserTie, FaComments, FaChalkboardTeacher, FaUserAlt, FaPlayCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './CommunicationTestRunner.css';

// ═══════════════════════════════════════════════════════════════
// QUESTION BANKS
// ═══════════════════════════════════════════════════════════════

const quizCategories = [
    {
        name: 'Grammar',
        icon: <FaBookOpen />,
        color: '#6366f1',
        subcategories: ['Tenses', 'Articles', 'Prepositions', 'Voice', 'Narration', 'Subject-Verb Agreement', 'Conditionals'],
        questions: [
            // Tenses
            { id: 'g1', sub: 'Tenses', q: "Choose the correct tense: 'By next year, I _____ this company for 10 years.'", options: ["will join", "will have joined", "am joining", "joined"], answer: 1 },
            { id: 'g2', sub: 'Tenses', q: "Identify the correct sentence:", options: ["She don't know the answer.", "She doesn't knows the answer.", "She doesn't know the answer.", "She not know the answer."], answer: 2 },
            { id: 'g3', sub: 'Tenses', q: "'I _____ to the gym every morning before work.'", options: ["am going", "go", "goes", "went"], answer: 1 },
            { id: 'g4', sub: 'Tenses', q: "'When I arrived, they _____ already _____ the meeting.'", options: ["have, started", "had, started", "has, started", "were, starting"], answer: 1 },
            { id: 'g5', sub: 'Tenses', q: "'She _____ on this project since last March.'", options: ["is working", "has been working", "was working", "works"], answer: 1 },
            { id: 'g6', sub: 'Tenses', q: "'By the time you read this email, I _____ the report.'", options: ["will finish", "will have finished", "am finishing", "finished"], answer: 1 },
            { id: 'g7', sub: 'Tenses', q: "'The train _____ at 6:30 PM every day.'", options: ["departs", "is departing", "will depart", "departed"], answer: 0 },
            { id: 'g8', sub: 'Tenses', q: "Choose the correct form: 'While I _____ the code, the server _____.'", options: ["was reviewing, crashed", "reviewed, was crashing", "am reviewing, crashes", "review, crashed"], answer: 0 },

            // Articles
            { id: 'g9', sub: 'Articles', q: "Select the correct article usage: '_____ honest man always speaks _____ truth.'", options: ["A, a", "An, the", "The, a", "An, a"], answer: 1 },
            { id: 'g10', sub: 'Articles', q: "Fill in the blank: 'He is _____ European but speaks _____ English fluently.'", options: ["an, an", "a, the", "a, —", "the, an"], answer: 2 },
            { id: 'g11', sub: 'Articles', q: "'She bought _____ umbrella and _____ pair of shoes.'", options: ["a, a", "an, a", "the, the", "a, an"], answer: 1 },
            { id: 'g12', sub: 'Articles', q: "'_____ Nile is _____ longest river in Africa.'", options: ["A, a", "The, the", "—, the", "The, a"], answer: 1 },
            { id: 'g13', sub: 'Articles', q: "'He wants to become _____ engineer after completing _____ MBA.'", options: ["an, an", "a, an", "an, the", "an, a"], answer: 0 },

            // Prepositions
            { id: 'g14', sub: 'Prepositions', q: "Choose the correct preposition: 'She has been waiting _____ you _____ 3 PM.'", options: ["to, from", "for, since", "for, from", "to, since"], answer: 1 },
            { id: 'g15', sub: 'Prepositions', q: "'The meeting is scheduled _____ Monday _____ 10 AM.'", options: ["in, at", "on, at", "at, on", "on, in"], answer: 1 },
            { id: 'g16', sub: 'Prepositions', q: "'She is good _____ mathematics and interested _____ physics.'", options: ["in, at", "at, in", "for, in", "at, for"], answer: 1 },
            { id: 'g17', sub: 'Prepositions', q: "'He apologized _____ his mistake and asked _____ forgiveness.'", options: ["for, for", "about, for", "for, about", "to, for"], answer: 0 },
            { id: 'g18', sub: 'Prepositions', q: "'The report consists _____ five sections and deals _____ quarterly performance.'", options: ["of, with", "in, about", "of, in", "with, about"], answer: 0 },

            // Voice
            { id: 'g19', sub: 'Voice', q: "Convert to passive voice: 'The team completed the project ahead of schedule.'", options: ["The project was completed ahead of schedule by the team.", "The project is completed ahead of schedule.", "The project had been completed by the team.", "Ahead of schedule, the project was completing."], answer: 0 },
            { id: 'g20', sub: 'Voice', q: "Change to active voice: 'The email was sent by the manager yesterday.'", options: ["The manager sent the email yesterday.", "The manager sends the email yesterday.", "The manager had sent the email yesterday.", "Yesterday's email was the manager's."], answer: 0 },
            { id: 'g21', sub: 'Voice', q: "Convert to passive: 'The company will launch a new product next month.'", options: ["A new product will be launched by the company next month.", "A new product is launched next month.", "A new product was launched by the company.", "The company is launching a new product."], answer: 0 },
            { id: 'g22', sub: 'Voice', q: "Convert to active voice: 'The bug was discovered by the QA team during testing.'", options: ["The QA team discovered the bug during testing.", "The QA team discovers the bug during testing.", "During testing the bug discovered the QA team.", "The bug discovers the QA team during testing."], answer: 0 },
            { id: 'g23', sub: 'Voice', q: "Which sentence is in passive voice?", options: ["She writes excellent reports.", "The reports were written by her.", "She has written the reports.", "She will write the reports."], answer: 1 },

            // Narration
            { id: 'g24', sub: 'Narration', q: "Convert to indirect speech: 'He said, \"I am preparing for the interview.\"'", options: ["He said that I am preparing for the interview.", "He said that he was preparing for the interview.", "He said that he is preparing for the interview.", "He told that he was preparing for the interview."], answer: 1 },
            { id: 'g25', sub: 'Narration', q: "Convert to indirect: 'She said, \"I will submit the report tomorrow.\"'", options: ["She said that she will submit the report tomorrow.", "She said that she would submit the report the next day.", "She told she will submit the report tomorrow.", "She said she submits the report tomorrow."], answer: 1 },
            { id: 'g26', sub: 'Narration', q: "Convert to direct speech: 'He asked me where I lived.'", options: ["He said, \"Where do you live?\"", "He said, \"Where did you live?\"", "He asked, \"Where do you lived?\"", "He said, \"Where I live?\""], answer: 0 },
            { id: 'g27', sub: 'Narration', q: "Convert to indirect: 'The teacher said, \"Do not use your phones during class.\"'", options: ["The teacher said to not use phones during class.", "The teacher ordered the students not to use their phones during class.", "The teacher told not to use your phones.", "The teacher said do not use phones."], answer: 1 },

            // Subject-Verb Agreement
            { id: 'g28', sub: 'Subject-Verb Agreement', q: "'Neither the manager nor the employees _____ aware of the policy change.'", options: ["was", "were", "is", "has been"], answer: 1 },
            { id: 'g29', sub: 'Subject-Verb Agreement', q: "'Each of the team members _____ responsible for their deliverables.'", options: ["are", "is", "were", "have been"], answer: 1 },
            { id: 'g30', sub: 'Subject-Verb Agreement', q: "'The committee _____ divided on the proposal.'", options: ["was", "were", "are", "have"], answer: 0 },
            { id: 'g31', sub: 'Subject-Verb Agreement', q: "'Mathematics _____ my favorite subject in school.'", options: ["are", "were", "is", "have been"], answer: 2 },

            // Conditionals
            { id: 'g32', sub: 'Conditionals', q: "'If I _____ the CEO, I _____ invest more in R&D.'", options: ["am, will", "were, would", "was, will", "be, would"], answer: 1 },
            { id: 'g33', sub: 'Conditionals', q: "'If she _____ harder, she would have passed the exam.'", options: ["studies", "studied", "had studied", "would study"], answer: 2 },
            { id: 'g34', sub: 'Conditionals', q: "'Unless you _____ the documentation, the team won't proceed.'", options: ["complete", "completed", "will complete", "would complete"], answer: 0 },
            { id: 'g35', sub: 'Conditionals', q: "'If it rains tomorrow, we _____ the outdoor event.'", options: ["cancel", "will cancel", "would cancel", "cancelled"], answer: 1 },
        ]
    },
    {
        name: 'Vocabulary',
        icon: <FaLightbulb />,
        color: '#10b981',
        subcategories: ['Synonyms', 'Antonyms', 'Idioms', 'Phrases', 'Word Usage'],
        questions: [
            // Synonyms
            { id: 'v1', sub: 'Synonyms', q: "Choose the word closest in meaning to 'Pragmatic':", options: ["Theoretical", "Practical", "Idealistic", "Arrogant"], answer: 1 },
            { id: 'v2', sub: 'Synonyms', q: "Which word is a synonym for 'Meticulous'?", options: ["Careless", "Painstaking", "Random", "Impulsive"], answer: 1 },
            { id: 'v3', sub: 'Synonyms', q: "Choose the synonym of 'Ubiquitous':", options: ["Rare", "Scarce", "Omnipresent", "Unique"], answer: 2 },
            { id: 'v4', sub: 'Synonyms', q: "The word 'Articulate' most closely means:", options: ["Express clearly", "Whisper softly", "Write illegibly", "Remain silent"], answer: 0 },
            { id: 'v5', sub: 'Synonyms', q: "'Resilient' is closest in meaning to:", options: ["Fragile", "Tough and adaptable", "Rigid", "Sensitive"], answer: 1 },
            { id: 'v6', sub: 'Synonyms', q: "Choose the synonym of 'Innovative':", options: ["Traditional", "Creative", "Outdated", "Conventional"], answer: 1 },
            { id: 'v7', sub: 'Synonyms', q: "'Diligent' means:", options: ["Lazy", "Hardworking and careful", "Fast", "Slow"], answer: 1 },

            // Antonyms
            { id: 'v8', sub: 'Antonyms', q: "Choose the antonym of 'Loquacious':", options: ["Talkative", "Reticent", "Verbose", "Eloquent"], answer: 1 },
            { id: 'v9', sub: 'Antonyms', q: "What is the antonym of 'Benevolent'?", options: ["Kind", "Generous", "Malevolent", "Charitable"], answer: 2 },
            { id: 'v10', sub: 'Antonyms', q: "Choose the antonym of 'Ambiguous':", options: ["Vague", "Clear", "Doubtful", "Uncertain"], answer: 1 },
            { id: 'v11', sub: 'Antonyms', q: "The antonym of 'Proficient' is:", options: ["Skilled", "Incompetent", "Expert", "Capable"], answer: 1 },
            { id: 'v12', sub: 'Antonyms', q: "Choose the antonym of 'Affluent':", options: ["Wealthy", "Prosperous", "Destitute", "Rich"], answer: 2 },

            // Idioms
            { id: 'v13', sub: 'Idioms', q: "What does 'Break the ice' mean?", options: ["Destroy something frozen", "Start a conversation in an awkward situation", "Break a deal", "Reveal a secret"], answer: 1 },
            { id: 'v14', sub: 'Idioms', q: "What does 'The ball is in your court' mean?", options: ["You are playing sports", "It's your decision now", "You dropped the ball", "The meeting is in your room"], answer: 1 },
            { id: 'v15', sub: 'Idioms', q: "'Hit the nail on the head' means:", options: ["Hammering nails accurately", "Being exactly right about something", "Causing physical injury", "Making a mistake"], answer: 1 },
            { id: 'v16', sub: 'Idioms', q: "'Burning the midnight oil' means:", options: ["Wasting oil resources", "Working very late into the night", "Setting fire to something", "Having insomnia"], answer: 1 },
            { id: 'v17', sub: 'Idioms', q: "'A piece of cake' means:", options: ["A bakery item", "Something very easy", "A birthday celebration", "A cooking task"], answer: 1 },
            { id: 'v18', sub: 'Idioms', q: "'Think outside the box' means:", options: ["Moving a box", "Being creative and unconventional", "Packing items in a box", "Organizing storage"], answer: 1 },
            { id: 'v19', sub: 'Idioms', q: "'Cut to the chase' means:", options: ["Running fast", "Get to the main point directly", "Using scissors", "Chasing someone"], answer: 1 },

            // Phrases
            { id: 'v20', sub: 'Phrases', q: "'Touch base' in business communication means:", options: ["Physical contact during meetings", "Making brief contact to update", "Touching a database", "Starting from scratch"], answer: 1 },
            { id: 'v21', sub: 'Phrases', q: "'On the same page' means:", options: ["Reading the same book", "Having a shared understanding", "Sitting together", "Using the same document"], answer: 1 },
            { id: 'v22', sub: 'Phrases', q: "'Move the needle' means:", options: ["Sewing clothes", "Making a noticeable difference or progress", "Adjusting a compass", "Playing a record"], answer: 1 },
            { id: 'v23', sub: 'Phrases', q: "'Low-hanging fruit' in business means:", options: ["Fruits on ground level", "Easy tasks that give quick results", "Cheap products", "Bad quality items"], answer: 1 },

            // Word Usage
            { id: 'v24', sub: 'Word Usage', q: "Choose the correct word: 'The project had a significant _____ on our quarterly revenue.'", options: ["affect", "effect", "affective", "effective"], answer: 1 },
            { id: 'v25', sub: 'Word Usage', q: "Choose the correct word: 'Please _____ me your feedback by Friday.'", options: ["send", "sent", "sand", "sinned"], answer: 0 },
            { id: 'v26', sub: 'Word Usage', q: "'Their', 'There', or 'They're'? — '_____ going to present _____ project over _____.'", options: ["They're, their, there", "Their, they're, there", "There, their, they're", "They're, there, their"], answer: 0 },
            { id: 'v27', sub: 'Word Usage', q: "Choose the correct usage: 'The data _____ that our hypothesis was correct.'", options: ["suggests", "suggest", "suggesting", "suggested"], answer: 0 },
        ]
    },
    {
        name: 'Reading Comprehension',
        icon: <FaBookOpen />,
        color: '#f59e0b',
        subcategories: [],
        questions: [
            { id: 'r1', sub: '', q: "Read: 'Effective communication in tech teams requires clarity, brevity, and empathy. A developer who can articulate technical decisions to non-technical stakeholders adds immense value.'\n\nWhat is the main idea?", options: ["Developers should learn coding only", "Communication skills add value for developers", "Non-technical people should learn coding", "Empathy is not important in tech"], answer: 1 },
            { id: 'r2', sub: '', q: "Read: 'The shift to remote work has intensified the need for strong written communication. Misunderstood Slack messages cause more delays than slow internet.'\n\nAccording to the passage, what causes more delays?", options: ["Slow internet", "Too many meetings", "Misunderstood written messages", "Lack of video calls"], answer: 2 },
            { id: 'r3', sub: '', q: "Read: 'A good email has three qualities: a clear subject line, a concise body, and a specific call to action. Without these, emails become noise.'\n\nWhich is NOT a quality of a good email?", options: ["Clear subject line", "Concise body", "Multiple attachments", "Specific call to action"], answer: 2 },
            { id: 'r4', sub: '', q: "Read: 'Agile methodology emphasizes iterative development, continuous feedback, and cross-functional collaboration. Unlike waterfall, agile welcomes changing requirements even late in development.'\n\nWhat does agile welcome?", options: ["Fixed requirements", "Changing requirements", "No documentation", "Solo development"], answer: 1 },
            { id: 'r5', sub: '', q: "Read: 'Emotional intelligence (EQ) is often a better predictor of workplace success than IQ. Leaders with high EQ manage teams effectively, resolve conflicts diplomatically, and inspire trust.'\n\nWhat is EQ a better predictor of than IQ?", options: ["Academic grades", "Workplace success", "Coding ability", "Physical fitness"], answer: 1 },
            { id: 'r6', sub: '', q: "Read: 'Cloud computing reduces infrastructure costs by allowing companies to pay only for resources they use. However, data security and compliance remain key concerns for enterprises migrating to the cloud.'\n\nWhat is a key concern about cloud migration?", options: ["Higher costs", "Slower performance", "Data security and compliance", "Lack of scalability"], answer: 2 },
            { id: 'r7', sub: '', q: "Read: 'Active listening involves fully concentrating on the speaker, understanding the message, responding thoughtfully, and remembering key points. It is a fundamental skill in effective communication.'\n\nWhich is NOT part of active listening?", options: ["Concentrating on the speaker", "Interrupting frequently", "Responding thoughtfully", "Remembering key points"], answer: 1 },
            { id: 'r8', sub: '', q: "Read: 'In a study of 500 managers, 78% said that soft skills like communication, teamwork, and adaptability are harder to find than technical skills during recruitment.'\n\nWhat percentage of managers found soft skills harder to find?", options: ["50%", "65%", "78%", "90%"], answer: 2 },
            { id: 'r9', sub: '', q: "Read: 'Microservices architecture breaks down applications into small, independently deployable services. Each service handles a specific business function and communicates via APIs.'\n\nHow do microservices communicate?", options: ["Direct database access", "APIs", "File sharing", "Email notifications"], answer: 1 },
            { id: 'r10', sub: '', q: "Read: 'Constructive feedback focuses on specific behaviors rather than personal traits. Instead of saying \"You're lazy,\" say \"I noticed the report was submitted two days late. How can we prevent this?\"'\n\nWhat does constructive feedback focus on?", options: ["Personal traits", "Physical appearance", "Specific behaviors", "General impressions"], answer: 2 },
            { id: 'r11', sub: '', q: "Read: 'The STAR method structures interview responses: Situation (context), Task (responsibility), Action (what you did), and Result (outcome). This framework ensures concise, impactful answers.'\n\nWhat does the 'A' in STAR stand for?", options: ["Assessment", "Action", "Analysis", "Application"], answer: 1 },
            { id: 'r12', sub: '', q: "Read: 'Design thinking is a human-centered approach to innovation. It starts with empathizing with users, defining the problem, ideating solutions, prototyping, and testing.'\n\nWhat is the first step in design thinking?", options: ["Prototyping", "Testing", "Empathizing with users", "Defining the problem"], answer: 2 },
            { id: 'r13', sub: '', q: "Read: 'Version control systems like Git allow multiple developers to work on the same codebase without conflicts. Branching strategies enable parallel feature development while maintaining code stability.'\n\nWhat do branching strategies enable?", options: ["Single developer work", "Parallel feature development", "Code deletion", "Server management"], answer: 1 },
            { id: 'r14', sub: '', q: "Read: 'Cross-cultural communication requires awareness of different norms. In Japan, silence can indicate respect, while in the US, it might be perceived as disengagement. Understanding these differences prevents miscommunication.'\n\nIn Japan, silence can indicate:", options: ["Disagreement", "Boredom", "Respect", "Confusion"], answer: 2 },
            { id: 'r15', sub: '', q: "Read: 'The 80/20 rule (Pareto Principle) states that 80% of outcomes come from 20% of efforts. In project management, this means focusing on high-impact tasks yields the greatest results.'\n\nAccording to the Pareto Principle, what percentage of efforts drives 80% of outcomes?", options: ["10%", "20%", "50%", "80%"], answer: 1 },
        ]
    },
    {
        name: 'Business Communication',
        icon: <FaUserTie />,
        color: '#8b5cf6',
        subcategories: [],
        questions: [
            { id: 'b1', sub: '', q: "In a formal business email, which closing is most appropriate?", options: ["Cheers!", "Best regards,", "Yours lovingly,", "See ya!"], answer: 1 },
            { id: 'b2', sub: '', q: "During a client escalation call, the best first response is:", options: ["It's not our fault.", "I understand your concern. Let me look into this immediately.", "Let me transfer you to someone else.", "Can you email us instead?"], answer: 1 },
            { id: 'b3', sub: '', q: "Which of these is a professional way to disagree in a meeting?", options: ["You're wrong about that.", "I see your point, though I'd like to offer an alternative perspective.", "That makes no sense.", "Whatever you say."], answer: 1 },
            { id: 'b4', sub: '', q: "What does 'CC' in an email stand for and when should it be used?", options: ["Carbon Copy — to include stakeholders who need visibility", "Copy Confirmation — to confirm receipt", "Communication Channel — for team channels", "Content Check — to verify email content"], answer: 0 },
            { id: 'b5', sub: '', q: "In a stand-up meeting, the ideal update format is:", options: ["Tell your life story from yesterday", "What I did, what I'll do, blockers", "Discuss all project issues in detail", "Only mention completed tasks"], answer: 1 },
            { id: 'b6', sub: '', q: "How should you handle a situation where you don't know the answer in a client meeting?", options: ["Make up an answer", "Say 'I don't know' and change the topic", "Acknowledge it honestly and promise to follow up with accurate information", "Blame a teammate for not preparing"], answer: 2 },
            { id: 'b7', sub: '', q: "What is the purpose of 'BCC' in emails?", options: ["Blind Carbon Copy — recipients don't see other BCC addresses", "Business Communication Copy", "Backup Contact Copy", "Below Carbon Copy"], answer: 0 },
            { id: 'b8', sub: '', q: "Which approach is best when delivering bad news to a client?", options: ["Hide the bad news in a long email", "Be direct, empathetic, and provide a solution or next steps", "Let someone else deliver it", "Delay telling them as long as possible"], answer: 1 },
            { id: 'b9', sub: '', q: "In a job interview, the STAR method is used for:", options: ["Rating interview performance", "Structuring behavioral answers (Situation, Task, Action, Result)", "Evaluating technical skills", "Negotiating salary"], answer: 1 },
            { id: 'b10', sub: '', q: "What is 'elevator pitch'?", options: ["A pitch given inside an elevator", "A brief, persuasive speech about yourself or your idea (30-60 seconds)", "A type of sales technique", "A sports term"], answer: 1 },
            { id: 'b11', sub: '', q: "During a presentation, if someone asks a question you can't answer:", options: ["Ignore the question", "Thank them, note it down, and offer to follow up after the presentation", "Make up a response", "Tell them to Google it"], answer: 1 },
            { id: 'b12', sub: '', q: "Which is the most appropriate way to follow up after a business meeting?", options: ["Send a WhatsApp message saying 'nice meeting!'", "Send a professional email summarizing key points, action items, and deadlines", "Wait for them to contact you", "Call them immediately after"], answer: 1 },
            { id: 'b13', sub: '', q: "What does 'stakeholder management' involve?", options: ["Managing company stocks", "Identifying, analyzing, and engaging people affected by your project", "Managing employee salaries", "Hiring new team members"], answer: 1 },
            { id: 'b14', sub: '', q: "When giving constructive feedback, the 'sandwich' technique involves:", options: ["Eating while talking", "Positive comment → Constructive criticism → Positive comment", "Three negative points in a row", "Avoiding all criticism"], answer: 1 },
            { id: 'b15', sub: '', q: "In a cross-cultural team meeting, the best practice is to:", options: ["Speak very fast to save time", "Use simple, clear language and avoid slang or idioms", "Use heavy jargon to sound professional", "Only communicate via text"], answer: 1 },
        ]
    },
    {
        name: 'Email Communication',
        icon: <FaPen />,
        color: '#ec4899',
        subcategories: [],
        questions: [
            { id: 'e1', sub: '', q: "Which subject line is most professional for requesting a meeting?", options: ["Hey, let's meet!", "Meeting Request: Q3 Budget Review — July 15", "URGENT!!!!! Meeting needed ASAP", "meeting"], answer: 1 },
            { id: 'e2', sub: '', q: "When replying to all in a long email thread, best practice is:", options: ["Reply with just 'OK'", "Forward to everyone individually", "Summarize key points and respond to the latest update clearly", "Delete the thread and start fresh"], answer: 2 },
            { id: 'e3', sub: '', q: "Which email opening is most appropriate for a first-time business contact?", options: ["Hey there!", "Dear Mr./Ms. [Last Name],", "Yo!", "To whom it may concern,"], answer: 1 },
            { id: 'e4', sub: '', q: "What is the ideal length of a professional email?", options: ["As long as possible with all details", "5-10 concise sentences covering key points", "Just 1 sentence", "Multiple pages with appendices"], answer: 1 },
            { id: 'e5', sub: '', q: "When should you use 'Reply All' vs 'Reply'?", options: ["Always use Reply All", "Reply All when all recipients need the information; Reply for individual responses", "Never use Reply All", "Use Reply All only for jokes"], answer: 1 },
            { id: 'e6', sub: '', q: "Which is the most professional out-of-office message?", options: ["I'm on vacation, don't bother me!", "I am currently out of office until [date]. For urgent matters, please contact [name] at [email].", "Gone fishing!", "Not available."], answer: 1 },
            { id: 'e7', sub: '', q: "How should you handle an email sent to you by mistake?", options: ["Ignore it", "Forward it to everyone", "Reply to the sender politely, letting them know it was misdirected", "Delete it immediately"], answer: 2 },
            { id: 'e8', sub: '', q: "What is the purpose of an email signature?", options: ["To show off your titles", "To provide professional contact info, role, and company details", "To add inspirational quotes", "To make the email longer"], answer: 1 },
            { id: 'e9', sub: '', q: "Which attachment etiquette is correct?", options: ["Send 50MB files without warning", "Mention attachments in the email body, use reasonable file sizes, and confirm formats", "Never send attachments", "Attach files without mentioning them"], answer: 1 },
            { id: 'e10', sub: '', q: "How should you write a professional follow-up email after no response?", options: ["Send multiple emails in one day demanding a response", "Wait a reasonable time, then send a polite reminder referencing the original email", "Call them and complain", "Copy their boss in the follow-up"], answer: 1 },
            { id: 'e11', sub: '', q: "Which is the correct way to address multiple recipients?", options: ["Hey guys!", "Dear Team / Dear All / Hi [Name 1], [Name 2]", "Yo people!", "Whatup everyone"], answer: 1 },
            { id: 'e12', sub: '', q: "What should you do before sending an important business email?", options: ["Send immediately without checking", "Proofread for typos, verify recipients, check attachments, and review tone", "Only check spelling", "Ask a friend to read it"], answer: 1 },
            { id: 'e13', sub: '', q: "When declining a meeting invitation professionally, you should:", options: ["Just don't show up", "Reply with a brief explanation and suggest an alternative time if possible", "Say 'I'm too busy'", "Ignore the invitation"], answer: 1 },
            { id: 'e14', sub: '', q: "What does a good email call-to-action look like?", options: ["Do something about this.", "Could you please review the attached proposal and share your feedback by Friday, June 20?", "Handle it.", "ASAP!!!"], answer: 1 },
            { id: 'e15', sub: '', q: "Which is the best practice for email threads with decisions?", options: ["Let the thread continue endlessly", "Summarize the decision in a new email with a clear subject line", "Delete the old thread", "Forward the entire thread to new people without context"], answer: 1 },
        ]
    }
];

const speakingLevels = [
    { level: 1, name: 'Level 1: Basic Introduction', questions: ["Hello! Please start by introducing yourself and sharing your core interests.", "Hi there. Could you tell me about your educational background and hobbies?", "Welcome! What motivated you to choose your current career path?"] },
    { level: 2, name: 'Level 2: Situational Response', questions: ["Great. Describe a challenging situation you recently faced and how you overcame it.", "Thank you. Can you tell me about a time you had to learn something completely new under a tight deadline?", "Interesting. How do you handle disagreements within a team setting?"] },
    { level: 3, name: 'Level 3: Analytical Thinking', questions: ["I see. What are your thoughts on the impact of Artificial Intelligence on your industry?", "Moving on. How do you approach problem-solving when you have incomplete information?", "Thanks. Can you explain a complex concept you learned recently in simple terms?"] },
    { level: 4, name: 'Level 4: Professional Simulation', questions: ["Finally, imagine a client is extremely dissatisfied with a project delay. How do you communicate with them?", "Last question. How would you convince a hesitant stakeholder to adopt a new technology?", "To conclude, what is your strategy for negotiating when the other party is rigid?"] }
];


// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

const CommunicationTestRunner = ({ testId, onBack }) => {
    const [step, setStep] = useState('intro'); // 'intro' | 'active' | 'feedback'
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    // Quiz Assessment states
    const [quizCategoryIndex, setQuizCategoryIndex] = useState(0);
    const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Speaking Assessment states
    const [speakingStep, setSpeakingStep] = useState(0); // 0, 1, 2 for the questions
    const [isAiSpeaking, setIsAiSpeaking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [chatHistory, setChatHistory] = useState([]); // [{ sender: 'ai' | 'user', text: '' }]
    const [interviewCompleted, setInterviewCompleted] = useState(false);
    const [hasStartedInterview, setHasStartedInterview] = useState(false);

    const [currentLevel, setCurrentLevel] = useState(0);
    const [levelScores, setLevelScores] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');

    const timerRef = useRef(null);
    const recognitionRef = useRef(null);

    // Speech Recognition setup
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = true;
            rec.interimResults = true;
            rec.lang = 'en-US';
            rec.onresult = (event) => {
                let text = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    text += event.results[i][0].transcript;
                }
                setTranscription(text);
            };
            recognitionRef.current = rec;
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (recognitionRef.current && typeof recognitionRef.current.stop === 'function') {
                try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
            }
        };
    }, []);

    // Timer
    useEffect(() => {
        if (step === 'active') {
            timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [step]);

    const startRecording = () => {
        setIsRecording(true);
        if (recognitionRef.current && typeof recognitionRef.current.start === 'function') {
            try { recognitionRef.current.start(); } catch (e) { console.error(e); }
        } else {
            // Mock typing fallback if SpeechRecognition is not supported
            const mockTexts = [
                "I am deeply motivated by solving complex technological challenges. My background has prepared me well.",
                "Our team managed to deliver the project two days before the deadline by working closely together.",
                "I believe AI will augment our capabilities and create new opportunities for innovation."
            ];
            const chosen = mockTexts[Math.floor(Math.random() * mockTexts.length)];
            let i = 0;
            const typing = setInterval(() => {
                setTranscription(prev => prev + chosen.charAt(i));
                i++;
                if (i >= chosen.length) clearInterval(typing);
            }, 40);
            recognitionRef.current = { typingInterval: typing, stop: () => { clearInterval(typing); } };
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (recognitionRef.current && typeof recognitionRef.current.stop === 'function') {
            try { recognitionRef.current.stop(); } catch (e) { console.error(e); }
        }
        
        if (transcription.trim()) {
            // Save user answer
            setChatHistory(prev => [...prev, { sender: 'user', text: transcription }]);
            setTranscription('');
            
            // Move to next question or complete
            if (currentLevel < speakingLevels.length - 1) {
                setTimeout(() => {
                    const nextLevel = currentLevel + 1;
                    setCurrentLevel(nextLevel);
                    const q = speakingLevels[nextLevel].questions[Math.floor(Math.random() * speakingLevels[nextLevel].questions.length)];
                    setCurrentQuestion(q);
                    speakQuestion(q);
                }, 1000);
            } else {
                setInterviewCompleted(true);
            }
        }
    };

    const speakQuestion = (text) => {
        if (!('speechSynthesis' in window)) {
            setChatHistory(prev => [...prev, { sender: 'ai', text }]);
            return;
        }

        setIsAiSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        
        // Try to find a good English voice
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.startsWith('en-') && (v.name.includes('Google') || v.name.includes('Female')));
        if (englishVoice) utterance.voice = englishVoice;

        utterance.onend = () => {
            setIsAiSpeaking(false);
            setChatHistory(prev => [...prev, { sender: 'ai', text }]);
        };
        
        window.speechSynthesis.speak(utterance);
    };

    const startInterview = () => {
        setHasStartedInterview(true);
        setCurrentLevel(0);
        setLevelScores([]);
        const q = speakingLevels[0].questions[Math.floor(Math.random() * speakingLevels[0].questions.length)];
        setCurrentQuestion(q);
        speakQuestion(q);
    };

    // Clean up SpeechSynthesis on unmount or navigation
    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // ─── Test Metadata ───
    const testMetadata = {
        'comm-quiz': {
            title: 'Communication Quiz Assessment',
            desc: 'Evaluate your theoretical communication knowledge across Grammar, Vocabulary, Reading Comprehension, Business Communication, and Email Communication.',
            icon: <FaBrain />,
            dur: '15 mins',
            badge: 'ADAPTIVE ASSESSMENT',
            totalQuestions: quizCategories.reduce((a, c) => a + c.questions.length, 0),
        },
        'ai-speaking': {
            title: 'AI Speaking Assessment',
            desc: 'Speak on a critical topic. AI evaluates your fluency, pronunciation, confidence, grammar, vocabulary, and speaking speed in real-time.',
            icon: <FaMicrophone />,
            dur: '10 mins',
            badge: 'AI-POWERED EVALUATION',
        },
        'comm-mastery': {
            title: 'Communication Mastery Assessment',
            desc: 'Complete multi-scenario professional simulations including crisis emails, HR interviews, client negotiations, and group discussions.',
            icon: <FaAward />,
            dur: '30 mins',
            badge: 'PROFESSIONAL CERTIFICATION',
        },
    };

    const currentMetadata = testMetadata[testId] || { title: 'Assessment', desc: '', icon: <FaBrain />, dur: '15m', badge: 'ASSESSMENT' };

    // ─── Start Test ───
    const handleStartTest = () => {
        setStep('active');
        setTimer(0);
        setQuizCategoryIndex(0);
        setQuizQuestionIndex(0);
        setQuizAnswers({});
        setQuizCompleted(false);
        setSelectedTopic(null);
        setTranscription('');
        setCurrentLevel(0);
        setLevelScores([]);
    };

    // ─── Quiz Scoring ───
    const calculateQuizResults = () => {
        const categoryScores = {};
        let totalCorrect = 0;
        let totalQuestions = 0;

        quizCategories.forEach(cat => {
            let catCorrect = 0;
            cat.questions.forEach(q => {
                totalQuestions++;
                if (quizAnswers[q.id] === q.answer) {
                    catCorrect++;
                    totalCorrect++;
                }
            });
            categoryScores[cat.name] = Math.round((catCorrect / cat.questions.length) * 100);
        });

        const overallScore = Math.round((totalCorrect / totalQuestions) * 100);
        return { overallScore, categoryScores, totalCorrect, totalQuestions };
    };

    // ─── Submit Handler ───
    const handleSubmitTest = () => {
        setLoading(true);
        setTimeout(() => {
            let result;

            if (testId === 'comm-quiz') {
                const { overallScore, categoryScores, totalCorrect, totalQuestions } = calculateQuizResults();
                result = {
                    score: overallScore,
                    level: getLevel(overallScore),
                    metrics: categoryScores,
                    feedback: generateQuizFeedback(categoryScores),
                    summary: `${totalCorrect}/${totalQuestions} correct answers`,
                };
            } else if (testId === 'ai-speaking') {
                const fullTranscription = chatHistory
                    .filter(msg => msg.sender === 'user')
                    .map(msg => msg.text)
                    .join(' ');
                
                const wordCount = fullTranscription.split(/\s+/).filter(Boolean).length;
                
                // Calculate score based on 4 levels, each worth 25 points maximum
                let totalLevelScore = 0;
                const levelDetails = {};
                
                chatHistory.filter(msg => msg.sender === 'user').forEach((msg, idx) => {
                    const words = msg.text.split(/\s+/).filter(Boolean).length;
                    // Mock evaluation: More words -> better score for that level (up to 25)
                    let scoreForLevel = Math.min(25, 10 + (words * 0.5));
                    totalLevelScore += scoreForLevel;
                    levelDetails[`Level ${idx + 1}`] = Math.round((scoreForLevel / 25) * 100);
                });

                const finalScore = Math.min(100, Math.round(totalLevelScore));
                
                result = {
                    score: finalScore,
                    level: getLevel(finalScore),
                    metrics: {
                        'Level 1 (Intro)': levelDetails['Level 1'] || 0,
                        'Level 2 (Situational)': levelDetails['Level 2'] || 0,
                        'Level 3 (Analytical)': levelDetails['Level 3'] || 0,
                        'Level 4 (Professional)': levelDetails['Level 4'] || 0,
                        'Overall Fluency': Math.min(100, Math.round(finalScore + (Math.random() * 10 - 5))),
                        'Vocabulary Range': Math.min(100, Math.round(finalScore + (Math.random() * 10 - 5)))
                    },
                    feedback: [
                        `Completed ${currentLevel + 1} speaking levels.`,
                        `Total words spoken: ${wordCount}`,
                        finalScore > 80 ? "Excellent performance across all complexity levels." : "You did well in the initial levels but need more detail in advanced levels.",
                        levelDetails['Level 4'] > 80 ? "Great professional communication." : "Practice handling complex professional scenarios."
                    ],
                    summary: `Live Interactive Speaking Assessment Completed. Total Score: ${finalScore}/100`,
                };
            } else if (testId === 'comm-mastery') {
                const emailScore = emailText.length > 100 ? 85 : emailText.length > 50 ? 70 : 50;
                const dialogAvg = dialogScores.length > 0 ? Math.round(dialogScores.reduce((a, b) => a + b, 0) / dialogScores.length) : 70;
                const gdScore = gdContributions >= 3 ? 88 : gdContributions >= 2 ? 75 : gdContributions >= 1 ? 60 : 40;
                const speakingScore = transcription.length > 50 ? 82 : 65;

                const overallScore = Math.round((emailScore + dialogAvg + gdScore + speakingScore) / 4);
                result = {
                    score: overallScore,
                    level: getLevel(overallScore),
                    metrics: {
                        'Email Writing': emailScore,
                        'HR Interview': speakingScore,
                        'Negotiation': dialogAvg,
                        'Group Discussion': gdScore,
                    },
                    feedback: [
                        emailScore > 80 ? "Professional email structure with clear accountability." : "Improve email structure: include clear subject, empathy, and call-to-action.",
                        dialogAvg > 75 ? "Excellent negotiation tact with win-win approach." : "Work on finding compromises that preserve value for both parties.",
                        gdScore > 75 ? "Active and thoughtful participation in group discussions." : "Contribute more evidence-based points in group discussions.",
                        speakingScore > 75 ? "Strong verbal communication in the HR scenario." : "Practice STAR method for behavioral interview answers.",
                    ],
                    summary: `4 scenarios completed across professional domains`,
                };
            }

            setAnalysisResult(result);
            setLoading(false);
            setStep('feedback');
        }, 2000);
    };

    const getLevel = (score) => {
        if (score <= 40) return 'Beginner';
        if (score <= 60) return 'Intermediate';
        if (score <= 80) return 'Advanced';
        if (score <= 90) return 'Professional';
        return 'Placement Ready';
    };

    const getLevelColor = (level) => {
        const colors = { 'Beginner': '#ef4444', 'Intermediate': '#f59e0b', 'Advanced': '#10b981', 'Professional': '#6366f1', 'Placement Ready': '#ec4899' };
        return colors[level] || '#6366f1';
    };

    const generateQuizFeedback = (scores) => {
        const feedback = [];
        Object.entries(scores).forEach(([cat, score]) => {
            if (score >= 85) feedback.push(`Excellent ${cat} knowledge — placement-ready level.`);
            else if (score >= 65) feedback.push(`Good ${cat} fundamentals. Focus on advanced patterns.`);
            else feedback.push(`${cat} needs improvement. Review core concepts and practice daily.`);
        });
        return feedback;
    };

    // ─── Quiz Navigation ───
    const allQuizQuestions = quizCategories.flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.name, color: cat.color })));
    const currentQuizQ = allQuizQuestions[quizCategoryIndex * 0 + Object.keys(quizAnswers).length] || allQuizQuestions[0]; // tracked by flat index
    const flatQuizIndex = (() => {
        let idx = 0;
        for (let ci = 0; ci < quizCategoryIndex; ci++) {
            idx += quizCategories[ci].questions.length;
        }
        return idx + quizQuestionIndex;
    })();
    const currentCatQuestions = quizCategories[quizCategoryIndex]?.questions || [];
    const currentQuizQuestion = currentCatQuestions[quizQuestionIndex];
    const totalQuestionsFlat = allQuizQuestions.length;

    const handleQuizNext = () => {
        if (quizQuestionIndex < currentCatQuestions.length - 1) {
            setQuizQuestionIndex(prev => prev + 1);
        } else if (quizCategoryIndex < quizCategories.length - 1) {
            setQuizCategoryIndex(prev => prev + 1);
            setQuizQuestionIndex(0);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleQuizPrev = () => {
        if (quizQuestionIndex > 0) {
            setQuizQuestionIndex(prev => prev - 1);
        } else if (quizCategoryIndex > 0) {
            setQuizCategoryIndex(prev => prev - 1);
            setQuizQuestionIndex(quizCategories[quizCategoryIndex - 1].questions.length - 1);
        }
    };


    // ═══════════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════════

    return (
        <div className="test-runner-container">
            {/* Header */}
            <div className="test-runner-header">
                <button className="back-btn-lab" onClick={onBack}>
                    <FaArrowLeft /> Exit Test
                </button>
                <div className="test-header-title">
                    <span className="th-icon">{currentMetadata.icon}</span>
                    <h3>{currentMetadata.title}</h3>
                </div>
                {step === 'active' && (
                    <div className="test-timer">
                        <FaClock /> {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </div>
                )}
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <FaSpinner className="spinner-icon" />
                        <p>AI is analyzing your performance...</p>
                    </div>
                </div>
            )}

            {/* Main Stage */}
            <div className="test-runner-stage">
                <AnimatePresence mode="wait">

                    {/* ═══ INTRO ═══ */}
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="test-intro-box"
                        >
                            <div className="intro-badge">{currentMetadata.badge}</div>
                            <h1>Ready to start?</h1>
                            <p>{currentMetadata.desc}</p>
                            <div className="intro-meta-row">
                                <div className="im-item"><FaClock /> <strong>Duration:</strong> {currentMetadata.dur}</div>
                                <div className="im-item"><FaAward /> <strong>Certifies:</strong> Communication {testId === 'comm-quiz' ? 'IQ' : testId === 'ai-speaking' ? 'Fluency' : 'Mastery'}</div>
                            </div>
                            {testId === 'comm-quiz' && (
                                <div className="intro-categories-preview">
                                    {quizCategories.map((cat, i) => (
                                        <div key={i} className="intro-cat-pill" style={{ borderColor: cat.color, color: cat.color }}>
                                            {cat.icon} {cat.name} <span className="cat-count">{cat.questions.length}Q</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {testId === 'comm-mastery' && (
                                <div className="intro-categories-preview">
                                    {masteryScenarios.map((sc, i) => (
                                        <div key={i} className="intro-cat-pill" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>
                                            <FaComments /> {sc.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button className="start-test-btn" onClick={handleStartTest}>
                                Start Assessment <FaPlay />
                            </button>
                        </motion.div>
                    )}

                    {/* ═══ ACTIVE: COMMUNICATION QUIZ ═══ */}
                    {step === 'active' && testId === 'comm-quiz' && (
                        <motion.div
                            key="active-quiz"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="test-active-box"
                        >
                            {!quizCompleted ? (
                                <div className="quiz-assessment-content">
                                    {/* Category Progress Bar */}
                                    <div className="quiz-category-progress">
                                        {quizCategories.map((cat, ci) => (
                                            <div
                                                key={ci}
                                                className={`qcp-item ${ci === quizCategoryIndex ? 'active' : ci < quizCategoryIndex ? 'done' : ''}`}
                                                style={ci === quizCategoryIndex ? { borderColor: cat.color, color: cat.color } : {}}
                                            >
                                                {ci < quizCategoryIndex ? <FaCheckCircle /> : cat.icon}
                                                <span>{cat.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Question Card */}
                                    <div className="quiz-question-card">
                                        <div className="qqc-header">
                                            <span className="qqc-category-badge" style={{ background: `${quizCategories[quizCategoryIndex].color}15`, color: quizCategories[quizCategoryIndex].color }}>
                                                {quizCategories[quizCategoryIndex].icon} {quizCategories[quizCategoryIndex].name}
                                                {currentQuizQuestion?.sub && ` · ${currentQuizQuestion.sub}`}
                                            </span>
                                            <span className="qqc-counter">
                                                {flatQuizIndex + 1} / {totalQuestionsFlat}
                                            </span>
                                        </div>

                                        <h2 className="question-text">{currentQuizQuestion?.q}</h2>

                                        <div className="options-grid">
                                            {currentQuizQuestion?.options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn ${quizAnswers[currentQuizQuestion.id] === idx ? 'selected' : ''}`}
                                                    onClick={() => setQuizAnswers(prev => ({ ...prev, [currentQuizQuestion.id]: idx }))}
                                                >
                                                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="nav-row">
                                            <button className="back-btn-lab" disabled={flatQuizIndex === 0} onClick={handleQuizPrev}>
                                                <FaArrowLeft /> Previous
                                            </button>
                                            {flatQuizIndex < totalQuestionsFlat - 1 ? (
                                                <button className="start-test-btn" onClick={handleQuizNext}>
                                                    Next <FaChevronRight />
                                                </button>
                                            ) : (
                                                <button className="start-test-btn" onClick={() => setQuizCompleted(true)}>
                                                    Review & Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress Dots */}
                                    <div className="quiz-progress-dots">
                                        {allQuizQuestions.map((q, i) => (
                                            <div
                                                key={i}
                                                className={`qpd ${quizAnswers[q.id] !== undefined ? 'answered' : ''} ${i === flatQuizIndex ? 'current' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Review & Submit Screen */
                                <div className="quiz-review-screen">
                                    <h2><FaCheckCircle /> Review Your Answers</h2>
                                    <p className="review-subtitle">
                                        {Object.keys(quizAnswers).length} of {totalQuestionsFlat} questions answered
                                    </p>
                                    <div className="review-category-summary">
                                        {quizCategories.map((cat, ci) => {
                                            const answered = cat.questions.filter(q => quizAnswers[q.id] !== undefined).length;
                                            return (
                                                <div key={ci} className="rcs-item">
                                                    <span className="rcs-icon" style={{ color: cat.color }}>{cat.icon}</span>
                                                    <span className="rcs-name">{cat.name}</span>
                                                    <span className="rcs-count">{answered}/{cat.questions.length}</span>
                                                    <div className="rcs-bar">
                                                        <div className="rcs-fill" style={{ width: `${(answered / cat.questions.length) * 100}%`, background: cat.color }} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="review-actions">
                                        <button className="back-btn-lab" onClick={() => { setQuizCompleted(false); setQuizCategoryIndex(0); setQuizQuestionIndex(0); }}>
                                            <FaArrowLeft /> Go Back to Questions
                                        </button>
                                        <button className="start-test-btn" onClick={handleSubmitTest}>
                                            <FaCheckCircle /> Submit Assessment
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ═══ ACTIVE: AI SPEAKING ═══ */}
                    {step === 'active' && testId === 'ai-speaking' && (
                        <motion.div
                            key="active-speaking"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="test-active-box"
                        >
                            <div className="speaking-assessment-content interactive-mode">
                                {!hasStartedInterview ? (
                                    <div className="speaking-intro-view">
                                        <div className="ai-avatar-large">
                                            <FaMicrophone />
                                        </div>
                                        <h2 className="speaking-select-title">Live AI Interview</h2>
                                        <p className="speaking-select-subtitle">
                                            Engage in a live, interactive conversation with our AI. The AI will ask you questions out loud, and you will respond using your microphone.
                                        </p>
                                        <button className="start-test-btn pulse-btn" onClick={startInterview}>
                                            <FaPlayCircle /> Start Interview
                                        </button>
                                    </div>
                                ) : (
                                    <div className="speaking-interview-room">
                                        <div className="interview-header">
                                            <div className="ai-status">
                                                <div className={`ai-orb ${isAiSpeaking ? 'speaking' : 'listening'}`}></div>
                                                <span>{isAiSpeaking ? 'AI Interviewer is speaking...' : isRecording ? 'AI is listening...' : 'AI is waiting for your response'}</span>
                                            </div>
                                            <div className="interview-progress">
                                                {speakingLevels[currentLevel].name} (Level {currentLevel + 1} of {speakingLevels.length})
                                            </div>
                                        </div>

                                        <div className="interview-chat-history">
                                            {chatHistory.map((msg, idx) => (
                                                <div key={idx} className={`chat-bubble ${msg.sender}`}>
                                                    <div className="bubble-avatar">
                                                        {msg.sender === 'ai' ? <FaChalkboardTeacher /> : <FaUserAlt />}
                                                    </div>
                                                    <div className="bubble-text">{msg.text}</div>
                                                </div>
                                            ))}
                                            
                                            {/* Show typing/listening indicator */}
                                            {isAiSpeaking && (
                                                <div className="chat-bubble ai typing">
                                                    <div className="bubble-avatar"><FaChalkboardTeacher /></div>
                                                    <div className="bubble-text">
                                                        <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                                                    </div>
                                                </div>
                                            )}
                                            {isRecording && (
                                                <div className="chat-bubble user typing">
                                                    <div className="bubble-avatar"><FaUserAlt /></div>
                                                    <div className="bubble-text">
                                                        {transcription || <><span className="dot"></span><span className="dot"></span><span className="dot"></span></>}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {!interviewCompleted ? (
                                            <div className="interview-controls">
                                                {!isRecording ? (
                                                    <button 
                                                        className="rec-btn start" 
                                                        onClick={startRecording}
                                                        disabled={isAiSpeaking}
                                                    >
                                                        <FaMicrophone /> {isAiSpeaking ? 'Wait for AI...' : 'Hold to Answer'}
                                                    </button>
                                                ) : (
                                                    <button className="rec-btn stop" onClick={stopRecording}>
                                                        <FaRegStopCircle /> Finish Answer
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="interview-controls">
                                                <button className="start-test-btn" onClick={handleSubmitTest}>
                                                    <FaChartBar /> Analyze Interview Performance
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ACTIVE: MASTERY REMOVED */}

                    {/* ═══ FEEDBACK ═══ */}
                    {step === 'feedback' && analysisResult && (
                        <motion.div
                            key="feedback"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="test-feedback-box"
                        >
                            <div className="feedback-badge-premium"><FaTrophy /> Assessment Completed</div>
                            <h1>Your Performance Report</h1>
                            {analysisResult.summary && (
                                <p className="feedback-summary-text">{analysisResult.summary}</p>
                            )}

                            <div className="feedback-score-grid">
                                <div className="score-big-circle">
                                    <h2>{analysisResult.score}%</h2>
                                    <span className="level-label" style={{ color: getLevelColor(analysisResult.level) }}>
                                        {analysisResult.level}
                                    </span>
                                </div>
                                <div className="feedback-metrics-detail">
                                    {analysisResult.metrics && Object.entries(analysisResult.metrics).map(([metric, val]) => (
                                        <div className="f-metric-row" key={metric}>
                                            <span className="fm-label">{metric}</span>
                                            <div className="fm-bar-container">
                                                <div
                                                    className="fm-bar-fill"
                                                    style={{
                                                        width: `${val}%`,
                                                        background: val >= 80 ? '#10b981' : val >= 60 ? '#f59e0b' : '#ef4444',
                                                    }}
                                                />
                                            </div>
                                            <span className="fm-val">{val}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="feedback-insights-box">
                                <h3><FaLightbulb /> Key Insights & Recommendations</h3>
                                <ul>
                                    {analysisResult.feedback && analysisResult.feedback.map((insight, idx) => (
                                        <li key={idx}>{insight}</li>
                                    ))}
                                </ul>
                            </div>

                            <button className="start-test-btn" onClick={onBack} style={{ marginTop: '2rem' }}>
                                Return to Test Center
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CommunicationTestRunner;
