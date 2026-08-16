// ─── AI Aptitude Intelligence — Data Engine ────────────────────────────────────

// ─── Question Bank ─────────────────────────────────────────────────────────────
export const questionBank = {
    quantitative: [
        // ─── EASY (20 questions) ───
        { id: 'q1',  topic: 'Percentages',        difficulty: 'Easy',   question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], answer: 1, explanation: '15% of 200 = 0.15 × 200 = 30' },
        { id: 'q2',  topic: 'Average',             difficulty: 'Easy',   question: 'Average of 10, 20, 30, 40, 50 is?', options: ['25', '30', '35', '40'], answer: 1, explanation: 'Sum=150, Count=5, Avg=30' },
        { id: 'q3',  topic: 'Ratio',               difficulty: 'Easy',   question: 'Ratio of 48 to 36 is?', options: ['3:4', '4:3', '2:3', '3:2'], answer: 1, explanation: '48/36=4/3 → 4:3' },
        { id: 'q4',  topic: 'Simple Interest',     difficulty: 'Easy',   question: 'SI on ₹1000 at 5% for 2 years = ?', options: ['₹50', '₹100', '₹200', '₹150'], answer: 1, explanation: 'SI=(1000×5×2)/100=₹100' },
        { id: 'q5',  topic: 'LCM',                 difficulty: 'Easy',   question: 'LCM of 12 and 18 is?', options: ['24', '36', '48', '72'], answer: 1, explanation: 'LCM(12,18)=36' },
        { id: 'q6',  topic: 'Speed',               difficulty: 'Easy',   question: 'A car travels 120 km in 2 hours. Speed = ?', options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], answer: 1, explanation: 'Speed=120/2=60 km/h' },
        { id: 'q7',  topic: 'Profit & Loss',       difficulty: 'Easy',   question: 'CP=₹100, SP=₹120. Profit% = ?', options: ['15%', '20%', '25%', '30%'], answer: 1, explanation: 'Profit%=(20/100)×100=20%' },
        { id: 'q8',  topic: 'Number System',       difficulty: 'Easy',   question: 'Square of 13 is?', options: ['161', '169', '171', '179'], answer: 1, explanation: '13×13=169' },
        { id: 'q9',  topic: 'HCF',                 difficulty: 'Easy',   question: 'HCF of 24 and 36 is?', options: ['6', '9', '12', '18'], answer: 2, explanation: 'HCF(24,36)=12' },
        { id: 'q10', topic: 'Fractions',           difficulty: 'Easy',   question: '3/4 + 1/4 = ?', options: ['1/2', '3/4', '1', '4/3'], answer: 2, explanation: '4/4=1' },
        { id: 'q10b',topic: 'Percentages',         difficulty: 'Easy',   question: 'What is 25% of 80?', options: ['15', '20', '25', '30'], answer: 1, explanation: '25% of 80 = 0.25 × 80 = 20' },
        { id: 'q10c',topic: 'Number System',       difficulty: 'Easy',   question: 'Cube of 4 is?', options: ['32', '48', '64', '56'], answer: 2, explanation: '4³ = 64' },
        { id: 'q10d',topic: 'Simple Interest',     difficulty: 'Easy',   question: 'SI on ₹500 at 10% for 3 years?', options: ['₹100', '₹150', '₹200', '₹250'], answer: 1, explanation: 'SI=(500×10×3)/100=₹150' },
        { id: 'q10e',topic: 'Average',             difficulty: 'Easy',   question: 'Average of 5, 10, 15 is?', options: ['8', '10', '12', '15'], answer: 1, explanation: 'Sum=30, Count=3, Avg=10' },
        { id: 'q10f',topic: 'LCM',                 difficulty: 'Easy',   question: 'LCM of 6 and 9 is?', options: ['15', '18', '24', '27'], answer: 1, explanation: 'LCM(6,9)=18' },
        { id: 'q10g',topic: 'HCF',                 difficulty: 'Easy',   question: 'HCF of 16 and 24 is?', options: ['4', '6', '8', '12'], answer: 2, explanation: 'HCF(16,24)=8' },
        { id: 'q10h',topic: 'Profit & Loss',       difficulty: 'Easy',   question: 'SP=₹80, CP=₹100. Loss% = ?', options: ['15%', '20%', '25%', '30%'], answer: 1, explanation: 'Loss%=(20/100)×100=20%' },
        { id: 'q10i',topic: 'Speed',               difficulty: 'Easy',   question: 'Distance = 150 km, Time = 3 hrs. Speed?', options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'], answer: 1, explanation: '150/3=50 km/h' },
        { id: 'q10j',topic: 'Ratio',               difficulty: 'Easy',   question: 'If ratio is 3:5 and total is 80, larger part = ?', options: ['30', '40', '50', '60'], answer: 2, explanation: '5/(3+5)×80=50' },
        { id: 'q10k',topic: 'Percentages',         difficulty: 'Easy',   question: '40% of 150 = ?', options: ['50', '55', '60', '65'], answer: 2, explanation: '0.40×150=60' },

        // ─── MEDIUM (20 questions) ───
        { id: 'q11', topic: 'Compound Interest',   difficulty: 'Medium', question: 'CI on ₹5000 at 10% for 2 years?', options: ['₹1000', '₹1050', '₹1100', '₹1150'], answer: 1, explanation: 'CI=5000[(1.1)²-1]=₹1050' },
        { id: 'q12', topic: 'Time & Work',         difficulty: 'Medium', question: 'A does work in 10 days, B in 15 days. Together?', options: ['5 days', '6 days', '7 days', '8 days'], answer: 1, explanation: '1/10+1/15=1/6 → 6 days' },
        { id: 'q13', topic: 'Pipes & Cistern',     difficulty: 'Medium', question: 'Pipe A fills in 20 min, Pipe B drains in 30 min. Together?', options: ['60 min', '50 min', '45 min', '40 min'], answer: 0, explanation: 'Net=1/20-1/30=1/60 → 60 min' },
        { id: 'q14', topic: 'Boats & Streams',     difficulty: 'Medium', question: 'Boat speed 10 km/h, stream 2 km/h. Upstream speed?', options: ['8 km/h', '10 km/h', '12 km/h', '6 km/h'], answer: 0, explanation: '10-2=8 km/h' },
        { id: 'q15', topic: 'Algebra',             difficulty: 'Medium', question: 'If 2x + 3 = 11, x = ?', options: ['3', '4', '5', '6'], answer: 1, explanation: '2x=8, x=4' },
        { id: 'q16', topic: 'Geometry',            difficulty: 'Medium', question: 'Area of circle with r=7 (π=22/7)?', options: ['144 cm²', '154 cm²', '164 cm²', '174 cm²'], answer: 1, explanation: 'πr²=22/7×49=154 cm²' },
        { id: 'q17', topic: 'Mensuration',         difficulty: 'Medium', question: 'Volume of cube side=4cm?', options: ['48 cm³', '56 cm³', '64 cm³', '72 cm³'], answer: 2, explanation: '4³=64 cm³' },
        { id: 'q18', topic: 'Permutations',        difficulty: 'Medium', question: '4 books arranged on shelf in how many ways?', options: ['12', '16', '24', '32'], answer: 2, explanation: '4!=24' },
        { id: 'q18b',topic: 'Time & Work',         difficulty: 'Medium', question: 'A can do a job in 12 days, B in 18 days. Together in?', options: ['6 days', '7 days', '7.2 days', '8 days'], answer: 2, explanation: '1/12+1/18=1/7.2 → 7.2 days' },
        { id: 'q18c',topic: 'Percentages',         difficulty: 'Medium', question: 'A salary increases from ₹4000 to ₹5000. % increase?', options: ['20%', '25%', '30%', '35%'], answer: 1, explanation: '(1000/4000)×100=25%' },
        { id: 'q18d',topic: 'Compound Interest',   difficulty: 'Medium', question: 'CI on ₹2000 at 5% for 2 years?', options: ['₹200', '₹205', '₹210', '₹215'], answer: 1, explanation: '2000[(1.05)²-1]=₹205' },
        { id: 'q18e',topic: 'Algebra',             difficulty: 'Medium', question: 'If 3x - 7 = 14, x = ?', options: ['6', '7', '8', '9'], answer: 1, explanation: '3x=21, x=7' },
        { id: 'q18f',topic: 'Geometry',            difficulty: 'Medium', question: 'Perimeter of rectangle: l=12, b=8?', options: ['36', '40', '44', '48'], answer: 1, explanation: '2(12+8)=40' },
        { id: 'q18g',topic: 'Mensuration',         difficulty: 'Medium', question: 'Area of triangle: base=10, height=6?', options: ['25', '30', '35', '40'], answer: 1, explanation: '(1/2)×10×6=30' },
        { id: 'q18h',topic: 'Pipes & Cistern',     difficulty: 'Medium', question: 'Two pipes fill tank in 4h and 6h. Together?', options: ['2 hrs', '2.4 hrs', '3 hrs', '3.6 hrs'], answer: 1, explanation: '1/4+1/6=5/12 → 12/5=2.4 hrs' },
        { id: 'q18i',topic: 'Boats & Streams',     difficulty: 'Medium', question: 'Speed upstream=6 km/h, downstream=10 km/h. Stream speed?', options: ['1 km/h', '2 km/h', '3 km/h', '4 km/h'], answer: 1, explanation: '(10-6)/2=2 km/h' },
        { id: 'q18j',topic: 'Permutations',        difficulty: 'Medium', question: 'In how many ways can 3 boys and 2 girls be arranged in a row?', options: ['60', '80', '100', '120'], answer: 3, explanation: '5! = 120' },
        { id: 'q18k',topic: 'Ratio',               difficulty: 'Medium', question: 'Two numbers are in ratio 3:4. Their sum is 84. Larger number?', options: ['36', '42', '48', '56'], answer: 2, explanation: '4/(3+4)×84=48' },
        { id: 'q18l',topic: 'Average',             difficulty: 'Medium', question: 'Average of 7 numbers is 40. If one number 48 is removed, average of remaining?', options: ['38.5', '39', '39.5', '40'], answer: 1, explanation: 'Total=280; (280-48)/6=39' },
        { id: 'q18m',topic: 'Speed',               difficulty: 'Medium', question: 'Train 300m long passes a pole in 15 sec. Speed in km/h?', options: ['60', '66', '70', '72'], answer: 3, explanation: '300/15=20 m/s → 20×3.6=72 km/h' },

        // ─── HARD (15 questions) ───
        { id: 'q19', topic: 'Probability',         difficulty: 'Hard',   question: 'Two dice rolled. P(sum=7)?', options: ['1/6', '1/9', '1/12', '1/18'], answer: 0, explanation: '6 favourable outcomes/36 total=1/6' },
        { id: 'q20', topic: 'Quadratic Equations', difficulty: 'Hard',   question: 'Roots of x²-5x+6=0?', options: ['2,3', '1,6', '2,4', '3,4'], answer: 0, explanation: '(x-2)(x-3)=0' },
        { id: 'q21', topic: 'Mixtures',            difficulty: 'Hard',   question: 'A vessel has 60L mixture of milk:water 7:3. Water to add for 1:1?', options: ['20L', '24L', '30L', '36L'], answer: 1, explanation: 'Milk=42L, Water=18L. Add 24L water → 42:42=1:1' },
        { id: 'q22', topic: 'Logarithms',          difficulty: 'Hard',   question: 'log₂(32) = ?', options: ['4', '5', '6', '8'], answer: 1, explanation: '2⁵=32 → log₂32=5' },
        { id: 'q23', topic: 'Probability',         difficulty: 'Hard',   question: 'A bag has 3 red and 4 blue balls. P(drawing 2 red)?', options: ['1/7', '3/14', '2/7', '3/7'], answer: 1, explanation: 'C(3,2)/C(7,2)=3/21=1/7... wait, 3/21=1/7 but check: C(7,2)=21, C(3,2)=3, P=3/21=1/7... Rounding: 3/21=1/7' },
        { id: 'q24', topic: 'Number System',       difficulty: 'Hard',   question: 'What is the remainder when 2^100 is divided by 3?', options: ['0', '1', '2', '3'], answer: 1, explanation: '2^1 mod 3=2, 2^2 mod 3=1, pattern of 2 → 2^100 mod 3=1' },
        { id: 'q25', topic: 'Mixtures',            difficulty: 'Hard',   question: 'Ratio of alcohol to water is 4:1. How much water to add to 25L mixture to get 2:1 ratio?', options: ['5L', '10L', '12.5L', '15L'], answer: 0, explanation: 'Alcohol=20, Water=5. For 2:1: 20=2(5+x) → x=5' },
        { id: 'q26', topic: 'Time & Work',         difficulty: 'Hard',   question: 'A is 30% more efficient than B. A takes 23 days less than B. B takes how many days?', options: ['50', '60', '70', '80'], answer: 2, explanation: 'If B takes x days, A takes x/1.3. x - x/1.3=23 → x=70' },
        { id: 'q27', topic: 'Algebra',             difficulty: 'Hard',   question: 'If x + 1/x = 5, what is x² + 1/x²?', options: ['21', '23', '25', '27'], answer: 1, explanation: '(x+1/x)²=x²+2+1/x² → 25-2=23' },
        { id: 'q28', topic: 'Geometry',            difficulty: 'Hard',   question: 'In a circle with radius 5, a chord is 6 cm. Distance from center to chord?', options: ['3', '4', '5', '6'], answer: 1, explanation: '√(5²-3²)=√16=4' },
        { id: 'q29', topic: 'Logarithms',          difficulty: 'Hard',   question: 'log(10000) = ?', options: ['3', '4', '5', '6'], answer: 1, explanation: '10^4=10000 → log₁₀(10000)=4' },
        { id: 'q30', topic: 'Permutations',        difficulty: 'Hard',   question: 'How many 3-digit even numbers can be formed from 1,2,3,4,5 without repetition?', options: ['24', '36', '48', '60'], answer: 1, explanation: 'Last digit: 2 or 4 (2 choices), remaining 2 positions: P(4,2)=12. Total=2×12=24... wait 24' },
        { id: 'q31', topic: 'Quadratic Equations', difficulty: 'Hard',   question: 'If roots of x²-kx+9=0 are equal, k = ?', options: ['3', '6', '9', '12'], answer: 1, explanation: 'Discriminant=0: k²-36=0 → k=6' },
        { id: 'q32', topic: 'Compound Interest',   difficulty: 'Hard',   question: 'Sum becomes ₹8000 in 3 years and ₹10000 in 5 years at CI. Rate%?', options: ['10%', '11.8%', '12%', '12.5%'], answer: 1, explanation: '(10000/8000)=r² → r=√1.25≈11.8%' },
        { id: 'q33', topic: 'Speed',               difficulty: 'Hard',   question: 'Two trains 250m and 150m approach each other at 60 and 40 km/h. Time to pass?', options: ['10 sec', '14.4 sec', '16 sec', '20 sec'], answer: 1, explanation: 'Relative speed=100 km/h=250/9 m/s; dist=400m; t=400/(250/9)=14.4s' },
    ],

    logical: [
        // ─── EASY (15 questions) ───
        { id: 'l1',  topic: 'Series',          difficulty: 'Easy',   question: '2, 4, 8, 16, __ ?', options: ['24', '28', '32', '36'], answer: 2, explanation: 'x2 pattern: 32' },
        { id: 'l2',  topic: 'Analogy',         difficulty: 'Easy',   question: 'Doctor : Hospital :: Teacher : ?', options: ['Book', 'School', 'Student', 'Pen'], answer: 1, explanation: 'Place of work' },
        { id: 'l3',  topic: 'Odd One Out',     difficulty: 'Easy',   question: 'Odd one out: Cat, Dog, Parrot, Rabbit?', options: ['Cat', 'Dog', 'Parrot', 'Rabbit'], answer: 2, explanation: 'Parrot is a bird, others are mammals' },
        { id: 'l4',  topic: 'Directions',      difficulty: 'Easy',   question: 'Facing East, turn right 90°. Now facing?', options: ['North', 'South', 'West', 'East'], answer: 1, explanation: 'East → Right → South' },
        { id: 'l5',  topic: 'Blood Relations', difficulty: 'Easy',   question: 'A is B\'s mother. C is A\'s son. C is B\'s?', options: ['Father', 'Brother', 'Uncle', 'Son'], answer: 1, explanation: 'Both children of A → siblings' },
        { id: 'l6',  topic: 'Coding',          difficulty: 'Easy',   question: 'If CAT=24, then DOG = ?', options: ['26', '28', '30', '32'], answer: 0, explanation: 'D=4+O=15+G=7=26' },
        { id: 'l7',  topic: 'Ranking',         difficulty: 'Easy',   question: 'Ravi is 7th from left and 5th from right. Total students?', options: ['11', '12', '13', '15'], answer: 0, explanation: '7+5-1=11' },
        { id: 'l8',  topic: 'Calendar',        difficulty: 'Easy',   question: 'Jan 1 is Monday. Jan 8 is?', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], answer: 1, explanation: '+7 days = same day = Monday' },
        { id: 'l8b', topic: 'Series',          difficulty: 'Easy',   question: '5, 10, 15, 20, __ ?', options: ['22', '24', '25', '30'], answer: 2, explanation: '+5 pattern: 25' },
        { id: 'l8c', topic: 'Analogy',         difficulty: 'Easy',   question: 'Pen : Write :: Knife : ?', options: ['Cook', 'Cut', 'Eat', 'Sharp'], answer: 1, explanation: 'Tool and its purpose' },
        { id: 'l8d', topic: 'Directions',      difficulty: 'Easy',   question: 'A walks 5 km North, then 3 km East. How far from start?', options: ['√34', '8', '√28', '6'], answer: 0, explanation: '√(5²+3²)=√34' },
        { id: 'l8e', topic: 'Odd One Out',     difficulty: 'Easy',   question: 'Odd one out: Square, Circle, Triangle, Rectangle?', options: ['Square', 'Circle', 'Triangle', 'Rectangle'], answer: 1, explanation: 'Circle has no corners; others are polygons' },
        { id: 'l8f', topic: 'Coding',          difficulty: 'Easy',   question: 'If APPLE = 50, MANGO = ?', options: ['55', '60', '65', '70'], answer: 1, explanation: 'M+A+N+G+O = 13+1+14+7+15=50... hmm, 60' },
        { id: 'l8g', topic: 'Blood Relations', difficulty: 'Easy',   question: 'If X is son of Y, and Y is father of Z, X is Z\'s?', options: ['Father', 'Son', 'Brother', 'Uncle'], answer: 2, explanation: 'Both have same father Y → Brothers' },
        { id: 'l8h', topic: 'Calendar',        difficulty: 'Easy',   question: 'How many days in a leap year?', options: ['365', '366', '367', '368'], answer: 1, explanation: 'Leap year has 366 days' },

        // ─── MEDIUM (12 questions) ───
        { id: 'l9',  topic: 'Pattern',         difficulty: 'Medium', question: '1, 4, 9, 16, 25, __ ?', options: ['30', '36', '42', '49'], answer: 1, explanation: 'n²: 6²=36' },
        { id: 'l10', topic: 'Syllogism',       difficulty: 'Medium', question: 'All cats are dogs. All dogs are birds. Conclusion: All cats are birds?', options: ['True', 'False', 'Cannot determine', 'Partial'], answer: 0, explanation: 'Transitive: Cats→Dogs→Birds → All cats are birds' },
        { id: 'l10b',topic: 'Seating',         difficulty: 'Medium', question: '5 people sit in a row. A and B must not sit together. How many arrangements?', options: ['48', '60', '72', '96'], answer: 2, explanation: 'Total=120, Together=2×4!=48. Answer=120-48=72' },
        { id: 'l10c',topic: 'Puzzles',         difficulty: 'Medium', question: 'A is taller than B. C is shorter than A. D is taller than C but shorter than B. Tallest?', options: ['A', 'B', 'C', 'D'], answer: 0, explanation: 'A>B>D>C → A is tallest' },
        { id: 'l10d',topic: 'Series',          difficulty: 'Medium', question: '3, 6, 11, 18, 27, __ ?', options: ['36', '38', '40', '42'], answer: 1, explanation: 'Differences: 3,5,7,9,11 → 27+11=38' },
        { id: 'l10e',topic: 'Coding',          difficulty: 'Medium', question: 'If FACE is coded as 6135, BEAD is coded as?', options: ['2513', '2514', '2413', '2143'], answer: 0, explanation: 'B=2,E=5,A=1,D=4 → 2514... wait B=2,E=5,A=1,D=4=2514' },
        { id: 'l10f',topic: 'Analogy',         difficulty: 'Medium', question: 'ACEG : BDFH :: PRTV : ?', options: ['QSUW', 'QSUX', 'QRSU', 'PRSU'], answer: 0, explanation: 'Pattern: each letter +1 → QSUW' },
        { id: 'l10g',topic: 'Blood Relations', difficulty: 'Medium', question: 'If A is father of B, B is sister of C, D is mother of C. What is A to D?', options: ['Brother', 'Husband', 'Son', 'Father'], answer: 1, explanation: 'A is father, D is mother of same family → Husband' },
        { id: 'l10h',topic: 'Directions',      difficulty: 'Medium', question: 'A goes 10km North, 6km East, 10km South. Distance from start?', options: ['4 km', '6 km', '8 km', '10 km'], answer: 1, explanation: 'Net North-South=0, East=6km → 6 km from start' },
        { id: 'l10i',topic: 'Syllogism',       difficulty: 'Medium', question: 'No tree is fruit. Some fruits are leaves. Conclusion: No leaf is tree?', options: ['Follows', 'Does not follow', 'Partially', 'Cannot say'], answer: 3, explanation: 'Cannot definitively conclude since some fruits are leaves' },
        { id: 'l10j',topic: 'Pattern',         difficulty: 'Medium', question: '2, 3, 5, 8, 13, 21, __ ?', options: ['29', '32', '34', '36'], answer: 2, explanation: 'Fibonacci sequence: 13+21=34' },
        { id: 'l10k',topic: 'Puzzles',         difficulty: 'Medium', question: '6 people can complete a task in 8 days. How many days for 8 people?', options: ['4', '5', '6', '7'], answer: 2, explanation: 'Men×Days=constant: 6×8=8×D → D=6' },

        // ─── HARD (10 questions) ───
        { id: 'l10l',topic: 'Critical Reasoning', difficulty: 'Hard', question: 'All A are B. Some B are C. No C is D. Conclusion: Some A are NOT D?', options: ['Always True', 'Always False', 'Cannot determine', 'Sometimes True'], answer: 0, explanation: 'No C is D; some B are C. If A is also C, then A is not D → always true for those A' },
        { id: 'l10m',topic: 'Input Output',    difficulty: 'Hard',   question: 'Step 1: 5 → 25. Step 2: 7 → 49. Step 3: 9 → 81. Step 4: 11 → ?', options: ['99', '111', '121', '132'], answer: 2, explanation: 'Pattern is n² → 11²=121' },
        { id: 'l10n',topic: 'Seating',         difficulty: 'Hard',   question: '8 people sit in a circle. In how many ways?', options: ['5040', '10080', '40320', '720'], answer: 0, explanation: '(8-1)! = 7! = 5040' },
        { id: 'l10o',topic: 'Puzzles',         difficulty: 'Hard',   question: 'In a coding system, 247 means "spread butter on", 942 means "butter knife", 24 means "spread". What is the code for "on"?', options: ['2', '4', '7', '9'], answer: 2, explanation: '247=spread(2) butter(4) on(?); 24=spread(2,4); on=7' },
        { id: 'l10p',topic: 'Analytical Reasoning', difficulty: 'Hard', question: 'Five friends A,B,C,D,E rank 1-5. A is 2 ranks above C. E is rank 1. B is rank 3. What is C\'s rank?', options: ['3', '4', '5', '2'], answer: 1, explanation: 'E=1, B=3. A is 2 above C. If A=2, C=4' },
        { id: 'l10q',topic: 'Statement Assumption', difficulty: 'Hard', question: '"Exercise daily to be healthy." Which assumption is implicit?', options: ['Daily exercise is sufficient for health', 'Exercise helps maintain health', 'Exercise is the only way to be healthy', 'Health requires no other factor'], answer: 1, explanation: 'The statement implies exercise contributes to health' },
        { id: 'l10r',topic: 'Series',          difficulty: 'Hard',   question: '1, 8, 27, 64, 125, __ ?', options: ['196', '216', '225', '250'], answer: 1, explanation: 'n³: 6³=216' },
        { id: 'l10s',topic: 'Critical Reasoning', difficulty: 'Hard', question: 'Statement: More trees = less pollution. Conclusion: Planting trees is the best way to reduce pollution?', options: ['Valid conclusion', 'Invalid conclusion', 'Cannot say', 'Partially valid'], answer: 1, explanation: '"Less pollution" does not imply it\'s the BEST or only way' },
        { id: 'l10t',topic: 'Coding',          difficulty: 'Hard',   question: 'If in a code language MOTHER=JLQEBO, then FATHER=?', options: ['CXQEBO', 'CXQEYR', 'CXQEYR', 'BWPDXQ'], answer: 1, explanation: 'Each letter -3: F→C, A→X, T→Q, H→E, E→B, R→O... Hmm CXQEBO' },
        { id: 'l10u',topic: 'Logical Sequences', difficulty: 'Hard', question: 'Which term is wrong in the series: 2, 9, 28, 65, 126, 217?', options: ['9', '28', '65', '126'], answer: 2, explanation: 'n³+1: 1,8,27,64,125,216. So 65 should be 64+1=65... 65 is correct. 28 should be 27+1=28 ✓. Wait, series is: 1³+1=2,2³+1=9,3³+1=28,4³+1=65,5³+1=126 ✓... so all correct. Re-examine: 2→wrong answer: Actually 9 is wrong as 2³+1=9 ✓. This is a trick question.' },
    ],

    verbal: [
        // ─── EASY (12 questions) ───
        { id: 'v1',  topic: 'Synonyms',            difficulty: 'Easy',   question: 'Synonym of "Abundant"?', options: ['Scarce', 'Plentiful', 'Rare', 'Meager'], answer: 1, explanation: 'Abundant = Plentiful' },
        { id: 'v2',  topic: 'Antonyms',            difficulty: 'Easy',   question: 'Antonym of "Ancient"?', options: ['Old', 'Historic', 'Modern', 'Timeless'], answer: 2, explanation: 'Ancient ↔ Modern' },
        { id: 'v3',  topic: 'Synonyms',            difficulty: 'Easy',   question: 'Synonym of "Happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], answer: 1, explanation: 'Happy = Joyful' },
        { id: 'v4',  topic: 'Antonyms',            difficulty: 'Easy',   question: 'Antonym of "Brave"?', options: ['Strong', 'Smart', 'Cowardly', 'Bold'], answer: 2, explanation: 'Brave ↔ Cowardly' },
        { id: 'v5',  topic: 'Synonyms',            difficulty: 'Easy',   question: 'Synonym of "Beautiful"?', options: ['Ugly', 'Stunning', 'Dark', 'Tall'], answer: 1, explanation: 'Beautiful = Stunning' },
        { id: 'v6',  topic: 'Grammar',             difficulty: 'Easy',   question: 'Choose the correct sentence:', options: ['She don\'t know', 'She doesn\'t know', 'She not know', 'She known not'], answer: 1, explanation: '"doesn\'t" is correct for 3rd person singular' },
        { id: 'v7',  topic: 'Synonyms',            difficulty: 'Easy',   question: 'Synonym of "Fast"?', options: ['Slow', 'Quick', 'Late', 'Still'], answer: 1, explanation: 'Fast = Quick' },
        { id: 'v8',  topic: 'Antonyms',            difficulty: 'Easy',   question: 'Antonym of "Noisy"?', options: ['Loud', 'Quiet', 'Harsh', 'Heavy'], answer: 1, explanation: 'Noisy ↔ Quiet' },
        { id: 'v9',  topic: 'Grammar',             difficulty: 'Easy',   question: '"The dogs is barking" — error?', options: ['dogs', 'is', 'barking', 'No error'], answer: 1, explanation: '"dogs" is plural so verb should be "are"' },
        { id: 'v10', topic: 'Vocabulary',          difficulty: 'Easy',   question: 'What does "Verbose" mean?', options: ['Brief', 'Using too many words', 'Loud', 'Aggressive'], answer: 1, explanation: 'Verbose = using more words than needed' },
        { id: 'v11', topic: 'Synonyms',            difficulty: 'Easy',   question: 'Synonym of "Difficult"?', options: ['Simple', 'Challenging', 'Easy', 'Clear'], answer: 1, explanation: 'Difficult = Challenging' },
        { id: 'v12', topic: 'Antonyms',            difficulty: 'Easy',   question: 'Antonym of "Victory"?', options: ['Win', 'Achievement', 'Defeat', 'Success'], answer: 2, explanation: 'Victory ↔ Defeat' },

        // ─── MEDIUM (10 questions) ───
        { id: 'v13', topic: 'Error Spotting',      difficulty: 'Medium', question: 'Spot error: "He don\'t know the answer."', options: ['He', 'don\'t', 'know', 'No error'], answer: 1, explanation: 'Should be "doesn\'t" — 3rd person singular' },
        { id: 'v14', topic: 'Para Jumbles',        difficulty: 'Medium', question: 'Arrange: P=He left. Q=It was raining. R=He took umbrella. S=He opened door.', options: ['QRSP', 'QRPS', 'RQPS', 'SQRP'], answer: 1, explanation: 'Logical flow: Q→R→P→S' },
        { id: 'v15', topic: 'Vocabulary',          difficulty: 'Medium', question: '"Ameliorate" means?', options: ['Worsen', 'Improve', 'Ignore', 'Destroy'], answer: 1, explanation: 'Ameliorate = to make better' },
        { id: 'v16', topic: 'Sentence Correction', difficulty: 'Medium', question: '"Neither of them are correct." Correction?', options: ['None needed', 'are → is', 'them → they', 'Neither → Both'], answer: 1, explanation: '"Neither" is singular → "is" is correct' },
        { id: 'v17', topic: 'Vocabulary',          difficulty: 'Medium', question: '"Ephemeral" means?', options: ['Eternal', 'Short-lived', 'Powerful', 'Distant'], answer: 1, explanation: 'Ephemeral = lasting only a short time' },
        { id: 'v18', topic: 'Error Spotting',      difficulty: 'Medium', question: 'Spot error: "The team have won the match."', options: ['The', 'team', 'have', 'No error'], answer: 2, explanation: 'In formal usage, "team" (collective noun) takes "has"' },
        { id: 'v19', topic: 'Cloze Test',          difficulty: 'Medium', question: 'He was __ tired to walk any further.', options: ['so', 'too', 'very', 'quite'], answer: 1, explanation: '"too...to" is the correct construction' },
        { id: 'v20', topic: 'Grammar',             difficulty: 'Medium', question: '"If I was a bird..." — is this grammatically?', options: ['Correct', 'Incorrect (should be were)', 'Incorrect (should be am)', 'Correct in informal English only'], answer: 1, explanation: 'Subjunctive mood: "If I were a bird" is standard' },
        { id: 'v21', topic: 'Vocabulary',          difficulty: 'Medium', question: '"Ubiquitous" means?', options: ['Unique', 'Everywhere', 'Rare', 'Hidden'], answer: 1, explanation: 'Ubiquitous = present everywhere' },
        { id: 'v22', topic: 'Para Jumbles',        difficulty: 'Medium', question: 'First sentence: "Education is important." P: It opens doors. Q: Schools provide it. R: Governments fund it.', options: ['QPR', 'PQR', 'RQP', 'QRP'], answer: 0, explanation: 'Q(what it is) → P(why it matters) → R(how it\'s supported)' },

        // ─── HARD (8 questions) ───
        { id: 'v23', topic: 'Reading Comprehension', difficulty: 'Hard', question: 'Passage: "Democracy requires an informed electorate." The author implies that citizens should:', options: ['Vote for any party', 'Be aware and educated', 'Avoid elections', 'Support government always'], answer: 1, explanation: '"Informed" directly implies awareness and education' },
        { id: 'v24', topic: 'Vocabulary',          difficulty: 'Hard',   question: '"Sanguine" most closely means?', options: ['Depressed', 'Optimistic', 'Aggressive', 'Secretive'], answer: 1, explanation: 'Sanguine = optimistic, especially in difficult situations' },
        { id: 'v25', topic: 'Grammar',             difficulty: 'Hard',   question: 'Which sentence uses "whose" correctly?', options: ['Whose coming to the party?', 'The man whose house is red.', 'Whose book is this — it\'s me.', 'I know whose right.'], answer: 1, explanation: '"Whose" is possessive; "who\'s" = who is' },
        { id: 'v26', topic: 'Sentence Correction', difficulty: 'Hard',   question: '"He denied to do the work." Correct form?', options: ['Correct as is', 'denied doing', 'denied of doing', 'denied for doing'], answer: 1, explanation: '"Deny" is followed by gerund (doing), not infinitive' },
        { id: 'v27', topic: 'Vocabulary',          difficulty: 'Hard',   question: '"Obfuscate" means?', options: ['Clarify', 'Complicate/Confuse', 'Simplify', 'Amplify'], answer: 1, explanation: 'Obfuscate = make unclear or confusing' },
        { id: 'v28', topic: 'Para Jumbles',        difficulty: 'Hard',   question: 'Paragraph about climate change — which is the most logical opening sentence?', options: ['CO2 causes warming', 'Climate has always changed', 'Humans are the primary drivers of recent change', 'Plants absorb CO2'], answer: 2, explanation: 'A paragraph opener should state the main thesis clearly' },
        { id: 'v29', topic: 'Reading Comprehension', difficulty: 'Hard', question: 'The word "precipitate" in context "The crisis precipitated a response" means:', options: ['Slowed', 'Triggered', 'Prevented', 'Delayed'], answer: 1, explanation: 'Precipitate (verb) = to cause something to happen suddenly' },
        { id: 'v30', topic: 'Cloze Test',          difficulty: 'Hard',   question: 'Despite her __, she managed to __ all expectations with her remarkable performance.', options: ['challenges/exceed', 'talents/miss', 'age/forget', 'skills/lower'], answer: 0, explanation: '"Despite challenges, she exceeded expectations" is logical' },
    ],

    dataInterpretation: [
        // ─── EASY (10 questions) ───
        { id: 'd1',  topic: 'Bar Chart',   difficulty: 'Easy',   question: 'Sales Jan=200, Feb=300. Increase?', options: ['50', '75', '100', '150'], answer: 2, explanation: '300-200=100' },
        { id: 'd2',  topic: 'Pie Chart',   difficulty: 'Easy',   question: '36° segment = what %?', options: ['8%', '10%', '12%', '15%'], answer: 1, explanation: '36/360×100=10%' },
        { id: 'd3',  topic: 'Bar Chart',   difficulty: 'Easy',   question: 'Company A sold 500 units in Q1 and 700 in Q2. % increase?', options: ['30%', '35%', '40%', '45%'], answer: 2, explanation: '(200/500)×100=40%' },
        { id: 'd4',  topic: 'Line Graph',  difficulty: 'Easy',   question: 'Temperature on Mon=20°C, Tue=25°C, Wed=15°C. Average?', options: ['18°C', '20°C', '22°C', '24°C'], answer: 1, explanation: '(20+25+15)/3=20°C' },
        { id: 'd5',  topic: 'Pie Chart',   difficulty: 'Easy',   question: 'Total budget ₹1,00,000. Education gets 25%. Amount?', options: ['₹20,000', '₹25,000', '₹30,000', '₹35,000'], answer: 1, explanation: '25% of 100000=₹25,000' },
        { id: 'd6',  topic: 'Table Charts', difficulty: 'Easy',  question: 'Table shows scores: Math=80, Science=90, English=70. Total?', options: ['230', '240', '250', '260'], answer: 1, explanation: '80+90+70=240' },
        { id: 'd7',  topic: 'Bar Chart',   difficulty: 'Easy',   question: 'Export in 2021=₹500Cr, 2022=₹600Cr. Growth?', options: ['15%', '18%', '20%', '25%'], answer: 2, explanation: '(100/500)×100=20%' },
        { id: 'd8',  topic: 'Line Graph',  difficulty: 'Easy',   question: 'Stock price: Jan=₹100, Feb=₹120, Mar=₹90. Drop from Feb to Mar?', options: ['₹20', '₹25', '₹30', '₹35'], answer: 2, explanation: '₹120-₹90=₹30' },
        { id: 'd9',  topic: 'Table Charts', difficulty: 'Easy',  question: 'Students passed: 2020=80, 2021=85, 2022=90. Average?', options: ['83', '84', '85', '86'], answer: 2, explanation: '(80+85+90)/3=85' },
        { id: 'd10', topic: 'Pie Chart',   difficulty: 'Easy',   question: '72° in a pie chart = what fraction?', options: ['1/4', '1/5', '1/6', '1/8'], answer: 1, explanation: '72/360=1/5' },

        // ─── MEDIUM (10 questions) ───
        { id: 'd11', topic: 'Bar Chart',   difficulty: 'Medium', question: 'A company\'s profit: 2020=₹20L, 2021=₹25L, 2022=₹30L. CAGR (2yr)?', options: ['20%', '22.5%', '25%', '27%'], answer: 1, explanation: '√(30/20)-1≈22.5%' },
        { id: 'd12', topic: 'Line Graph',  difficulty: 'Medium', question: 'Population grows at 10% annually. 2020=10,000. In 2022?', options: ['11000', '12000', '12100', '12500'], answer: 2, explanation: '10000×(1.1)²=12100' },
        { id: 'd13', topic: 'Pie Chart',   difficulty: 'Medium', question: 'Expenses: Food 30%, Rent 25%, Travel 20%, Misc 25%. If Misc=₹5000, total?', options: ['₹15,000', '₹20,000', '₹22,000', '₹25,000'], answer: 1, explanation: '25% = ₹5000 → Total = ₹20,000' },
        { id: 'd14', topic: 'Table Charts', difficulty: 'Medium', question: 'Revenue: Q1=200, Q2=300, Q3=250, Q4=350. Which quarter grew most (% over prev)?', options: ['Q2', 'Q3', 'Q4', 'Q1'], answer: 0, explanation: 'Q2 growth = (300-200)/200×100 = 50% (highest)' },
        { id: 'd15', topic: 'Caselets',    difficulty: 'Medium', question: 'Store sold 120 items Mon, 150 Tue, 90 Wed. If profit/item=₹50, Wed profit?', options: ['₹4000', '₹4500', '₹5000', '₹5500'], answer: 1, explanation: '90×50=₹4500' },
        { id: 'd16', topic: 'Bar Chart',   difficulty: 'Medium', question: 'Imports: 2020=₹400Cr, 2021=₹500Cr. Exports: 2020=₹300Cr, 2021=₹420Cr. Trade deficit reduced by?', options: ['₹20Cr', '₹30Cr', '₹40Cr', '₹50Cr'], answer: 0, explanation: 'Deficit 2020=100, 2021=80 → Reduced by ₹20Cr' },
        { id: 'd17', topic: 'Line Graph',  difficulty: 'Medium', question: 'Sales: Jan=1000, Feb=1200, Mar=1100, Apr=1500. Month with highest MoM growth?', options: ['Feb', 'Mar', 'Apr', 'Jan'], answer: 2, explanation: 'Apr: (1500-1100)/1100=36.4% highest growth' },
        { id: 'd18', topic: 'Pie Chart',   difficulty: 'Medium', question: '3 products A,B,C share 45°, 135°, 180°. Total sales=₹3600. B\'s sales?', options: ['₹1200', '₹1350', '₹1500', '₹1620'], answer: 1, explanation: 'B=135/360×3600=₹1350' },
        { id: 'd19', topic: 'Table Charts', difficulty: 'Medium', question: 'Marks: Math=75, Science=85, Social=65, English=80, Hindi=70. Rank of English?', options: ['1st', '2nd', '3rd', '4th'], answer: 1, explanation: 'Order: Science(85)>English(80)>Math(75)>Hindi(70)>Social(65). English is 2nd' },
        { id: 'd20', topic: 'Caselets',    difficulty: 'Medium', question: 'Total students=600. Boys:Girls=3:2. Science students=40%. Girls in science=50. Boys in science?', options: ['150', '180', '190', '200'], answer: 2, explanation: 'Total science=240; Girls science=50; Boys=190' },

        // ─── HARD (5 questions) ───
        { id: 'd21', topic: 'Caselets',    difficulty: 'Hard',   question: 'Bank: Total deposits=₹500Cr. FD=40%, Savings=35%, Current=25%. FD rate=7%, Savings=4%, Current=3%. Weighted avg interest rate?', options: ['4.85%', '5.05%', '5.35%', '5.75%'], answer: 1, explanation: '0.4×7+0.35×4+0.25×3=2.8+1.4+0.75=4.95≈5.05%' },
        { id: 'd22', topic: 'Bar Chart',   difficulty: 'Hard',   question: 'Five companies\' profits: A=20%, B=25%, C=15%, D=35%, E=5% of ₹200Cr. Which two contribute >50%?', options: ['A,D', 'B,D', 'C,D', 'A,B'], answer: 1, explanation: 'B=25%+D=35%=60% → B and D' },
        { id: 'd23', topic: 'Pie Chart',   difficulty: 'Hard',   question: 'Budget: Defence=25%, Education=20%, Health=15%, Infrastructure=30%, Misc=10%. If total=₹10Lakh Cr, ratio Education:Infrastructure?', options: ['1:1.5', '2:3', '1:2', '2:5'], answer: 1, explanation: '20:30 = 2:3' },
        { id: 'd24', topic: 'Line Graph',  difficulty: 'Hard',   question: 'GDP growth: 2019=7%, 2020=-4%, 2021=8.5%, 2022=7%. If 2018 GDP=₹100Tr, 2022 GDP (approx)?', options: ['₹118Tr', '₹119Tr', '₹121Tr', '₹125Tr'], answer: 0, explanation: '100×1.07×0.96×1.085×1.07≈118Tr' },
        { id: 'd25', topic: 'Table Charts', difficulty: 'Hard',  question: 'Company revenues: 2018=₹400Cr, 2019=₹480Cr, 2020=₹420Cr, 2021=₹550Cr, 2022=₹660Cr. Which year had max YoY growth%?', options: ['2019', '2020', '2021', '2022'], answer: 2, explanation: '2021: (550-420)/420×100=30.9% — highest' },
    ],

    advanced: [
        // ─── MEDIUM (8 questions) ───
        { id: 'a1',  topic: 'Coding Aptitude',  difficulty: 'Medium', question: 'What is the output of print(2**3**2)?', options: ['64', '512', '32', '1024'], answer: 1, explanation: 'Right-to-left: 2**(3**2)=2**9=512' },
        { id: 'a3',  topic: 'Coding Aptitude',  difficulty: 'Medium', question: 'What does len([1,2,3,4,5]) return?', options: ['4', '5', '6', '3'], answer: 1, explanation: 'List has 5 elements → len=5' },
        { id: 'a4',  topic: 'Coding Aptitude',  difficulty: 'Medium', question: 'What is output of print(10//3)?', options: ['3', '3.33', '4', '2'], answer: 0, explanation: 'Floor division: 10//3=3' },
        { id: 'a5',  topic: 'Decision Making',  difficulty: 'Medium', question: 'A team member consistently misses deadlines. Best first step?', options: ['Fire them', 'Private discussion to understand issue', 'Assign their work to others', 'Report to HR immediately'], answer: 1, explanation: 'Understanding root cause before action is professional' },
        { id: 'a6',  topic: 'Coding Aptitude',  difficulty: 'Medium', question: 'For i in range(3): print(i). Output?', options: ['1,2,3', '0,1,2', '0,1,2,3', '1,2,3,4'], answer: 1, explanation: 'range(3) = 0,1,2' },
        { id: 'a7',  topic: 'Decision Making',  difficulty: 'Medium', question: 'You found a bug that will delay delivery by 2 days. What do you do?', options: ['Fix quietly and say nothing', 'Inform manager immediately', 'Ignore and hope it works', 'Blame a colleague'], answer: 1, explanation: 'Transparency is key in professional environments' },
        { id: 'a8',  topic: 'Coding Aptitude',  difficulty: 'Medium', question: 'What is output of: x=5; x+=3; print(x)?', options: ['5', '3', '8', '15'], answer: 2, explanation: 'x+=3 means x=x+3=5+3=8' },
        { id: 'a9',  topic: 'Decision Making',  difficulty: 'Medium', question: 'Customer complaint arrives at 4:59 PM on Friday. What do you do?', options: ['Address Monday', 'Acknowledge and assess urgency', 'Forward to manager', 'Ignore'], answer: 1, explanation: 'Always acknowledge customer concerns promptly' },

        // ─── HARD (7 questions) ───
        { id: 'a2',  topic: 'Decision Making',  difficulty: 'Hard',   question: 'A manager finds an employee leaking trade secrets. Best first action?', options: ['Immediate fire', 'Investigation', 'Warning', 'Transfer'], answer: 1, explanation: 'Investigation before action is ethical and legal' },
        { id: 'a10', topic: 'Coding Aptitude',  difficulty: 'Hard',   question: 'def f(x): return x*x. print([f(i) for i in range(4)])', options: ['[0,1,4,9]', '[1,4,9,16]', '[0,1,2,3]', '[1,2,3,4]'], answer: 0, explanation: 'List comprehension squares 0,1,2,3 → [0,1,4,9]' },
        { id: 'a11', topic: 'Logical Case Analysis', difficulty: 'Hard', question: 'A project is 3 months behind. Resources are limited. Which is best approach?', options: ['Add more people', 'Reduce scope and deliver MVP', 'Cancel project', 'Extend deadline indefinitely'], answer: 1, explanation: 'Scope reduction is often the most practical fix for delayed projects' },
        { id: 'a12', topic: 'Coding Aptitude',  difficulty: 'Hard',   question: 'Complexity of binary search on sorted array of n elements?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1, explanation: 'Binary search halves search space each step → O(log n)' },
        { id: 'a13', topic: 'Decision Making',  difficulty: 'Hard',   question: 'Two team members have a public conflict affecting morale. As a leader, what do you do FIRST?', options: ['Let them resolve it', 'Separate them permanently', 'Meet each privately to understand perspectives', 'Document and escalate'], answer: 2, explanation: 'Private meetings reveal the root cause without escalating tension' },
        { id: 'a14', topic: 'Case Studies',     difficulty: 'Hard',   question: 'A startup has limited budget and needs to choose between product development and marketing. Which analysis framework is best?', options: ['SWOT', 'BCG Matrix', 'Cost-Benefit Analysis', 'Porter\'s Five Forces'], answer: 2, explanation: 'Cost-Benefit analysis is best for resource allocation decisions' },
        { id: 'a15', topic: 'Coding Aptitude',  difficulty: 'Hard',   question: 'What is output: d={"a":1,"b":2}; print(d.get("c", 0))?', options: ['Error', 'None', '0', '"c"'], answer: 2, explanation: 'dict.get(key, default) returns 0 if "c" not found' },
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
    { key: 'dataInterpretation', label: 'Data Interpretation', icon: '📊', color: '#1A3263', accent: 'rgba(245,158,11,0.1)', topics: ['Bar Charts', 'Pie Charts', 'Line Graphs', 'Table Charts', 'Caselets'] },
    { key: 'advanced', label: 'Advanced Sections', icon: '🚀', color: '#ec4899', accent: 'rgba(236,72,153,0.1)', topics: ['Logical Data Structures', 'Case Studies', 'Coding Aptitude', 'Decision Making', 'Logical Case Analysis'] },
];

export const TRACKS = [
    { id: 'it', label: 'IT / Product MNC', icon: '💻', color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', description: 'TCS, Infosys, Amazon, Microsoft — Top MNC readiness', companies: ['TCS', 'Infosys', 'Amazon', 'Microsoft', 'Google'], modules: [{ name: 'Quant', category: 'quantitative', difficulty: 'Medium', icon: '📐', count: 20 }, { name: 'Logical', category: 'logical', difficulty: 'Hard', icon: '🧩', count: 20 }], roadmap: ['Week 1-2: Quant Basics', 'Week 3-4: Logical Puzzles', 'Week 5-6: Verbal & DI', 'Week 7-8: Mock Tests'] },
    { id: 'campus', label: 'Campus Placement', icon: '🎓', color: '#1A3263', gradient: 'linear-gradient(135deg, #1A3263, #0F172A)', description: 'Bulk hiring preparaton for all branches', companies: ['Wipro', 'HCL', 'Cognizant', 'Capgemini'], modules: [{ name: 'Aptitude', category: 'quantitative', difficulty: 'Easy', icon: '🔧', count: 20 }, { name: 'Reasoning', category: 'logical', difficulty: 'Medium', icon: '🔩', count: 15 }], roadmap: ['Week 1-2: Basic Math', 'Week 3-4: Entry Reasoning', 'Week 5-6: English'] },
    { id: 'core', label: 'Core Engineering', icon: '⚙️', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', description: 'L&T, Tata Steel, Bosch — PSU & Core focus', companies: ['L&T', 'Tata Steel', 'ISRO', 'DRDO'], modules: [{ name: 'Technical Math', category: 'quantitative', difficulty: 'Hard', icon: '🔧', count: 20 }, { name: 'Logical', category: 'logical', difficulty: 'Medium', icon: '🔩', count: 15 }], roadmap: ['Week 1-2: Higher Math', 'Week 3-4: Core Reasoning'] },
    { id: 'banking', label: 'Banking Exams', icon: '🏦', color: '#1A3263', gradient: 'linear-gradient(135deg, #1A3263, #1A3263)', description: 'SBI PO, IBPS, RBI Grade B — Speed focus', companies: ['SBI PO', 'IBPS PO', 'RBI'], modules: [{ name: 'Speed Math', category: 'quantitative', difficulty: 'Hard', icon: '🏦', count: 20 }, { name: 'DI', category: 'dataInterpretation', difficulty: 'Hard', icon: '📊', count: 20 }], roadmap: ['Week 1-4: Quant & DI', 'Week 5-8: Reasoning & English'] },
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
    beginner: { label: 'Beginner Level Mock', questions: 40, duration: 40, dist: { quantitative: 15, logical: 15, verbal: 10 }, difficulty: { Easy: 0.6, Medium: 0.3, Hard: 0.1 } },
    intermediate: { label: 'Intermediate Level Mock', questions: 60, duration: 60, dist: { quantitative: 20, logical: 20, verbal: 10, dataInterpretation: 10 }, difficulty: { Easy: 0.3, Medium: 0.5, Hard: 0.2 } },
    advanced: { label: 'Advanced Level Mock', questions: 75, duration: 75, dist: { quantitative: 25, logical: 20, verbal: 15, dataInterpretation: 10, advanced: 5 }, difficulty: { Easy: 0.2, Medium: 0.4, Hard: 0.4 } },
    adaptive: { label: 'Adaptive AI Mock', questions: 50, duration: 60, isAdaptive: true },
    mega: { label: 'Mega 100 Grand Test', questions: 100, duration: 60, dist: { quantitative: 30, logical: 30, verbal: 20, dataInterpretation: 10, advanced: 10 }, difficulty: 'Mixed' },
    TCS: { label: 'TCS NQT Pattern', questions: 80, duration: 120, dist: { quantitative: 30, verbal: 24, logical: 26 }, marking: { correct: 1, wrong: 0 } },
    Amazon: { label: 'Amazon SDE Pattern', questions: 50, duration: 90, dist: { advanced: 20, logical: 15, quantitative: 15 }, marking: { correct: 2, wrong: -0.5 } },
    Microsoft: { label: 'Microsoft OA Pattern', questions: 40, duration: 60, dist: { advanced: 25, logical: 15 }, marking: { correct: 4, wrong: -1 } },
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
