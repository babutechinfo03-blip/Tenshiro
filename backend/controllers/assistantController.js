const Groq = require('groq-sdk');
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

// Language display names & speech codes
const LANG_META = {
    en: { name: 'English', speech: 'en-US', code: 'eng_Latn' },
    ta: { name: 'Tamil', speech: 'ta-IN', code: 'tam_Taml' },
    hi: { name: 'Hindi', speech: 'hi-IN', code: 'hin_Deva' },
    te: { name: 'Telugu', speech: 'te-IN', code: 'tel_Telu' },
    ml: { name: 'Malayalam', speech: 'ml-IN', code: 'mal_Mlym' },
    kn: { name: 'Kannada', speech: 'kn-IN', code: 'kan_Knda' },
};

const SYSTEM_PROMPT = `You are PathPilot AI, an advanced AI career mentor.

GOAL: Provide career guidance formatted in beautiful, highly readable Markdown.

CRITICAL FORMATTING RULES:
1. **Use standard Markdown** for all your output.
2. **Point-by-Point Focus:** Break down all answers into bulleted (\`-\` or \`*\`) or numbered (\`1.\`, \`2.\`) lists extensively. Do not use long paragraphs.
3. Use **bold text** to highlight important keywords or key phrases.
4. Keep the structure clean, modern, and easily scannable, exactly like ChatGPT or Gemini.

CRITICAL SYSTEM INSTRUCTION:
You MUST start your response with a language prefix: [LANG: code]
Codes: en (English/Tanglish), ta (Tamil), hi (Hindi).

LANGUAGE RULE:
Detect user language (English, Tamil, or Tanglish) and respond in the same language.`;

// ── POST /api/pathpilot-ai ─────────────────────────────────────────────────
exports.pathpilotChat = async (req, res) => {
    const { message, history = [], language = 'en' } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'Message required' });

    if (!GROQ_API_KEY) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not configured in .env' });
    }

    try {
        const requestedLangName = LANG_META[language]?.name || 'English';
        const activeSystemPrompt = `${SYSTEM_PROMPT}\n\nCRITICAL LANGUAGE ENFORCEMENT:\nThe user has requested the response to be in: ${requestedLangName}.\nYou MUST respond EXCLUSIVELY in this language (${requestedLangName}). Start your response with '[LANG: ${language}]'.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: activeSystemPrompt },
                ...history,
                { role: "user", content: message }
            ],
            model: "openai/gpt-oss-20b",
            temperature: 0.7,
            max_tokens: 1512,
            top_p: 1,
            stream: false,
        });

        let reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

        // Extract detected language prefix [LANG: code]
        let detectedLanguage = language;
        const langMatch = reply.match(/^\[LANG:\s*([a-z]{2})\]/i);
        if (langMatch) {
            detectedLanguage = langMatch[1].toLowerCase();
            reply = reply.replace(/^\[LANG:\s*[a-z]{2}\]/i, '').trim();
        }

        return res.json({ reply, language: detectedLanguage });

    } catch (err) {
        console.error('[PathPilot AI] Groq error:', err.message);
        return res.status(500).json({ error: `Groq API Error: ${err.message}` });
    }
};

// ── POST /api/assistant (legacy backward-compat) ──────────────────────────
exports.chat = async (req, res) => {
    const { message, history = [] } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'Message required' });

    if (!GROQ_API_KEY) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not configured in .env' });
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...history.slice(-5),
                { role: "user", content: message }
            ],
            model: "openai/gpt-oss-20b",
            temperature: 0.7,
            max_tokens: 1512,
        });

        const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
        return res.json({ response: reply });
    } catch (err) {
        console.error('[Assistant] Groq error:', err.message);
        return res.status(500).json({ error: `Groq API Error: ${err.message}` });
    }
};
