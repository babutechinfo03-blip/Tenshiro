export const SIMULATION_MODULES = {
    corporate: {
        id: 'corporate',
        title: 'Corporate Meeting Room',
        theme: 'boardroom', // Used for background CSS class
        ambience: '/audio/office_ambience.mp3', // Mock path
        panel: [
            {
                id: 'p1',
                name: 'Sarah Williams',
                role: 'Senior HR Manager',
                voice: 'Google US English', // Try to use female voice
                video: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-video-call-working-from-home-42996-large.mp4',
                poster: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
            },
            {
                id: 'p2',
                name: 'Rahul Sharma',
                role: 'Technical Lead',
                voice: 'Google UK English Male', // Try male
                video: 'https://assets.mixkit.co/videos/preview/mixkit-man-in-a-video-call-talking-and-gesturing-42997-large.mp4',
                poster: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80'
            },
            {
                id: 'p3',
                name: 'David Chen',
                role: 'Engineering Director',
                voice: 'Google US English', // Try male
                video: 'https://assets.mixkit.co/videos/preview/mixkit-mature-man-giving-a-presentation-on-a-video-call-42998-large.mp4',
                poster: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80'
            }
        ],
        script: [
            {
                speaker: 'p1',
                text: "Good morning. I’m Sarah from HR. With me are Rahul and David from Engineering. Let's start with the HR Round. Could you briefly introduce yourself and tell us about your background?"
            },
            {
                speaker: 'p2',
                type: 'dynamic',
                baseText: "Moving to the Technical Round. What was the most challenging architectural decision you made in your recent projects, and why?"
            },
            {
                speaker: 'p3',
                type: 'pressure',
                baseText: "For the Project Discussion, I see you've uploaded your recent portfolio project. Why did you build this specific project, and what architecture did you choose?"
            },
            {
                speaker: 'p2',
                type: 'dynamic',
                baseText: "Regarding the Database for that project, how did you handle data modeling and potential scaling challenges?"
            },
            {
                speaker: 'p3',
                type: 'dynamic',
                baseText: "What were the major technical challenges you faced while building it, and what is the future scope of this project?"
            },
            {
                speaker: 'p1',
                type: 'dynamic',
                baseText: "Finally, in this Managerial Round, tell me about a time you had a major disagreement with a teammate. How did you resolve it?"
            },
            {
                speaker: 'p1',
                type: 'closing',
                baseText: "Thank you. That concludes our Final Assessment. We have a good picture of your profile. We'll evaluate your responses now."
            }
        ]
    },
    startup: {
        id: 'startup',
        title: 'Startup Investor Pitch Room',
        theme: 'modern_office',
        ambience: '/audio/cafe_ambience.mp3',
        panel: [
            {
                id: 'p1',
                name: 'Ananya Iyer',
                role: 'Lead Investor',
                voice: 'Google UK English Female',
                video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-video-call-talking-and-smiling-42999-large.mp4'
            },
            {
                id: 'p2',
                name: 'Mark Johnson',
                role: 'Venture Partner',
                voice: 'Google US English',
                video: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-giving-a-presentation-on-a-video-call-42995-large.mp4'
            }
        ],
        script: [
            {
                speaker: 'p1',
                text: "Hi, I'm Ananya and this is Mark. We've seen your deck. Give us your 60-second elevator pitch. Why this problem, and why now?"
            },
            {
                speaker: 'p2',
                type: 'pressure',
                baseText: "There are already three established players doing exactly this. What is your actual competitive moat?"
            },
            {
                speaker: 'p1',
                type: 'dynamic',
                baseText: "What is your Customer Acquisition Cost, and how do you plan to bring it down as you scale?"
            },
            {
                speaker: 'p2',
                type: 'dynamic',
                baseText: "If we give you the $500k you're asking for, what exactly will your runway look like, and what milestones will you hit?"
            },
            {
                speaker: 'p1',
                type: 'closing',
                baseText: "Alright, we have enough to think about. Thanks for the pitch. We'll be in touch."
            }
        ]
    },
    government: {
        id: 'government',
        title: 'Government Interview Hall',
        theme: 'wood_panel',
        panel: [
            {
                id: 'p1',
                name: 'Mr. Sharma',
                role: 'Chairman',
                voice: 'Google UK English Male',
                video: 'https://assets.mixkit.co/videos/preview/mixkit-mature-man-giving-a-presentation-on-a-video-call-42998-large.mp4'
            },
            {
                id: 'p2',
                name: 'Dr. Gupta',
                role: 'Panel Member 1',
                voice: 'Google US English',
                video: 'https://assets.mixkit.co/videos/preview/mixkit-man-in-a-video-call-talking-and-gesturing-42997-large.mp4'
            }
        ],
        script: [
            {
                speaker: 'p1',
                text: "Good morning. Please take a seat. Let's begin. Introduce yourself without mentioning your name or hometown."
            },
            {
                speaker: 'p2',
                type: 'pressure',
                baseText: "Given the recent economic shifts, how would you justify the continued investment in public sector undertakings?"
            },
            {
                speaker: 'p1',
                type: 'dynamic',
                baseText: "If you are posted as a District Collector during a severe communal riot, what are your immediate first three steps?"
            },
            {
                speaker: 'p2',
                type: 'closing',
                baseText: "Your interview is complete. You may leave the room."
            }
        ]
    },
    higher_studies: {
        id: 'higher_studies',
        title: 'MBA Admissions Panel',
        theme: 'boardroom',
        panel: [
            {
                id: 'p1',
                name: 'Prof. Anderson',
                role: 'Admissions Director',
                voice: 'Google US English',
                video: 'https://assets.mixkit.co/videos/preview/mixkit-mature-man-giving-a-presentation-on-a-video-call-42998-large.mp4'
            },
            {
                id: 'p2',
                name: 'Dr. Lee',
                role: 'Alumni Interviewer',
                voice: 'Google UK English Female',
                video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-video-call-talking-and-smiling-42999-large.mp4'
            }
        ],
        script: [
            { speaker: 'p1', text: "Welcome. Let's begin by discussing your motivation. Why do you want to pursue an MBA at this point in your career?" },
            { speaker: 'p2', type: 'pressure', baseText: "Looking at your profile, your quantitative background seems a bit light compared to other candidates. How do you plan to handle the rigorous finance core courses?" },
            { speaker: 'p1', type: 'dynamic', baseText: "Tell us about a time you led a team through a significant crisis or failure. What did you learn?" },
            { speaker: 'p2', type: 'dynamic', baseText: "How will you contribute to the diversity of thought in our cohort?" },
            { speaker: 'p1', type: 'closing', baseText: "Thank you for your time. The admissions committee will review your application." }
        ]
    },
    engineering: {
        id: 'engineering',
        title: 'Core Engineering Viva',
        theme: 'modern_office',
        panel: [
            {
                id: 'p1',
                name: 'Dr. Raman',
                role: 'Chief Engineer',
                voice: 'Google UK English Male',
                video: 'https://assets.mixkit.co/videos/preview/mixkit-man-in-a-video-call-talking-and-gesturing-42997-large.mp4'
            }
        ],
        script: [
            { speaker: 'p1', text: "Hello. Let's start with the basics. Explain the first and second laws of thermodynamics in your own words, and give a practical industrial example." },
            { speaker: 'p1', type: 'pressure', baseText: "If I have a pump that is cavitating, what are the immediate signs, and what steps would you take to diagnose and fix it?" },
            { speaker: 'p1', type: 'dynamic', baseText: "Explain how you would select a material for a high-temperature, high-stress turbine blade." },
            { speaker: 'p1', type: 'closing', baseText: "Alright, that covers my questions. We will evaluate your technical grasp and get back to you." }
        ]
    }
};

const POSITIVE_REACTIONS = [
    "That's a good point.",
    "Impressive.",
    "Excellent explanation.",
    "I agree with that approach.",
    "Well articulated."
];

const NEGATIVE_REACTIONS = [
    "I'm not completely convinced.",
    "Can you explain that better?",
    "Let's go deeper on that.",
    "That sounds a bit generic.",
    "I see, though I would have expected a different approach."
];

export const generateNextResponse = (moduleConfig, currentStep, userResponse) => {
    if (currentStep >= moduleConfig.script.length) return null;

    const scriptNode = moduleConfig.script[currentStep];
    const words = userResponse.trim().split(/\s+/).filter(Boolean).length;
    
    let reaction = "";
    
    if (scriptNode.type === 'dynamic' || scriptNode.type === 'pressure') {
        // Simple heuristic for demo: > 30 words is a strong answer
        if (words > 25) {
            reaction = POSITIVE_REACTIONS[Math.floor(Math.random() * POSITIVE_REACTIONS.length)] + " ";
        } else if (words > 0) {
            reaction = NEGATIVE_REACTIONS[Math.floor(Math.random() * NEGATIVE_REACTIONS.length)] + " ";
        }
    }

    return {
        speaker: moduleConfig.panel.find(p => p.id === scriptNode.speaker),
        text: reaction + (scriptNode.text || scriptNode.baseText),
        isLast: currentStep === moduleConfig.script.length - 1
    };
};
