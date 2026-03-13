const Groq = require('groq-sdk');
const fetch = require('node-fetch');
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });

// HuggingFace Model Endpoints
const TRANSLATE_URL = "https://api-inference.huggingface.co/models/facebook/nllb-200-distilled-600M";
const WHISPER_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3";
const EMBED_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2";

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

// Build Mistral instruction prompt (Legacy/Mistral compatible if needed)
const buildPrompt = (history, message, langName) => {
    let ctx = '';
    if (history && history.length > 0) {
        ctx = 'Recent conversation:\n' + history.map(m =>
            `${m.role === 'user' ? 'Student' : 'PathPilot AI'}: ${m.content}`
        ).join('\n') + '\n\n';
    }
    return `<s>[INST] ${SYSTEM_PROMPT}\n\n${ctx}Student: ${message} [/INST]`;
};

// Minimal fallback for connection issues
const getFallback = (msg) => {
    return "I'm having a bit of trouble connecting to my brain right now. Please try again in a moment, and I'll be ready to help you with your career journey!";
};

// ── HuggingFace Tools ────────────────────────────────────────────────────────
const hfRequest = async (url, data) => {
    if (!HF_API_KEY) return null;
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${HF_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!resp.ok) return null;
        return await resp.json();
    } catch (err) {
        console.error("HF Request Error:", err.message);
        return null;
    }
};

const translate = async (text, srcLangCode, targetLangCode) => {
    if (srcLangCode === targetLangCode || !text) return text;
    try {
        const result = await hfRequest(TRANSLATE_URL, {
            inputs: text,
            parameters: { src_lang: srcLangCode, tgt_lang: targetLangCode }
        });
        return result?.[0]?.translation_text || text;
    } catch (err) {
        console.error("Translation failed, using original text:", err.message);
        return text;
    }
};

// ── POST /api/pathpilot-ai ─────────────────────────────────────────────────
exports.pathpilotChat = async (req, res) => {
    const { message, history = [], language = 'en' } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'Message required' });

    try {
        // Groq AI Reasoning (llama3.1-8b)
        // We now let the LLM handle language detection and formatting directly as per SYSTEM_PROMPT
        if (!GROQ_API_KEY) {
            return res.json({ reply: getFallback(message), language });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...history,
                { role: "user", content: message }
            ],
            model: "llama-3.1-8b-instant",
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
        console.error('[PathPilot AI] Groq error:', err);
        return res.json({ reply: getFallback(message), language });
    }
};

// ── POST /api/assistant (legacy backward-compat) ──────────────────────────
exports.chat = async (req, res) => {
    const { message, history = [] } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'Message required' });

    try {
        if (!GROQ_API_KEY) return res.json({ response: getFallback(message) });

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...history.slice(-5),
                { role: "user", content: message }
            ],
            model: "llama-3.1-8b-instant",
        });

        return res.json({ response: completion.choices[0]?.message?.content || getFallback(message) });
    } catch (err) {
        return res.json({ response: getFallback(message) });
    }
};



