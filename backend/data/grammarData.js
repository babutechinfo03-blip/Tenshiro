const grammarTopicsData = [
    {
        id: 'parts-of-speech',
        title: '1. Parts of Speech (Overview)',
        description: 'The fundamental building blocks of the English language. Understand the roles words play within a sentence.',
        practiceLink: 'https://agendaweb.org/grammar/parts-of-speech-exercises.html',
        resourceLink: 'https://www.grammarly.com/blog/parts-of-speech/',
        subtopics: [
            {
                title: 'Nouns',
                structure: 'Naming Words',
                explanation: 'A noun is the name of a person, place, thing, or idea. They typically act as subjects or objects.',
                examples: ['John (Person)', 'London (Place)', 'Table (Thing)', 'Happiness (Idea) भी']
            },
            {
                title: 'Pronouns',
                structure: 'Replacement Words',
                explanation: 'A pronoun is used in place of a noun to avoid repetition.',
                examples: ['John is tired. HE wants to sleep.', 'The books are where YOU left THEM.']
            },
            {
                title: 'Verbs',
                structure: 'Action Words',
                explanation: 'A verb expresses an action or a state of being.',
                examples: ['Jump, Run (Action)', 'Is, Are, Was (State of Being)']
            },
            {
                title: 'Adjectives',
                structure: 'Describing Words',
                explanation: 'An adjective describes or modifies a noun or pronoun, giving it more detail.',
                examples: ['The QUICK, BROWN fox.', 'She wore a BEAUTIFUL dress.']
            },
            {
                title: 'Adverbs',
                structure: 'Modifying Words',
                explanation: 'An adverb modifies a verb, adjective, or another adverb. It answers how, when, where, or to what extent.',
                examples: ['He ran QUICKLY.', 'She is VERY smart.']
            },
            {
                title: 'Prepositions',
                structure: 'Relationship Words',
                explanation: 'A preposition shows the relationship of a noun or pronoun to another word, often indicating location or time.',
                examples: ['The cat is UNDER the table.', 'We meet AT noon.']
            },
            {
                title: 'Conjunctions',
                structure: 'Connecting Words',
                explanation: 'A conjunction joins words, phrases, or clauses together.',
                examples: ['I like apples AND bananas.', 'He was tired BUT happy.']
            },
            {
                title: 'Interjections',
                structure: 'Emotion Words',
                explanation: 'An interjection expresses strong emotion and is often followed by an exclamation point.',
                examples: ['WOW! That is amazing.', 'OUCH! That hurts.']
            }
        ]
    },
    {
        id: 'nouns-deep',
        title: '2. Nouns in Detail',
        description: 'Deep dive into Types of Nouns: Countable, Uncountable, Collective, and Abstract.',
        practiceLink: 'https://www.perfect-english-grammar.com/countable-and-uncountable-nouns-exercise-1.html',
        resourceLink: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/countable-uncountable-nouns',
        subtopics: [
            {
                title: 'Countable vs Uncountable',
                structure: 'Can you count them?',
                explanation: 'Countable nouns can be counted and made plural (apples, dogs). Uncountable nouns cannot be counted normally and have no plural form (water, advice, information).',
                examples: ['Countable: I have three APPLES.', 'Uncountable: Could you give me some ADVICE? (Not "advices")']
            },
            {
                title: 'Proper vs Common Nouns',
                structure: 'Specific vs General',
                explanation: 'Proper nouns refer to specific names and are always capitalized. Common nouns are general terms.',
                examples: ['Proper: I visited PARIS in JULY.', 'Common: We went to the CITY in the SUMMER.']
            },
            {
                title: 'Collective Nouns',
                structure: 'Groups of entities',
                explanation: 'Words that represent a group of people or things, treated usually as singular in American English.',
                examples: ['The TEAM is playing well.', 'A FLOCK of birds flew by.']
            },
            {
                title: 'Abstract Nouns',
                structure: 'Intangible concepts',
                explanation: 'Ideas, qualities, or states rather than concrete objects.',
                examples: ['His BRAVERY was unmatched.', 'They fought for FREEDOM.']
            }
        ]
    },
    {
        id: 'pronouns-deep',
        title: '3. Pronouns in Detail',
        description: 'Understanding Personal, Possessive, Reflexive, Relative, and Demonstrative Pronouns.',
        practiceLink: 'https://www.englishgrammar.org/pronoun-exercise-2/',
        resourceLink: 'https://www.grammarbook.com/grammar/pronoun.asp',
        subtopics: [
            {
                title: 'Personal Pronouns',
                structure: 'Subject vs Object',
                explanation: 'Subjects do the action (I, you, he, she, it, we, they). Objects receive the action (me, you, him, her, it, us, them).',
                examples: ['Subject: HE kicked the ball.', 'Object: The ball hit HIM.']
            },
            {
                title: 'Possessive Pronouns',
                structure: 'Showing Ownership',
                explanation: 'Words like mine, yours, his, hers, ours, theirs. (Note: NO apostrophes in possessive pronouns!)',
                examples: ['That book is MINE.', 'The cat lost ITS toy. (Not it\'s)']
            },
            {
                title: 'Reflexive Pronouns',
                structure: 'Subject = Object',
                explanation: 'Used when the subject and object are the same person (-self or -selves).',
                examples: ['I cut MYSELF while cooking.', 'They fixed it THEMSELVES.']
            },
            {
                title: 'Relative Pronouns',
                structure: 'Who, Which, That, Whose',
                explanation: 'Connects a clause or phrase to a noun or pronoun. "Who" for people, "Which" for things, "That" for both.',
                examples: ['The man WHO stole the car.', 'The book THAT I read.']
            }
        ]
    },
    {
        id: 'verbs-types',
        title: '4. Verbs & Verb Types',
        description: 'Action, Linking, Helping, Transitive vs Intransitive.',
        practiceLink: 'https://agendaweb.org/verbs/transitive-intransitive-exercises.html',
        resourceLink: 'https://www.myenglishpages.com/english/grammar-lesson-transitive-intransitive-verbs.php',
        subtopics: [
            {
                title: 'Transitive vs Intransitive',
                structure: 'Needs an Object vs Does Not',
                explanation: 'Transitive verbs strictly require a direct object to make sense. Intransitive verbs do not.',
                examples: ['Transitive: She KICKED the ball. (What did she kick?)', 'Intransitive: They SLEPT. (No object needed)']
            },
            {
                title: 'Linking Verbs',
                structure: 'Subject <=> Subject Complement',
                explanation: 'Linking verbs do not show an action; they connect the subject to a descriptive word (am, is, are, seem, look, feel).',
                examples: ['She LOOKS tired.', 'He IS a doctor.']
            },
            {
                title: 'Auxiliary (Helping) Verbs',
                structure: 'Helping the main verb',
                explanation: 'Used together with a main verb to show tense or to form questions/negatives (be, do, have).',
                examples: ['I AM walking.', 'He DOES not know.']
            }
        ]
    },
    {
        id: 'adjectives-deep',
        title: '5. Advanced Adjectives',
        description: 'Comparative, Superlative, and Adjective Order.',
        practiceLink: 'https://www.perfect-english-grammar.com/comparative-and-superlative-exercise-1.html',
        resourceLink: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar/adjective-order',
        subtopics: [
            {
                title: 'Degrees of Comparison',
                structure: 'Positive, Comparative, Superlative',
                explanation: 'Comparative compares two things (adds -er or uses "more"). Superlative compares three or more (adds -est or uses "most").',
                examples: ['Positive: Fast / Beautiful', 'Comparative: Faster / More beautiful', 'Superlative: Fastest / Most beautiful']
            },
            {
                title: 'Order of Adjectives',
                structure: 'OSASCOMP',
                explanation: 'When using multiple adjectives, they follow a natural order: Opinion, Size, Age, Shape, Color, Origin, Material, Purpose.',
                examples: ['A BEAUTIFUL, SMALL, OLD, BROWN, LEATHER bag. (Opinion -> Size -> Age -> Color -> Material)']
            }
        ]
    },
    {
        id: 'adverbs-deep',
        title: '6. Advanced Adverbs',
        description: 'Types of adverbs and their strict placement in sentences.',
        practiceLink: 'https://agendaweb.org/grammar/adverbs-exercises.html',
        resourceLink: 'https://dictionary.cambridge.org/grammar/british-grammar/adverbs',
        subtopics: [
            {
                title: 'Types of Adverbs',
                structure: 'Manner, Time, Place, Frequency, Degree',
                explanation: 'Adverbs answer how, when, where, how often, and how much.',
                examples: ['Manner: Quickly', 'Time: Yesterday', 'Place: Outside', 'Frequency: Always', 'Degree: Very']
            },
            {
                title: 'Adverbs of Frequency',
                structure: 'Placement Rules',
                explanation: 'Go BEFORE the main verb, but AFTER the verb "to be".',
                examples: ['Before main verb: He ALWAYS EATS late.', 'After "to be": He IS ALWAYS late.']
            }
        ]
    },
    {
        id: 'prepositions-deep',
        title: '7. Prepositions of Time and Place',
        description: 'The tricky rules of In, On, At.',
        practiceLink: 'https://www.perfect-english-grammar.com/prepositions-of-time-exercise-1.html',
        resourceLink: 'https://englishstudyhere.com/grammar/prepositions-of-time-in-on-at/',
        subtopics: [
            {
                title: 'Prepositions of Time',
                structure: 'IN (general), ON (specific days), AT (exact time)',
                explanation: 'IN for months/years/seasons. ON for days/dates. AT for times.',
                examples: ['IN: In October, In 2024, In the morning', 'ON: On Monday, On October 15th', 'AT: At 6 PM, At noon']
            },
            {
                title: 'Prepositions of Place',
                structure: 'IN (enclosed), ON (surfaces), AT (points)',
                explanation: 'IN for rooms/cities/containers. ON for walls/floors/streets. AT for specific points/events.',
                examples: ['IN: In London, In the box', 'ON: On the table, On the wall', 'AT: At the bus stop, At the door']
            }
        ]
    },
    {
        id: 'conjunctions-deep',
        title: '8. Conjunctions',
        description: 'Coordinating, Subordinating, and Correlative.',
        practiceLink: 'https://www.english-grammar-lessons.com/conjunctions/exercise1/',
        resourceLink: 'https://www.grammarly.com/blog/conjunctions/',
        subtopics: [
            {
                title: 'Coordinating Conjunctions',
                structure: 'FANBOYS',
                explanation: 'For, And, Nor, But, Or, Yet, So. Joins two independent clauses with a comma.',
                examples: ['I wanted to sleep, BUT the neighbors were loud.', 'She likes tea, AND he likes coffee.']
            },
            {
                title: 'Subordinating Conjunctions',
                structure: 'Because, Although, Since, If',
                explanation: 'Connects an independent clause to a dependent clause. Requires a comma if it starts the sentence.',
                examples: ['ALTHOUGH it was raining, we went out.', 'We went out ALTHOUGH it was raining.']
            },
            {
                title: 'Correlative Conjunctions',
                structure: 'Pairs: Either/or, Neither/nor, Not only/but also',
                explanation: 'Always work in pairs to join equal elements.',
                examples: ['EITHER we stay OR we leave.', 'NOT ONLY is she smart, BUT ALSO hard-working.']
            }
        ]
    },
    {
        id: 'interjections',
        title: '9. Interjections',
        description: 'Expressions of strong feelings.',
        subtopics: [
            {
                title: 'Standalone Interjections',
                structure: 'Followed by !',
                explanation: 'Exclamations used to express surprise, joy, or pain.',
                examples: ['Ouch! That hurts.', 'Wow! What a beautiful view.']
            },
            {
                title: 'Mild Interjections',
                structure: 'Followed by ,',
                explanation: 'Mild emotions or hesitations, followed by a comma.',
                examples: ['Well, I am not sure.', 'Oh, I didn\'t see you there.']
            }
        ]
    },
    {
        id: 'articles-deep',
        title: '10. Definite & Indefinite Articles',
        description: 'Advanced rules for A, An, The, and Zero Article.',
        practiceLink: 'https://www.perfect-english-grammar.com/a-and-the-exercise-1.html',
        resourceLink: 'https://owl.purdue.edu/owl/general_writing/grammar/how_to_use_articles/',
        subtopics: [
            {
                title: 'A vs An',
                structure: 'Vowel SOUND vs Vowel LETTER',
                explanation: 'Use A before a consonant SOUND. Use AN before a vowel SOUND. (Focus on pronunciation, not spelling).',
                examples: ['AN hour (h is silent)', 'A university (sounds like "you")', 'AN umbrella']
            },
            {
                title: 'The (Definite)',
                structure: 'Specific / Mentioned Before',
                explanation: 'Used when the reader knows exactly which item you are talking about.',
                examples: ['I bought a book. THE book is red.', 'THE sun is hot. (Only one sun)']
            },
            {
                title: 'Zero Article (No Article)',
                structure: 'Generalizations / Plurals / Abstract',
                explanation: 'When talking about things in general, do not use an article.',
                examples: ['[X] Cats are great pets. (Not "The cats")', '[X] Water boils at 100 degrees.']
            }
        ]
    },
    {
        id: 'tenses-12',
        title: '11. The 12 English Tenses',
        description: 'Master all 12 tenses in English (Present, Past, and Future) conceptually and structurally from A to Z.',
        practiceLink: 'https://www.englishpage.com/verbpage/verbtenseintro.html',
        resourceLink: 'https://www.grammarly.com/blog/verb-tenses/',
        subtopics: [
            {
                title: '1. Simple Present',
                structure: 'Subject + V1 (s/es) + Object',
                explanation: 'Used for daily routines, habits, universal truths, and scheduled events.',
                examples: ['Habit: I wake up at 6 AM.', 'Truth: The sun rises in the east.', 'Schedule: The train leaves at 5 PM.']
            },
            {
                title: '2. Present Continuous',
                structure: 'Subject + am/is/are + V1(-ing) + Object',
                explanation: 'Used for actions happening exactly right now, or temporary situations.',
                examples: ['Action now: I am writing a letter.', 'Temporary: She is staying in London this week.']
            },
            {
                title: '3. Present Perfect',
                structure: 'Subject + has/have + V3 + Object',
                explanation: 'Used for past actions with a real connection to the present, life experiences, or recently completed actions.',
                examples: ['Experience: I have visited Paris.', 'Recent action: He has just finished his homework.', 'Unfinished time: I haven\'t seen him today.']
            },
            {
                title: '4. Present Perfect Continuous',
                structure: 'Subject + has/have + been + V1(-ing) + Object',
                explanation: 'Used for actions that started in the past and are still heavily continuing right now, emphasizing duration.',
                examples: ['Duration: I have been studying for 3 hours.', 'Result: The ground is wet because it has been raining all day.']
            },
            {
                title: '5. Simple Past',
                structure: 'Subject + V2 + Object',
                explanation: 'Used for completely finished actions at a specific known time in the past.',
                examples: ['I visited my grandmother yesterday.', 'She finished her project last week.']
            },
            {
                title: '6. Past Continuous',
                structure: 'Subject + was/were + V1(-ing) + Object',
                explanation: 'Used for actions that were ongoing at a specific time in the past, or when a continuous past action was interrupted by a short action.',
                examples: ['Ongoing focus: I was cooking at 8 PM.', 'Interrupted: I was reading WHEN the phone rang.']
            },
            {
                title: '7. Past Perfect',
                structure: 'Subject + had + V3 + Object',
                explanation: 'Often called "the past of the past". Used to show that one past action happened completely before another past action.',
                examples: ['Before another action: By the time I arrived, the train had left.', 'She had already eaten before the party started.']
            },
            {
                title: '8. Past Perfect Continuous',
                structure: 'Subject + had + been + V1(-ing) + Object',
                explanation: 'Used to heavily emphasize the duration of an ongoing past action right up until another past action took place.',
                examples: ['He had been waiting for two solid hours before his doctor finally arrived.']
            },
            {
                title: '9. Simple Future',
                structure: 'Subject + will/shall + V1 + Object',
                explanation: 'Used for future predictions, promises, sudden decisions, or facts.',
                examples: ['Prediction: I think it will rain tomorrow.', 'Sudden Decision: "I forgot my wallet!" "Don\'t worry, I will pay."']
            },
            {
                title: '10. Future Continuous',
                structure: 'Subject + will be + V1(-ing) + Object',
                explanation: 'Used for an action that will be fully in progress at a certain specific time in the future.',
                examples: ['Don\'t call me at 8 PM tonight; I will be having dinner.']
            },
            {
                title: '11. Future Perfect',
                structure: 'Subject + will have + V3 + Object',
                explanation: 'Used to confidently predict that an action will be entirely completed before a certain point in the future.',
                examples: ['I will have finished the entire report by Friday at 5 PM.']
            },
            {
                title: '12. Future Perfect Continuous',
                structure: 'Subject + will have been + V1(-ing) + Object',
                explanation: 'Used to emphasize the duration of a future ongoing action leading up to a certain future point.',
                examples: ['By next year, I will have been working at this company for exactly 5 years.']
            }
        ]
    },
    {
        id: 'subject-verb-agree',
        title: '14. Subject-Verb Agreement',
        description: 'Essential rules for matching singular and plural subjects with verbs.',
        practiceLink: 'https://owl.purdue.edu/owl_exercises/sentence_structure/subject_verb_agreement/subject_verb_agreement_exercise.html',
        resourceLink: 'https://academicguides.waldenu.edu/writingcenter/grammar/subjectverbagreement',
        subtopics: [
            {
                title: 'Basic Rule',
                structure: 'Singular/Singular, Plural/Plural',
                explanation: 'A singular subject takes a singular verb. A plural subject takes a plural verb.',
                examples: ['The dog barks. (Singular)', 'The dogs bark. (Plural)']
            },
            {
                title: 'Compound Subjects',
                structure: 'Joined by "and"',
                explanation: 'Subjects joined by "and" usually take a plural verb.',
                examples: ['Tom and Jerry ARE my favorite characters.']
            },
            {
                title: 'Or / Nor Rule',
                structure: 'Proximity Rule',
                explanation: 'When subjects are joined by "or" or "nor", the verb agrees with the subject physically closest to it in the sentence.',
                examples: ['Neither the manager nor the employees ARE happy.', 'Neither the employees nor the manager IS happy.']
            },
            {
                title: 'Indefinite Pronouns',
                structure: 'Everyone, Someone, Nobody',
                explanation: 'Pronouns randomly ending in -one, -body, -thing are ALWAYS grammatically singular.',
                examples: ['Everyone IS here.', 'Nobody KNOWS the true answer.']
            }
        ]
    },
    {
        id: 'active-passive',
        title: '15. Active & Passive Voice',
        description: 'Master how to shift focus between the subject (doer) and the object (receiver).',
        practiceLink: 'https://agendaweb.org/verbs/passive-voice-exercises.html',
        resourceLink: 'https://dictionary.cambridge.org/grammar/british-grammar/passive',
        subtopics: [
            {
                title: 'Active Voice',
                structure: 'Subject + Verb + Object',
                explanation: 'The subject performs the action. Writing is direct, natural, and strong.',
                examples: ['The chef COOKED a delicious meal.', 'The company LAUNCHED a new product.']
            },
            {
                title: 'Passive Voice',
                structure: 'Object + forms of "to be" + V3 + (by Subject)',
                explanation: 'The subject receives the action. Used when the action or the receiver is more important than the actual doer.',
                examples: ['A delicious meal WAS COOKED by the chef.', 'A new product WAS LAUNCHED by the company.']
            },
            {
                title: 'When to use Passive Voice in Writing',
                structure: 'Rules & Professional Applications',
                explanation: 'Use it strictly for formal writing, scientific reports, corporate policies, or when the agent is unknown.',
                examples: ['Unknown agent: My car was stolen last night.', 'Scientific: The acid was poured slowly into the beaker.']
            }
        ]
    },
    {
        id: 'reported-speech',
        title: '16. Direct and Indirect (Reported) Speech',
        description: 'How to accurately report what someone else legally said.',
        practiceLink: 'https://www.perfect-english-grammar.com/reported-speech-exercise-1.html',
        resourceLink: 'https://test-english.com/grammar-points/b1/reported-speech-statements-questions/',
        subtopics: [
            {
                title: 'Direct Speech',
                structure: 'Using Quotation marks',
                explanation: 'Repeating exactly what someone said, word-for-word, using quotes.',
                examples: ['John said, "I AM going to the store now."']
            },
            {
                title: 'Indirect Speech (Tense Backshift)',
                structure: 'Present tense steps back to Past tense',
                explanation: 'When reporting, shift the tense back one historical step (Present -> Past). Remove quotes.',
                examples: ['Direct: "I am happy," she said.', 'Indirect: She said that she WAS happy.']
            },
            {
                title: 'Pronoun and Time shifts',
                structure: 'Today -> that day, Tomorrow -> the next day',
                explanation: 'Time, place, and pronouns must change logically to match the perspective of the reporter.',
                examples: ['Direct: "I will do it tomorrow," he said.', 'Indirect: He said he WOULD do it THE NEXT DAY.']
            }
        ]
    },
    {
        id: 'clauses',
        title: '17. Clauses',
        description: 'Independent vs Dependent Clauses.',
        practiceLink: 'https://cisl.edu/independent-and-dependent-clauses-grammar-exercise/',
        subtopics: [
            {
                title: 'Independent Clauses',
                structure: 'Subject + Verb = Complete Thought',
                explanation: 'A clause that can stand alone as a complete, logical sentence.',
                examples: ['I drink coffee.', 'He went to the store.']
            },
            {
                title: 'Dependent Clauses',
                structure: 'Marker word + Subject + Verb = Incomplete Thought',
                explanation: 'Contains a subject and verb but does not express a complete thought. Must be attached to an independent clause.',
                examples: ['BECAUSE I woke up late...', '...WHEN the clock struck midnight.']
            }
        ]
    },
    {
        id: 'phrases',
        title: '18. Phrases',
        description: 'Noun phrases, verb phrases, prepositional phrases.',
        subtopics: [
            {
                title: 'What is a Phrase?',
                structure: 'Group of words WITHOUT a subject-verb combo',
                explanation: 'Phrases act as a single part of speech but cannot stand alone.',
                examples: ['Noun Phrase: The big red dog.', 'Prepositional Phrase: In the dark room.']
            }
        ]
    },
    {
        id: 'sentence-structure',
        title: '19. Sentence Structure',
        description: 'Building Simple, Compound, Complex, and Compound-Complex Sentences.',
        resourceLink: 'https://owl.purdue.edu/owl/general_writing/punctuation/index.html',
        subtopics: [
            {
                title: 'Simple Sentence',
                structure: '1 Independent Clause',
                explanation: 'Contains one complete thought.',
                examples: ['She reads magazines.']
            },
            {
                title: 'Compound Sentence',
                structure: '2 Independent Clauses',
                explanation: 'Two independent clauses joined by a comma and a FANBOYS conjunction or a semicolon.',
                examples: ['She reads magazines, AND he reads novels.']
            },
            {
                title: 'Complex Sentence',
                structure: '1 Independent + 1+ Dependent',
                explanation: 'Combines an independent clause with one or more dependent clauses.',
                examples: ['ALTHOUGH she likes magazines, she reads novels.']
            },
            {
                title: 'Compound-Complex Sentence',
                structure: '2+ Independent + 1+ Dependent',
                explanation: 'The most advanced structure.',
                examples: ['Although she likes magazines, she reads novels, AND he reads comics.']
            }
        ]
    },
    {
        id: 'conditionals-deep',
        title: '20. Conditionals (If Clauses)',
        description: 'Learn the Zero, First, Second, and Third logic conditionals.',
        practiceLink: 'https://www.perfect-english-grammar.com/conditionals-exercise-1.html',
        resourceLink: 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-zero-first-second',
        subtopics: [
            {
                title: 'Zero Conditional',
                structure: 'If + Simple Present, Simple Present',
                explanation: 'Used for general 100% truths and scientific facts.',
                examples: ['If you heat ice, it melts.', 'If people eat too much rapidly, they get sick.']
            },
            {
                title: 'First Conditional',
                structure: 'If + Simple Present, Simple Future',
                explanation: 'Used for real, extremely possible situations in the future.',
                examples: ['If it rains tomorrow, I will stay home.', 'If she studies hard, she will definitely pass the exam.']
            },
            {
                title: 'Second Conditional',
                structure: 'If + Simple Past, Would + V1',
                explanation: 'Used for highly unlikely, imaginary, or completely impossible situations in the present/future.',
                examples: ['If I won the lottery right now, I would buy a mansion.', 'If I were you (imaginary), I would take the job.']
            },
            {
                title: 'Third Conditional',
                structure: 'If + Past Perfect, Would have + V3',
                explanation: 'Used for past regrets or evaluating imaginary situations in the past that didn\'t happen.',
                examples: ['If I had studied back then, I would have passed the exam.', 'If she had left earlier, she wouldn\'t have missed her flight.']
            }
        ]
    },
    {
        id: 'modals-deep',
        title: '21. Modals',
        description: 'Advanced nuances of Can, Could, Must, Should, May, Might.',
        practiceLink: 'https://agendaweb.org/verbs/modals-exercises.html',
        resourceLink: 'https://www.grammarly.com/blog/modal-verbs/',
        subtopics: [
            {
                title: 'Ability (Can, Could)',
                structure: 'Modal + Base Verb',
                explanation: 'Can = Present ability. Could = Past ability.',
                examples: ['I CAN type 90 WPM.', 'When I was younger, I COULD run marathons.']
            },
            {
                title: 'Obligation & Necessity (Must, Have To)',
                structure: 'Modal/Phrase + Base Verb',
                explanation: 'Must = Internal driven obligation. Have to = External enforced rule.',
                examples: ['I MUST stop smoking (My own choice).', 'I HAVE TO wear a uniform to work (External rule).']
            },
            {
                title: 'Advice (Should, Ought to)',
                structure: 'Modal + Base Verb',
                explanation: 'Used to provide professional or friendly advice.',
                examples: ['You SHOULD see a doctor about that.', 'You OUGHT TO apologize to her.']
            },
            {
                title: 'Probability (Might, May, Could)',
                structure: 'Modal + Base Verb',
                explanation: 'Guessing the future. "Might" is lower probability than "May".',
                examples: ['It MIGHT rain tomorrow (20% chance).', 'It MAY rain tomorrow (50% chance).']
            }
        ]
    },
    {
        id: 'gerunds-infinitives',
        title: '22. Gerunds & Infinitives',
        description: 'When to use Verb-ing vs To-Verb.',
        practiceLink: 'https://www.perfect-english-grammar.com/gerunds-and-infinitives-exercise-1.html',
        subtopics: [
            {
                title: 'Gerunds',
                structure: 'Verb + ing (used as a noun)',
                explanation: 'Used after certain verbs (enjoy, admit, avoid) or as the subject of a sentence.',
                examples: ['SWIMMING is my favorite hobby.', 'I enjoy READING.']
            },
            {
                title: 'Infinitives',
                structure: 'To + Verb',
                explanation: 'Used after certain verbs (want, decide, hope) or to express purpose.',
                examples: ['I want TO GO home.', 'I am studying TO PASS the exam.']
            }
        ]
    },
    {
        id: 'participles',
        title: '23. Participles',
        description: 'Using verb forms as adjectives.',
        subtopics: [
            {
                title: 'Present Participle (-ing)',
                structure: 'Active meaning / causes the feeling',
                explanation: 'Describes the thing that CAUSES an emotion or state.',
                examples: ['The movie was BORING.', 'The CRYING baby kept me awake.']
            },
            {
                title: 'Past Participle (-ed/-en)',
                structure: 'Passive meaning / experiences the feeling',
                explanation: 'Describes the person who EXPERIENCES an emotion.',
                examples: ['I was BORED by the movie.', 'The BROKEN vase lay on the floor.']
            }
        ]
    },
    {
        id: 'question-tags',
        title: '24. Question Tags',
        description: 'Using short questions at the end of sentences.',
        subtopics: [
            {
                title: 'Basic Rule',
                structure: 'Positive statement -> Negative tag & vice versa',
                explanation: 'Used in spoken English to confirm information.',
                examples: ['You are a doctor, AREN\'T YOU?', 'He doesn\'t like pizza, DOES HE?']
            }
        ]
    },
    {
        id: 'punctuation',
        title: '25. Punctuation Marks',
        description: 'Master commas, semicolons, dashes, and colons.',
        resourceLink: 'https://www.thepunctuationguide.com/',
        subtopics: [
            {
                title: 'Commas',
                structure: 'Pauses & Separations',
                explanation: 'Separates list items, joins independent clauses with FANBOYS, and isolates introductory phrases.',
                examples: ['I bought milk, eggs, and bread.']
            },
            {
                title: 'Semicolons',
                structure: 'Connecting heavily related clauses',
                explanation: 'Used to link two independent clauses closely related in thought, without using a conjunction.',
                examples: ['I have a big test tomorrow; I can\'t go out tonight.']
            },
            {
                title: 'Colons',
                structure: 'Introducing lists or explanations',
                explanation: 'Means "here is what I mean". Often introduces a list or quote.',
                examples: ['You have two choices: fight or flight.']
            }
        ]
    },
    {
        id: 'capitalization',
        title: '26. Capitalization Rules',
        description: 'When it is absolutely mandatory to use Capital Letters.',
        subtopics: [
            {
                title: 'Mins Rule',
                structure: 'Months, Names, Titles, Start of sentence',
                explanation: 'Capitalize proper nouns, the pronoun "I", and specific geographical names.',
                examples: ['I visited President Lincoln in Washington, D.C. in July.', 'My native language is French.']
            }
        ]
    }
];

module.exports = grammarTopicsData;
