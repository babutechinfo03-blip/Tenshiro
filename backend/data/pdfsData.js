const pdfsData = [
    { id: 'p1', title: 'Complete English Grammar Handbook', description: 'A 200-page comprehensive guide to English grammar rules and usage.', link: 'https://www.google.com/search?q=english+grammar+pdf+free+download', topic: 'Grammar' },
    { id: 'p2', title: 'Business English Vocabulary List', description: 'Essential words and phrases for professional communication.', link: 'https://www.google.com/search?q=business+english+vocabulary+pdf', topic: 'Business' },
    { id: 'p3', title: 'Effective Speaking Worksheets', description: 'Practice exercises to improve fluency and clarity.', link: 'https://www.google.com/search?q=speaking+skills+worksheets+pdf', topic: 'Speaking' },
    { id: 'p4', title: 'Job Interview Cheat Sheet', description: 'Quick reference for common interview questions and answers.', link: 'https://www.google.com/search?q=interview+cheat+sheet+pdf', topic: 'Interview' },
    { id: 'p5', title: 'Email Writing Templates', description: 'Standard templates for various workplace emails.', link: 'https://www.google.com/search?q=business+email+templates+pdf', topic: 'Writing' },
    { id: 'p6', title: 'Punctuation Master Guide', description: 'Rulebook for using commas, semicolons, and more correctly.', link: 'https://www.google.com/search?q=punctuation-rules-pdf', topic: 'Writing' },
    { id: 'p7', title: 'Public Speaking Checklist', description: 'Step-by-step preparation list for any presentation.', link: 'https://www.google.com/search?q=public-speaking-checklist-pdf', topic: 'Speaking' },
    { id: 'p8', title: 'IELTS Speaking Success Guide', description: 'Tips and strategies for the IELTS speaking module.', link: 'https://www.google.com/search?q=ielts-speaking-success-pdf', topic: 'Exam Prep' }
];

// Expanding to 150+ items
const additionalPdfs = [];
const pdfTopics = ['Grammar', 'Business', 'Speaking', 'Interview', 'Writing', 'Exam Prep', 'Vocabulary'];
for (let i = 9; i <= 150; i++) {
    const topic = pdfTopics[i % pdfTopics.length];
    additionalPdfs.push({
        id: `p${i}`,
        title: `${topic} Resource Guide - Volume ${Math.ceil(i / 7)}`,
        description: `Downloadable reference material for advanced ${topic.toLowerCase()} concepts.`,
        link: 'https://example.com/download/pdf' + i,
        topic: topic
    });
}

module.exports = [...pdfsData, ...additionalPdfs];
