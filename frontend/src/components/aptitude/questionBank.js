// ─── AI Aptitude Intelligence — Data Engine ────────────────────────────────────

// ─── Question Bank ─────────────────────────────────────────────────────────────
export const questionBank = {
    quantitative: [
        { id: 'q1', topic: 'Percentages', difficulty: 'Easy', question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], answer: 1, explanation: '15% of 200 = (15/100) * 200 = 30' },
        { id: 'q2', topic: 'Average', difficulty: 'Easy', question: 'Average of 10, 20, 30, 40, 50 is?', options: ['25', '30', '35', '40'], answer: 1, explanation: 'Sum=150, Count=5, Avg=30' },
        { id: 'q3', topic: 'Ratio', difficulty: 'Easy', question: 'Ratio of 48 to 36 is?', options: ['3:4', '4:3', '2:3', '3:2'], answer: 1, explanation: '48/36=4/3 -> 4:3' },
        { id: 'q4', topic: 'Simple Interest', difficulty: 'Easy', question: 'SI on ₹1000 at 5% for 2 years = ?', options: ['₹50', '₹100', '₹200', '₹150'], answer: 1, explanation: 'SI=(1000*5*2)/100=₹100' },
        { id: 'q5', topic: 'LCM', difficulty: 'Easy', question: 'LCM of 12 and 18 is?', options: ['24', '36', '48', '72'], answer: 1, explanation: 'LCM(12,18)=36' },
        { id: 'q6', topic: 'Speed', difficulty: 'Easy', question: 'A car travels 120 km in 2 hours. Speed = ?', options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], answer: 1, explanation: 'Speed=120/2=60 km/h' },
        { id: 'q7', topic: 'Profit & Loss', difficulty: 'Easy', question: 'CP=₹100, SP=₹120. Profit%=?', options: ['15%', '20%', '25%', '30%'], answer: 1, explanation: 'Profit%=(20/100)*100=20%' },
        { id: 'q8', topic: 'Number System', difficulty: 'Easy', question: 'Square of 13 is?', options: ['161', '169', '171', '179'], answer: 1, explanation: '13*13=169' },
        { id: 'q9', topic: 'HCF', difficulty: 'Easy', question: 'HCF of 24 and 36 is?', options: ['6', '9', '12', '18'], answer: 2, explanation: 'HCF(24,36)=12' },
        { id: 'q10', topic: 'Fractions', difficulty: 'Easy', question: '3/4 + 1/4 = ?', options: ['1/2', '3/4', '1', '4/3'], answer: 2, explanation: '4/4=1' },
        { id: 'q11', topic: 'Compound Interest', difficulty: 'Medium', question: 'CI on ₹5000 at 10% for 2 years?', options: ['₹1000', '₹1050', '₹1100', '₹1150'], answer: 1, explanation: 'CI=5000[(1.1)²-1]=5000*0.21=₹1050' },
        { id: 'q12', topic: 'Time & Work', difficulty: 'Medium', question: 'A does work in 10 days, B in 15 days. Together?', options: ['5 days', '6 days', '7 days', '8 days'], answer: 1, explanation: '1/10+1/15=1/6 -> 6 days' },
        { id: 'q13', topic: 'Pipes & Cistern', difficulty: 'Medium', question: 'Pipe A fills in 20 min, Pipe B drains in 30 min. Together?', options: ['60 min', '50 min', '45 min', '40 min'], answer: 0, explanation: 'Net=1/20-1/30=1/60 -> 60 min' },
        { id: 'q14', topic: 'Boats & Streams', difficulty: 'Medium', question: 'Boat speed 10 km/h, stream 2 km/h. Upstream speed?', options: ['8 km/h', '10 km/h', '12 km/h', '6 km/h'], answer: 0, explanation: '10-2=8 km/h' },
        { id: 'q15', topic: 'Algebra', difficulty: 'Medium', question: 'If 2x + 3 = 11, x = ?', options: ['3', '4', '5', '6'], answer: 1, explanation: '2x=8, x=4' },
        { id: 'q16', topic: 'Geometry', difficulty: 'Medium', question: 'Area of circle with r=7 (π=22/7)?', options: ['144 cm²', '154 cm²', '164 cm²', '174 cm²'], answer: 1, explanation: 'πr²=22/7*49=154 cm²' },
        { id: 'q17', topic: 'Mensuration', difficulty: 'Medium', question: 'Volume of cube side=4cm?', options: ['48 cm³', '56 cm³', '64 cm³', '72 cm³'], answer: 2, explanation: '4³=64 cm³' },
        { id: 'q18', topic: 'Permutations', difficulty: 'Medium', question: '4 books arranged on shelf in how many ways?', options: ['12', '16', '24', '32'], answer: 2, explanation: '4!=24' },
        { id: 'q19', topic: 'Probability', difficulty: 'Hard', question: 'Two dice rolled. P(sum=7)?', options: ['1/6', '1/9', '1/12', '1/18'], answer: 0, explanation: '6 favourable/36 total=1/6' },
        { id: 'q20', topic: 'Quadratic Equations', difficulty: 'Hard', question: 'Roots of x²-5x+6=0?', options: ['2,3', '1,6', '2,4', '3,4'], answer: 0, explanation: '(x-2)(x-3)=0' },
        { id: 'q21', topic: 'Mixtures', difficulty: 'Hard', question: 'A vessel has 60L mixture of milk:water 7:3. Water to add for 1:1?', options: ['20L', '24L', '30L', '36L'], answer: 1, explanation: 'Milk=42L, Water=18L. Add 24L water->42:42=1:1' },
        { id: 'q22', topic: 'Logarithms', difficulty: 'Hard', question: 'log₂(32) = ?', options: ['4', '5', '6', '8'], answer: 1, explanation: '2⁵=32 -> log₂32=5' },
    ],
    logical: [
        { id: 'l1', topic: 'Series', difficulty: 'Easy', question: '2, 4, 8, 16, __?', options: ['24', '28', '32', '36'], answer: 2, explanation: 'x2 pattern: 32' },
        { id: 'l2', topic: 'Analogy', difficulty: 'Easy', question: 'Doctor:Hospital :: Teacher:?', options: ['Book', 'School', 'Student', 'Pen'], answer: 1, explanation: 'Place of work.' },
        { id: 'l3', topic: 'Odd One Out', difficulty: 'Easy', question: 'Odd one: Cat, Dog, Parrot, Rabbit?', options: ['Cat', 'Dog', 'Parrot', 'Rabbit'], answer: 2, explanation: 'Parrot is a bird.' },
        { id: 'l4', topic: 'Directions', difficulty: 'Easy', question: 'Facing East, turn right 90°. Now facing?', options: ['North', 'South', 'West', 'East'], answer: 1, explanation: 'East -> Right -> South' },
        { id: 'l5', topic: 'Blood Relations', difficulty: 'Easy', question: 'A is B\'s mother. C is A\'s son. C is B\'s?', options: ['Father', 'Brother', 'Uncle', 'Son'], answer: 1, explanation: 'Both children of A.' },
        { id: 'l6', topic: 'Coding', difficulty: 'Easy', question: 'If CAT=24, then DOG=?', options: ['26', '28', '30', '32'], answer: 0, explanation: '4+15+7=26' },
        { id: 'l7', topic: 'Ranking', difficulty: 'Easy', question: 'Ravi is 7th from left and 5th from right. Total?', options: ['11', '12', '13', '15'], answer: 0, explanation: '7+5-1=11' },
        { id: 'l8', topic: 'Calendar', difficulty: 'Easy', question: 'Jan 1 is Monday. Jan 8 is?', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], answer: 1, explanation: '+7 days = same day.' },
        { id: 'l9', topic: 'Pattern', difficulty: 'Medium', question: '1,4,9,16,25,__?', options: ['30', '36', '42', '49'], answer: 1, explanation: 'n²: 6²=36' },
        { id: 'l10', topic: 'Syllogism', difficulty: 'Medium', question: 'All cats are dogs. All dogs are birds. Conclusions: (I) All cats are birds.', options: ['Only I follows', 'Only II follows', 'Both follow', 'None follow'], answer: 0, explanation: 'Transitive property: Cats -> Dogs -> Birds' },
    ],
    verbal: [
        { id: 'v1', topic: 'Synonyms', difficulty: 'Easy', question: 'Synonym of "Abundant"?', options: ['Scarce', 'Plentiful', 'Rare', 'Meager'], answer: 1, explanation: 'Abundant=Plentiful' },
        { id: 'v2', topic: 'Antonyms', difficulty: 'Easy', question: 'Antonym of "Ancient"?', options: ['Old', 'Historic', 'Modern', 'Timeless'], answer: 2, explanation: 'Ancient↔Modern' },
        { id: 'v3', topic: 'Error Spotting', difficulty: 'Medium', question: 'Identify error: "He don\'t know the answer."', options: ['He', 'don\'t', 'know', 'No error'], answer: 1, explanation: 'Should be "doesn\'t"' },
    ],
    dataInterpretation: [
        { id: 'd1', topic: 'Bar Chart', difficulty: 'Easy', question: 'Sales Jan=200, Feb=300. Increase?', options: ['50', '75', '100', '150'], answer: 2, explanation: '300-200=100' },
        { id: 'd2', topic: 'Pie Chart', difficulty: 'Easy', question: '36° segment = what %?', options: ['8%', '10%', '12%', '15%'], answer: 1, explanation: '36/360*100=10%' },
    ],
    advanced: [
        { id: 'a1', topic: 'Coding Aptitude', difficulty: 'Medium', question: 'What is the output of print(2**3**2)?', options: ['64', '512', '32', '1024'], answer: 1, explanation: 'Exponentiation is right-to-left: 2**(3**2) = 2**9 = 512' },
        { id: 'a2', topic: 'Decision Making', difficulty: 'Hard', question: 'A manager finds an employee leaking trade secrets. Best first action?', options: ['Immediate fire', 'Investigation', 'Warning', 'Transfer'], answer: 1, explanation: 'Investigation is standard ethical procedure before action.' },
    ]
};

export const generateTest = (category, difficulty, count) => {
    const bank = questionBank[category] || questionBank.quantitative;
    let pool = difficulty === 'Adaptive' ? bank : bank.filter(q => q.difficulty === difficulty);
    if (!pool.length) pool = bank;
    return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
};

export const CATEGORIES = [
    { key: 'quantitative', label: 'Quantitative Aptitude', icon: '📐', color: '#6366f1', accent: 'rgba(99,102,241,0.1)', topics: ['Number System', 'Arithmetic', 'Algebra', 'Geometry', 'Trigonometry', 'Mensuration', 'Probability', 'Permutation & Combination', 'Time & Work', 'Time & Distance', 'Profit & Loss', 'Ratio & Proportion', 'Mixtures', 'Percentages'] },
    { key: 'logical', label: 'Logical Reasoning', icon: '🧠', color: '#a855f7', accent: 'rgba(168,85,247,0.1)', topics: ['Puzzles', 'Seating Arrangement', 'Blood Relations', 'Coding-Decoding', 'Syllogism', 'Logical Sequences', 'Statement Assumption', 'Critical Reasoning', 'Input Output', 'Analytical Reasoning'] },
    { key: 'verbal', label: 'Verbal Ability', icon: '📝', color: '#1A3263', accent: 'rgba(26,50,99,0.1)', topics: ['Reading Comprehension', 'Para Jumbles', 'Error Spotting', 'Sentence Correction', 'Vocabulary Builder', 'Cloze Test', 'Grammar'] },
    { key: 'dataInterpretation', label: 'Data Interpretation', icon: '📊', color: '#f59e0b', accent: 'rgba(245,158,11,0.1)', topics: ['Bar Charts', 'Pie Charts', 'Line Graphs', 'Table Charts', 'Caselets'] },
    { key: 'advanced', label: 'Advanced Sections', icon: '🚀', color: '#ec4899', accent: 'rgba(236,72,153,0.1)', topics: ['Logical Data Structures', 'Case Studies', 'Coding Aptitude', 'Decision Making', 'Logical Case Analysis'] },
];

export const TRACKS = [
    { id: 'it', label: 'IT / Product MNC', icon: '💻', color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', description: 'TCS, Infosys, Amazon, Microsoft — Top MNC readiness', companies: ['TCS', 'Infosys', 'Amazon', 'Microsoft', 'Google'], modules: [{ name: 'Quant', category: 'quantitative', difficulty: 'Medium', icon: '📐', count: 20 }, { name: 'Logical', category: 'logical', difficulty: 'Hard', icon: '🧩', count: 20 }], roadmap: ['Week 1-2: Quant Basics', 'Week 3-4: Logical Puzzles', 'Week 5-6: Verbal & DI', 'Week 7-8: Mock Tests'] },
    { id: 'campus', label: 'Campus Placement', icon: '🎓', color: '#1A3263', gradient: 'linear-gradient(135deg, #1A3263, #0F172A)', description: 'Bulk hiring preparaton for all branches', companies: ['Wipro', 'HCL', 'Cognizant', 'Capgemini'], modules: [{ name: 'Aptitude', category: 'quantitative', difficulty: 'Easy', icon: '🔧', count: 20 }, { name: 'Reasoning', category: 'logical', difficulty: 'Medium', icon: '🔩', count: 15 }], roadmap: ['Week 1-2: Basic Math', 'Week 3-4: Entry Reasoning', 'Week 5-6: English'] },
    { id: 'core', label: 'Core Engineering', icon: '⚙️', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', description: 'L&T, Tata Steel, Bosch — PSU & Core focus', companies: ['L&T', 'Tata Steel', 'ISRO', 'DRDO'], modules: [{ name: 'Technical Math', category: 'quantitative', difficulty: 'Hard', icon: '🔧', count: 20 }, { name: 'Logical', category: 'logical', difficulty: 'Medium', icon: '🔩', count: 15 }], roadmap: ['Week 1-2: Higher Math', 'Week 3-4: Core Reasoning'] },
    { id: 'banking', label: 'Banking Exams', icon: '🏦', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', description: 'SBI PO, IBPS, RBI Grade B — Speed focus', companies: ['SBI PO', 'IBPS PO', 'RBI'], modules: [{ name: 'Speed Math', category: 'quantitative', difficulty: 'Hard', icon: '🏦', count: 20 }, { name: 'DI', category: 'dataInterpretation', difficulty: 'Hard', icon: '📊', count: 20 }], roadmap: ['Week 1-4: Quant & DI', 'Week 5-8: Reasoning & English'] },
    { id: 'govt', label: 'Government Exams', icon: '🏛️', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)', description: 'SSC CGL, UPSC CSAT, RRB — Pattern based', companies: ['SSC CGL', 'UPSC CSAT', 'RRB'], modules: [{ name: 'Quant', category: 'quantitative', difficulty: 'Hard', icon: '🎯', count: 30 }, { name: 'Verbal', category: 'verbal', difficulty: 'Medium', icon: '📝', count: 20 }], roadmap: ['Week 1-4: Quant', 'Week 5-8: Reasoning & English'] },
    { id: 'intl', label: 'International Tests', icon: '🌎', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', description: 'GMAT, GRE, SAT — Logical & Quant focus', companies: ['GMAT', 'GRE', 'SAT'], modules: [{ name: 'Quant', category: 'quantitative', difficulty: 'Hard', icon: '🌎', count: 20 }, { name: 'Verbal', category: 'verbal', difficulty: 'Hard', icon: '📝', count: 20 }], roadmap: ['Week 1-6: Specialized Prep'] },
    { id: 'general', label: 'General Skill Improvement', icon: '⚡', color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #db2777)', description: 'Improve overall cognitive ability', companies: ['General'], modules: [{ name: 'IQ', category: 'logical', difficulty: 'Medium', icon: '🧠', count: 20 }], roadmap: ['Daily 30 mins practice'] },
];

export const COMPANY_SECTIONS = [
    { id: 'it_giants', label: 'Indian IT Giants', companies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'LTIMindtree', 'Mphasis', 'Cognizant India'] },
    { id: 'global_mnc', label: 'Global MNC Tech', companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple', 'IBM', 'Oracle', 'Adobe', 'Salesforce', 'Accenture', 'Capgemini', 'DXC Technology', 'Deloitte', 'EY', 'PwC', 'KPMG'] },
    { id: 'product', label: 'Product-Based Companies', companies: ['Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'Razorpay', 'Zoho', 'Freshworks', 'PhonePe', 'Meesho', 'CRED', 'Atlassian', 'Uber'] },
    { id: 'core', label: 'Core Engineering', companies: ['L&T', 'Bosch', 'Tata Steel', 'Mahindra', 'Siemens', 'ABB', 'Schneider Electric', 'BHEL', 'ISRO', 'DRDO'] },
    { id: 'banking', label: 'Banking & Finance', companies: ['Bank PO', 'SBI Clerk', 'RBI Grade B', 'IBPS PO', 'SEBI', 'NABARD', 'HDFC Bank', 'ICICI Bank'] },
    { id: 'govt', label: 'Government & Competitive', companies: ['SSC CGL', 'SSC CHSL', 'Railway RRB', 'UPSC CSAT', 'TNPSC', 'State PSC', 'Defence Exams', 'LIC AAO'] },
];

export const COMPANY_DETAILS = {
    // SECTION 1: IT GIANTS
    TCS: { name: 'TCS NQT', role: 'IT / Software', pattern: 'Numerical, Verbal, Reasoning', difficulty: 6, cutoff: 65, category: 'quantitative', sections: [{ name: 'Numerical', weight: 40 }, { name: 'Verbal', weight: 30 }, { name: 'Reasoning', weight: 30 }], trend: [60, 62, 65, 65, 68], website: 'https://nextstep.tcs.com', logo: '🏢', color: '#0052cc', mode: 'Online', duration: 90 },
    Infosys: { name: 'Infosys SP/DSE', role: 'IT / Software', pattern: 'Logical, Math, Verbal', difficulty: 7, cutoff: 70, category: 'logical', sections: [{ name: 'Logical', weight: 35 }, { name: 'Math', weight: 35 }, { name: 'Verbal', weight: 30 }], trend: [65, 68, 70, 70, 72], website: 'https://www.infosys.com/careers', logo: '🔷', color: '#007cc2', mode: 'Online', duration: 100 },
    Wipro: { name: 'Wipro Elite NLTH', role: 'IT / Software', pattern: 'Quant, Logical, English', difficulty: 6, cutoff: 62, category: 'quantitative', sections: [{ name: 'Quant', weight: 33 }, { name: 'Logical', weight: 33 }, { name: 'English', weight: 34 }], trend: [58, 60, 62, 62, 64], website: 'https://careers.wipro.com', logo: '🎡', color: '#000000', mode: 'Online', duration: 128 },
    HCL: { name: 'HCL First Careers', role: 'IT / Software', pattern: 'Aptitude, Tech, English', difficulty: 5, cutoff: 60, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 40 }, { name: 'Tech', weight: 30 }, { name: 'English', weight: 30 }], trend: [55, 58, 60, 60, 62], website: 'https://www.hcltech.com/careers', logo: '🔵', color: '#0056b3', mode: 'Online', duration: 90 },
    'Tech Mahindra': { name: 'TechM Off-Campus', role: 'IT / Software', pattern: 'Quant, Logic, English', difficulty: 6, cutoff: 64, category: 'logical', sections: [{ name: 'Quant', weight: 35 }, { name: 'Logic', weight: 35 }, { name: 'English', weight: 30 }], trend: [60, 62, 64, 64, 66], website: 'https://www.techmahindra.com/en-in/careers/', logo: '🔴', color: '#e4002b', mode: 'Online', duration: 80 },
    LTIMindtree: { name: 'LTI Recruitment', role: 'IT / Software', pattern: 'Quant, Logical, Verbal', difficulty: 7, cutoff: 68, category: 'quantitative', sections: [{ name: 'Quant', weight: 40 }, { name: 'Logical', weight: 30 }, { name: 'Verbal', weight: 30 }], trend: [62, 65, 68, 68, 70], website: 'https://www.ltimindtree.com/careers/', logo: '🔶', color: '#fa4616', mode: 'Online', duration: 100 },
    Mphasis: { name: 'Mphasis Hiring', role: 'IT / Software', pattern: 'AMCAT Based Aptitude', difficulty: 6, cutoff: 65, category: 'quantitative', sections: [{ name: 'Logical', weight: 40 }, { name: 'Quant', weight: 30 }, { name: 'Verbal', weight: 30 }], trend: [60, 63, 65, 65, 67], website: 'https://www.mphasis.com/home/careers.html', logo: '⭐', color: '#f7931e', mode: 'Online', duration: 90 },
    'Cognizant India': { name: 'CTS GenC', role: 'IT / Software', pattern: 'Quant, Logical, English', difficulty: 6, cutoff: 66, category: 'logical', sections: [{ name: 'Quant', weight: 33 }, { name: 'Logical', weight: 33 }, { name: 'English', weight: 34 }], trend: [62, 64, 66, 68, 70], website: 'https://www.cognizant.com/in/en/careers', logo: '🧿', color: '#000048', mode: 'Online', duration: 120 },

    // SECTION 2: GLOBAL MNC
    Amazon: { name: 'Amazon OA', role: 'Product / Tech', pattern: 'Coding, Aptitude, SDE', difficulty: 9, cutoff: 75, category: 'logical', sections: [{ name: 'Aptitude', weight: 30 }, { name: 'Coding', weight: 50 }, { name: 'Verbal', weight: 20 }], trend: [70, 72, 75, 78, 80], website: 'https://amazon.jobs', logo: '🟠', color: '#ff9900', mode: 'Online', duration: 120 },
    Microsoft: { name: 'Microsoft OA', role: 'Product / Tech', pattern: 'DSA, Logic, Verbal', difficulty: 9, cutoff: 80, category: 'logical', sections: [{ name: 'DSA', weight: 60 }, { name: 'Logic', weight: 20 }, { name: 'Verbal', weight: 20 }], trend: [75, 78, 80, 82, 85], website: 'https://careers.microsoft.com', logo: '🟦', color: '#00a4ef', mode: 'Online', duration: 150 },
    Google: { name: 'Google OA', role: 'Product / Tech', pattern: 'Graph, Tree, Complex Logic', difficulty: 10, cutoff: 85, category: 'logical', sections: [{ name: 'Logic', weight: 30 }, { name: 'Advanced DSA', weight: 70 }], trend: [80, 82, 85, 88, 90], website: 'https://careers.google.com', logo: '🌈', color: '#4285f4', mode: 'Online', duration: 180 },
    Meta: { name: 'Meta OA', role: 'Product / Tech', pattern: 'High Speed DSA', difficulty: 9, cutoff: 80, category: 'logical', sections: [{ name: 'Logic', weight: 20 }, { name: 'Speed Code', weight: 80 }], trend: [75, 78, 80, 80, 82], website: 'https://www.metacareers.com', logo: '♾️', color: '#0668E1', mode: 'Online', duration: 90 },
    Apple: { name: 'Apple OA', role: 'Product / Tech', pattern: 'Systems, Logic, Math', difficulty: 9, cutoff: 80, category: 'quantitative', sections: [{ name: 'Math', weight: 40 }, { name: 'Systems', weight: 40 }, { name: 'Logic', weight: 20 }], trend: [78, 78, 80, 82, 84], website: 'https://www.apple.com/careers', logo: '🍎', color: '#555555', mode: 'Online', duration: 120 },
    IBM: { name: 'IBM IPAT', role: 'Tech / Consulting', pattern: 'Matrics, Logic, Patterns', difficulty: 8, cutoff: 72, category: 'logical', sections: [{ name: 'Logic', weight: 50 }, { name: 'Pattern', weight: 30 }, { name: 'Verbal', weight: 20 }], trend: [68, 70, 70, 72, 75], website: 'https://www.ibm.com/careers', logo: '👔', color: '#0062ff', mode: 'Online', duration: 100 },
    Oracle: { name: 'Oracle Aptitude', role: 'Tech / Database', pattern: 'Logical, Quant, Math', difficulty: 8, cutoff: 75, category: 'quantitative', sections: [{ name: 'Math', weight: 40 }, { name: 'Logic', weight: 40 }, { name: 'Verbal', weight: 20 }], trend: [70, 72, 75, 75, 78], website: 'https://www.oracle.com/careers', logo: '🔴', color: '#f80000', mode: 'Online', duration: 120 },
    Adobe: { name: 'Adobe OA', role: 'Product / Creative', pattern: 'Logic, Coding, Quant', difficulty: 9, cutoff: 78, category: 'quantitative', sections: [{ name: 'Quant', weight: 30 }, { name: 'Logic', weight: 30 }, { name: 'Tech', weight: 40 }], trend: [72, 75, 78, 80, 82], website: 'https://www.adobe.com/careers.html', logo: '🟥', color: '#ff0000', mode: 'Online', duration: 120 },
    Salesforce: { name: 'Salesforce OA', role: 'Product / Cloud', pattern: 'Logic, DSA, Verbal', difficulty: 9, cutoff: 80, category: 'logical', sections: [{ name: 'Logic', weight: 30 }, { name: 'DSA', weight: 50 }, { name: 'Verbal', weight: 20 }], trend: [75, 78, 80, 82, 85], website: 'https://careers.salesforce.com', logo: '☁️', color: '#00a1e0', mode: 'Online', duration: 150 },
    Accenture: { name: 'Accenture Assessment', role: 'Consulting / Tech', pattern: 'Cognitive, Technical, English', difficulty: 7, cutoff: 70, category: 'logical', sections: [{ name: 'Cognitive', weight: 40 }, { name: 'Technical', weight: 30 }, { name: 'English', weight: 30 }], trend: [65, 68, 70, 72, 75], website: 'https://www.accenture.com/in-en/careers', logo: '📐', color: '#a100ff', mode: 'Online', duration: 120 },
    Capgemini: { name: 'Capgemini Game-Based', role: 'Tech / Services', pattern: 'Game Aptitude, Pseudo Code', difficulty: 7, cutoff: 68, category: 'logical', sections: [{ name: 'Games', weight: 40 }, { name: 'Pseudo', weight: 30 }, { name: 'English', weight: 30 }], trend: [62, 65, 68, 70, 72], website: 'https://www.capgemini.com/careers', logo: '♠️', color: '#0070ad', mode: 'Online', duration: 100 },
    'DXC Technology': { name: 'DXC Readiness', role: 'Tech / Services', pattern: 'Quant, Logical, English', difficulty: 6, cutoff: 62, category: 'quantitative', sections: [{ name: 'Quant', weight: 40 }, { name: 'Logical', weight: 30 }, { name: 'English', weight: 30 }], trend: [58, 60, 62, 64, 65], website: 'https://dxc.com/us/en/careers', logo: '⚫', color: '#000000', mode: 'Online', duration: 90 },
    Deloitte: { name: 'Deloitte NLA', role: 'Consulting', pattern: 'Reasoning, Quant, English', difficulty: 7, cutoff: 72, category: 'logical', sections: [{ name: 'Reasoning', weight: 40 }, { name: 'Quant', weight: 30 }, { name: 'English', weight: 30 }], trend: [68, 70, 72, 75, 78], website: 'https://www2.deloitte.com/ui/en/careers.html', logo: '🟢', color: '#86bc25', mode: 'Online', duration: 100 },
    EY: { name: 'EY Recruitment', role: 'Consulting', pattern: 'Aptitude, Domain, English', difficulty: 7, cutoff: 70, category: 'logical', sections: [{ name: 'Aptitude', weight: 40 }, { name: 'Domain', weight: 30 }, { name: 'English', weight: 30 }], trend: [65, 68, 70, 72, 74], website: 'https://www.ey.com/en_in/careers', logo: '🟡', color: '#ffe600', mode: 'Online', duration: 90 },
    PwC: { name: 'PwC Assessment', role: 'Consulting', pattern: 'Aptitude, Psychometric, English', difficulty: 7, cutoff: 70, category: 'logical', sections: [{ name: 'Aptitude', weight: 50 }, { name: 'Behavior', weight: 20 }, { name: 'English', weight: 30 }], trend: [65, 67, 70, 72, 75], website: 'https://www.pwc.in/careers.html', logo: '🟠', color: '#d04a02', mode: 'Online', duration: 100 },
    KPMG: { name: 'KPMG Hiring', role: 'Consulting', pattern: 'Aptitude, Case Study, English', difficulty: 7, cutoff: 72, category: 'logical', sections: [{ name: 'Aptitude', weight: 40 }, { name: 'Case', weight: 30 }, { name: 'English', weight: 30 }], trend: [68, 70, 72, 74, 76], website: 'https://home.kpmg/in/en/home/careers.html', logo: '🟦', color: '#00338d', mode: 'Online', duration: 110 },

    // SECTION 3: PRODUCT
    Flipkart: { name: 'Flipkart OA', role: 'Product / Tech', pattern: 'Competitive Coding, Logic', difficulty: 9, cutoff: 78, category: 'logical', sections: [{ name: 'Logic', weight: 30 }, { name: 'Coding', weight: 70 }], trend: [72, 75, 78, 80, 82], website: 'https://www.flipkartcareers.com', logo: '🛒', color: '#2874f0', mode: 'Online', duration: 120 },
    Zomato: { name: 'Zomato OA', role: 'Product / Tech', pattern: 'DSA, Logic, Verbal', difficulty: 8, cutoff: 74, category: 'logical', sections: [{ name: 'Logic', weight: 40 }, { name: 'DSA', weight: 60 }], trend: [70, 72, 74, 76, 78], website: 'https://www.zomato.com/careers', logo: '🍕', color: '#cb202d', mode: 'Online', duration: 100 },
    Swiggy: { name: 'Swiggy OA', role: 'Product / Tech', pattern: 'DSA, Logic', difficulty: 8, cutoff: 75, category: 'logical', sections: [{ name: 'Logic', weight: 30 }, { name: 'DSA', weight: 70 }], trend: [70, 72, 75, 78, 80], website: 'https://www.swiggy.com/careers', logo: '🥡', color: '#fc8019', mode: 'Online', duration: 120 },
    Paytm: { name: 'Paytm OA', role: 'Product / Fintech', pattern: 'DSA, Quant, Verbal', difficulty: 8, cutoff: 72, category: 'quantitative', sections: [{ name: 'Quant', weight: 40 }, { name: 'DSA', weight: 40 }, { name: 'Verbal', weight: 20 }], trend: [68, 70, 72, 74, 76], website: 'https://paytm.com/careers', logo: '💳', color: '#00baf2', mode: 'Online', duration: 100 },
    Razorpay: { name: 'Razorpay OA', role: 'Product / Fintech', pattern: 'DSA, Logic', difficulty: 9, cutoff: 78, category: 'logical', sections: [{ name: 'Logic', weight: 30 }, { name: 'DSA', weight: 70 }], trend: [75, 75, 78, 80, 82], website: 'https://razorpay.com/jobs', logo: '💳', color: '#0b72e7', mode: 'Online', duration: 120 },
    Zoho: { name: 'Zoho Recruitment', role: 'Product / Tech', pattern: 'Math, Logic, C Programming', difficulty: 7, cutoff: 65, category: 'quantitative', sections: [{ name: 'Math', weight: 40 }, { name: 'Logic', weight: 30 }, { name: 'Programming', weight: 30 }], trend: [60, 62, 65, 68, 70], website: 'https://www.zoho.com/careers', logo: '🎨', color: '#222222', mode: 'Offline/Online', duration: 180 },
    Freshworks: { name: 'Freshworks OA', role: 'Product / SaaS', pattern: 'DSA, Logic, Verbal', difficulty: 8, cutoff: 72, category: 'logical', sections: [{ name: 'Logic', weight: 30 }, { name: 'DSA', weight: 50 }, { name: 'Verbal', weight: 20 }], trend: [68, 70, 72, 75, 78], website: 'https://www.freshworks.com/careers', logo: '🍂', color: '#00a1ff', mode: 'Online', duration: 120 },
    PhonePe: { name: 'PhonePe OA', role: 'Product / Fintech', pattern: 'Advanced DSA, Logic', difficulty: 9, cutoff: 82, category: 'logical', sections: [{ name: 'Logic', weight: 20 }, { name: 'DSA', weight: 80 }], trend: [78, 80, 82, 85, 88], website: 'https://www.phonepe.com/careers', logo: '📱', color: '#6739b7', mode: 'Online', duration: 150 },
    Meesho: { name: 'Meesho OA', role: 'Product / E-comm', pattern: 'DSA, Quant, Verbal', difficulty: 8, cutoff: 74, category: 'logical', sections: [{ name: 'Aptitude', weight: 30 }, { name: 'DSA', weight: 50 }, { name: 'Verbal', weight: 20 }], trend: [70, 72, 74, 78, 80], website: 'https://meesho.io/jobs', logo: '🛍️', color: '#f43397', mode: 'Online', duration: 120 },
    CRED: { name: 'CRED OA', role: 'Product / Fintech', pattern: 'DSA, Logic, System Design', difficulty: 10, cutoff: 80, category: 'logical', sections: [{ name: 'Logic', weight: 30 }, { name: 'DSA/Systems', weight: 70 }], trend: [75, 78, 80, 82, 85], website: 'https://cred.club/careers', logo: '💳', color: '#000000', mode: 'Online', duration: 150 },
    Atlassian: { name: 'Atlassian OA', role: 'Product / Tech', pattern: 'Advanced DSA, Logic', difficulty: 10, cutoff: 85, category: 'logical', sections: [{ name: 'DSA', weight: 80 }, { name: 'Culture/Logic', weight: 20 }], trend: [80, 82, 85, 88, 92], website: 'https://www.atlassian.com/company/careers', logo: '🌀', color: '#0052cc', mode: 'Online', duration: 120 },
    Uber: { name: 'Uber OA', role: 'Product / Tech', pattern: 'Math, DSA, Graph', difficulty: 10, cutoff: 82, category: 'quantitative', sections: [{ name: 'Math', weight: 30 }, { name: 'DSA', weight: 70 }], trend: [78, 80, 82, 85, 88], website: 'https://www.uber.com/careers', logo: '🚗', color: '#000000', mode: 'Online', duration: 150 },

    // SECTION 4: CORE
    'L&T': { name: 'L&T GET', role: 'Core Engineering', pattern: 'Aptitude, Core Technical', difficulty: 7, cutoff: 110, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 40 }, { name: 'Technical', weight: 60 }], trend: [100, 105, 110, 115, 120], website: 'https://www.larsentoubro.com/corporate/careers/', logo: '🏗️', color: '#ffc107', mode: 'Online', duration: 120 },
    Bosch: { name: 'Bosch Hiring', role: 'Core Engineering', pattern: 'Aptitude, Core, Verbal', difficulty: 7, cutoff: 68, category: 'quantitative', sections: [{ name: 'Math', weight: 30 }, { name: 'Logic', weight: 30 }, { name: 'Technical', weight: 40 }], trend: [62, 65, 68, 70, 72], website: 'https://www.bosch.in/careers/', logo: '🔩', color: '#ff0000', mode: 'Online', duration: 90 },
    'Tata Steel': { name: 'Tata Steel AET', role: 'Core Engineering', pattern: 'Aptitude, Core Technical', difficulty: 7, cutoff: 70, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 40 }, { name: 'Technical', weight: 60 }], trend: [65, 68, 70, 72, 75], website: 'https://www.tatasteel.com/careers/', logo: '🧱', color: '#004b8d', mode: 'Online', duration: 120 },
    Mahindra: { name: 'Mahindra GET', role: 'Core Engineering', pattern: 'Aptitude, Mechanical/Tech', difficulty: 6, cutoff: 65, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 50 }, { name: 'Tech', weight: 50 }], trend: [60, 62, 65, 68, 70], website: 'https://www.mahindra.com/careers', logo: '🚜', color: '#ff0000', mode: 'Online', duration: 90 },
    Siemens: { name: 'Siemens Hiring', role: 'Core Engineering', pattern: 'Quant, Logic, Technical', difficulty: 8, cutoff: 72, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 40 }, { name: 'Technical', weight: 60 }], trend: [68, 70, 72, 75, 78], website: 'https://new.siemens.com/in/en/company/jobs.html', logo: '⚡', color: '#008b8b', mode: 'Online', duration: 100 },
    ABB: { name: 'ABB GET', role: 'Core Engineering', pattern: 'Aptitude, Electrical/Tech', difficulty: 7, cutoff: 70, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 40 }, { name: 'Technical', weight: 60 }], trend: [65, 68, 70, 72, 74], website: 'https://global.abb/group/en/careers', logo: '🔴', color: '#ff0000', mode: 'Online', duration: 100 },
    'Schneider Electric': { name: 'Schneider Hiring', role: 'Core Engineering', pattern: 'Aptitude, Tech, Verbal', difficulty: 7, cutoff: 68, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 50 }, { name: 'Tech', weight: 50 }], trend: [62, 65, 68, 70, 72], website: 'https://www.se.com/in/en/about-us/careers/', logo: '🟢', color: '#3dcd58', mode: 'Online', duration: 90 },
    BHEL: { name: 'BHEL ET Recruitment', role: 'PSU / Core', pattern: 'Aptitude, Core Technical', difficulty: 8, cutoff: 135, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 30 }, { name: 'Technical', weight: 70 }], trend: [125, 130, 135, 138, 142], website: 'https://careers.bhel.in', logo: '🏭', color: '#0058a3', mode: 'Offline', duration: 150 },
    ISRO: { name: 'ISRO Scientist-C', role: 'PSU / Space', pattern: 'High Math, Core Science', difficulty: 10, cutoff: 160, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 20 }, { name: 'Advanced Science', weight: 80 }], trend: [150, 155, 160, 162, 165], website: 'https://www.isro.gov.in/careers', logo: '🚀', color: '#ff9933', mode: 'Offline', duration: 120 },
    DRDO: { name: 'DRDO Scientist-B', role: 'PSU / Defence', pattern: 'Core engineering, Math', difficulty: 10, cutoff: 155, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 20 }, { name: 'Core', weight: 80 }], trend: [145, 150, 155, 158, 160], website: 'https://www.drdo.gov.in/careers', logo: '🛡️', color: '#000080', mode: 'Offline', duration: 180 },

    // SECTION 5: BANKING
    'Bank PO': { name: 'Bank PO Mock', role: 'Banking / Finance', pattern: 'Quant, Logical, English', difficulty: 8, cutoff: 60, category: 'quantitative', sections: [{ name: 'Quant', weight: 35 }, { name: 'Reasoning', weight: 35 }, { name: 'English', weight: 30 }], trend: [55, 58, 60, 62, 65], website: '#', logo: '🏦', color: '#0075eb', mode: 'Online', duration: 60 },
    'SBI Clerk': { name: 'SBI Clerk Prelims', role: 'Banking / Finance', pattern: 'Aptitude, Reasoning', difficulty: 6, cutoff: 75, category: 'quantitative', sections: [{ name: 'Quant', weight: 40 }, { name: 'Reasoning', weight: 35 }, { name: 'Verbal', weight: 25 }], trend: [70, 72, 75, 78, 80], website: 'https://sbi.co.in/careers', logo: '🏦', color: '#2800d7', mode: 'Online', duration: 60 },
    'RBI Grade B': { name: 'RBI Grade B Phase-I', role: 'Banking / Finance', pattern: 'Quant, Logic, GA', difficulty: 9, cutoff: 80, category: 'quantitative', sections: [{ name: 'GA', weight: 40 }, { name: 'Quant', weight: 20 }, { name: 'Logic', weight: 20 }, { name: 'Verbal', weight: 20 }], trend: [70, 75, 80, 82, 85], website: 'https://www.rbi.org.in', logo: '🏛️', color: '#442b0c', mode: 'Online', duration: 120 },
    'IBPS PO': { name: 'IBPS PO Prelims', role: 'Banking / Finance', pattern: 'Quant, Reasoning, Verbal', difficulty: 8, cutoff: 55, category: 'quantitative', sections: [{ name: 'Quant', weight: 35 }, { name: 'Reasoning', weight: 35 }, { name: 'English', weight: 30 }], trend: [50, 52, 55, 58, 60], website: 'https://www.ibps.in', logo: '📑', color: '#28a745', mode: 'Online', duration: 60 },
    SEBI: { name: 'SEBI Grade A', role: 'Banking / Finance', pattern: 'Quant, Commerce, English', difficulty: 9, cutoff: 70, category: 'quantitative', sections: [{ name: 'Quant', weight: 25 }, { name: 'Reasoning', weight: 25 }, { name: 'Paper 2', weight: 50 }], trend: [65, 68, 70, 72, 75], website: 'https://www.sebi.gov.in', logo: '📉', color: '#00529b', mode: 'Online', duration: 120 },
    NABARD: { name: 'NABARD Grade A', role: 'Banking / Finance', pattern: 'Aptitude, Agriculture', difficulty: 8, cutoff: 120, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 60 }, { name: 'ARD/ESI', weight: 40 }], trend: [110, 115, 120, 125, 128], website: 'https://www.nabard.org', logo: '🌾', color: '#2e7d32', mode: 'Online', duration: 120 },
    'HDFC Bank': { name: 'HDFC Hiring', role: 'Banking', pattern: 'Quant, Logic, English', difficulty: 6, cutoff: 65, category: 'quantitative', sections: [{ name: 'Quant', weight: 35 }, { name: 'Reasoning', weight: 35 }, { name: 'English', weight: 30 }], trend: [60, 62, 65, 68, 70], website: 'https://www.hdfcbank.com/personal/about-us/careers', logo: '🏙️', color: '#004c8f', mode: 'Online', duration: 90 },
    'ICICI Bank': { name: 'ICICI PO', role: 'Banking', pattern: 'Quant, Logic, Verbal', difficulty: 6, cutoff: 65, category: 'quantitative', sections: [{ name: 'Quant', weight: 35 }, { name: 'Reasoning', weight: 35 }, { name: 'English', weight: 30 }], trend: [60, 62, 65, 65, 67], website: 'https://www.icicicareers.com', logo: '🏙️', color: '#f58220', mode: 'Online', duration: 90 },

    // SECTION 6: GOVT
    'SSC CGL': { name: 'SSC CGL Tier-1', role: 'Government', pattern: 'Math, English, GS, Reasoning', difficulty: 8, cutoff: 140, category: 'quantitative', sections: [{ name: 'Math', weight: 25 }, { name: 'Reasoning', weight: 25 }, { name: 'English', weight: 25 }, { name: 'GS', weight: 25 }], trend: [130, 135, 140, 142, 145], website: 'https://ssc.nic.in', logo: '📋', color: '#1a56db', mode: 'Offline/Online', duration: 60 },
    'SSC CHSL': { name: 'SSC CHSL Tier-1', role: 'Government', pattern: 'Math, Reasoning, English, GA', difficulty: 7, cutoff: 155, category: 'quantitative', sections: [{ name: 'Math', weight: 25 }, { name: 'Reasoning', weight: 25 }, { name: 'English', weight: 25 }, { name: 'GA', weight: 25 }], trend: [145, 150, 155, 158, 162], website: 'https://ssc.nic.in', logo: '📋', color: '#1d4ed8', mode: 'Online', duration: 60 },
    'Railway RRB': { name: 'RRB NTPC CBT-1', role: 'Government / Railways', pattern: 'Math, Reason, GA', difficulty: 6, cutoff: 72, category: 'quantitative', sections: [{ name: 'Math', weight: 30 }, { name: 'Reasoning', weight: 30 }, { name: 'GA', weight: 40 }], trend: [68, 70, 72, 75, 78], website: 'http://www.rrbcdg.gov.in', logo: '🚂', color: '#de1e1e', mode: 'Online', duration: 90 },
    'UPSC CSAT': { name: 'UPSC Civil Services Prelims-II', role: 'Government / IAS', pattern: 'Math, Logic, Comp', difficulty: 9, cutoff: 67, category: 'logical', sections: [{ name: 'Aptitude', weight: 70 }, { name: 'Comprehension', weight: 30 }], trend: [67, 67, 67, 67, 67], website: 'https://www.upsc.gov.in', logo: '🏛️', color: '#9e1c1c', mode: 'Offline', duration: 120 },
    TNPSC: { name: 'TNPSC Group 4', role: 'Government / State', pattern: 'Aptitude, Tamil/Eng, GS', difficulty: 7, cutoff: 170, category: 'quantitative', sections: [{ name: 'Math', weight: 25 }, { name: 'GS', weight: 75 }], trend: [160, 165, 170, 172, 175], website: 'https://www.tnpsc.gov.in', logo: '🏛️', color: '#00a65a', mode: 'Offline', duration: 180 },
    'State PSC': { name: 'State PSC Prelims', role: 'Government / State', pattern: 'Aptitude, GS', difficulty: 8, cutoff: 100, category: 'quantitative', sections: [{ name: 'Aptitude', weight: 50 }, { name: 'GS', weight: 50 }], trend: [90, 95, 100, 105, 110], website: '#', logo: '🏛️', color: '#8b4513', mode: 'Offline', duration: 120 },
    'Defence Exams': { name: 'AFCAT / CDS', role: 'Government / Defence', pattern: 'Quant, Reason, English, GA', difficulty: 8, cutoff: 155, category: 'quantitative', sections: [{ name: 'Quant', weight: 25 }, { name: 'Reason', weight: 25 }, { name: 'English', weight: 25 }, { name: 'GA', weight: 25 }], trend: [145, 150, 155, 160, 165], website: 'https://careerindianairforce.cdac.in', logo: '🛡️', color: '#314766', mode: 'Online/Offline', duration: 120 },
    'LIC AAO': { name: 'LIC AAO Prelims', role: 'Government / Insurance', pattern: 'Quant, Logic, English', difficulty: 8, cutoff: 58, category: 'quantitative', sections: [{ name: 'Quant', weight: 35 }, { name: 'Reasoning', weight: 35 }, { name: 'English', weight: 30 }], trend: [52, 55, 58, 60, 62], website: 'https://licindia.in/Bottom-Links/Careers', logo: '🏛️', color: '#004a8c', mode: 'Online', duration: 60 },
};

export const MOCK_PATTERNS = {
    // 1. Level-Based Mocks
    beginner: { label: 'Beginner Level Mock', questions: 40, duration: 40, dist: { quantitative: 15, logical: 15, verbal: 10 }, difficulty: { Easy: 0.6, Medium: 0.3, Hard: 0.1 } },
    intermediate: { label: 'Intermediate Level Mock', questions: 60, duration: 60, dist: { quantitative: 20, logical: 20, verbal: 10, dataInterpretation: 10 }, difficulty: { Easy: 0.3, Medium: 0.5, Hard: 0.2 } },
    advanced: { label: 'Advanced Level Mock', questions: 75, duration: 75, dist: { quantitative: 25, logical: 20, verbal: 15, dataInterpretation: 10, advanced: 5 }, difficulty: { Easy: 0.2, Medium: 0.4, Hard: 0.4 } },

    // 2. Specialized Mocks
    adaptive: { label: 'Adaptive AI Mock', questions: 50, duration: 60, isAdaptive: true },
    mega: { label: 'Mega 100 Grand Test', questions: 100, duration: 120, dist: { quantitative: 30, logical: 30, verbal: 20, dataInterpretation: 10, advanced: 10 }, difficulty: 'Mixed' },

    // 3. Company Patterns (Dynamic Mappings)
    TCS: { label: 'TCS NQT Pattern', questions: 80, duration: 120, dist: { quantitative: 30, verbal: 24, logical: 26 }, marking: { correct: 1, wrong: 0 } },
    Amazon: { label: 'Amazon SDE Pattern', questions: 50, duration: 90, dist: { advanced: 20, logical: 15, quantitative: 15 }, marking: { correct: 2, wrong: -0.5 } },
    Microsoft: { label: 'Microsoft OA Pattern', questions: 40, duration: 60, dist: { advanced: 25, logical: 15 }, marking: { correct: 4, wrong: -1 } },

    // 4. Govt Patterns
    'SSC CGL': { label: 'SSC CGL Tier-1', questions: 100, duration: 60, dist: { quantitative: 25, logical: 25, verbal: 25, dataInterpretation: 25 }, marking: { correct: 2, wrong: -0.5 } },
    'Bank PO': { label: 'IBPS Bank PO Pattern', questions: 100, duration: 60, dist: { quantitative: 35, logical: 35, verbal: 30 }, marking: { correct: 1, wrong: -0.25 } }
};

export const PIPELINE_STEPS = [
    { id: 'learn', label: 'Learn', icon: '📚', desc: 'Study concepts', tab: 'resources' },
    { id: 'practice', label: 'Practice', icon: '✏️', desc: 'Topic-wise sets', tab: 'practice' },
    { id: 'pattern', label: 'Company Pattern', icon: '🏢', desc: 'Simulate real exams', tab: 'company' },
    { id: 'mock', label: 'Full Mock', icon: '📋', desc: 'Timed full test', tab: 'practice' },
    { id: 'analytics', label: 'Analytics', icon: '📊', desc: 'AI analysis', tab: 'progress' },
];



export const BADGES = [
    { id: 'first_step', label: 'First Step', icon: '🚀', desc: 'Complete your first test', condition: p => p.attempts.length >= 1 },
    { id: 'quant_master', label: 'Quant Master', icon: '📐', desc: 'Score 80%+ in Quant (3 times)', condition: p => p.attempts.filter(a => a.category === 'quantitative' && a.pct >= 80).length >= 1 },
    { id: 'streak_3', label: 'Streak Star', icon: '🔥', desc: '3-day practice streak', condition: p => (p.streak || 0) >= 3 },
];

export const RESOURCES = {
    quantitative: [
        { title: 'Arithmetic Masterclass', type: 'video', link: '#' },
        { title: 'Formula Book PDF', type: 'pdf', link: '#' },
        { title: 'Quant Shortcut Hacks', type: 'shortcut', link: '#' },
        { title: 'Aptitude Formula Sheet', type: 'formula', link: '#' },
        { title: 'Quant Topic Mock Set', type: 'mock', link: '#' },
        { title: 'TCS/Infosys Quant PYQs', type: 'pyq', link: '#' }
    ],
    logical: [
        { title: 'Puzzles Deep Dive', type: 'video', link: '#' },
        { title: 'Logic Pattern Guide', type: 'pdf', link: '#' },
        { title: 'Seating Arrangement Tricks', type: 'shortcut', link: '#' },
        { title: 'Logic Symbol Sheet', type: 'formula', link: '#' },
        { title: 'Reasoning sectional Mock', type: 'mock', link: '#' },
        { title: 'Amazon/Google Logic PYQs', type: 'pyq', link: '#' }
    ],
    verbal: [
        { title: 'Grammar Bootcamp', type: 'video', link: '#' },
        { title: 'Vocabulary Builder PDF', type: 'pdf', link: '#' },
        { title: 'Reading Comprehension Tips', type: 'shortcut', link: '#' },
        { title: 'Tense & Prep Chart', type: 'formula', link: '#' },
        { title: 'Verbal Proficiency Mock', type: 'mock', link: '#' },
        { title: 'SSC/Bank Verbal PYQs', type: 'pyq', link: '#' }
    ],
    dataInterpretation: [
        { title: 'Chart Analysis Pro', type: 'video', link: '#' },
        { title: 'DI Caselets Guide', type: 'pdf', link: '#' },
        { title: 'Speed Calculation in DI', type: 'shortcut', link: '#' },
        { title: 'Percentage Change Sheet', type: 'formula', link: '#' },
        { title: 'Full DI Sectional Mock', type: 'mock', link: '#' },
        { title: 'Banking (SBI/IBPS) DI PYQs', type: 'pyq', link: '#' }
    ],
};

export const WEEKLY_CHALLENGE = { title: 'Speed Demon Week', desc: 'Complete 5 sets with 75%+ accuracy this week', target: 5, reward: '⚡ Speed King Badge unlocked' };
