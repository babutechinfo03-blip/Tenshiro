// Procedurally generated Premium Resume Templates database
// Provides 150+ unique templates across categories with diverse design configurations.

const CATEGORIES = ["Technology", "Freshers", "Corporate", "Academic", "Startup", "Minimal", "Executive", "International"];

const FONT_OPTIONS = [
    { header: "'Outfit', sans-serif", body: "'Inter', sans-serif" },
    { header: "'Plus Jakarta Sans', sans-serif", body: "'Inter', sans-serif" },
    { header: "'Roboto', sans-serif", body: "'Roboto', sans-serif" },
    { header: "'Playfair Display', serif", body: "'Inter', sans-serif" },
    { header: "'Merriweather', serif", body: "Georgia, serif" },
    { header: "Georgia, serif", body: "Georgia, serif" }
];

const COLOR_PALETTES = [
    { name: "Monochrome Classic", primary: "#000000", secondary: "#333333", text: "#111111", accent: "#555555", bg: "#ffffff" },
    { name: "Minimalist Charcoal", primary: "#18181b", secondary: "#52525b", text: "#27272a", accent: "#71717a", bg: "#ffffff" },
    { name: "Pure Black", primary: "#09090b", secondary: "#27272a", text: "#09090b", accent: "#3f3f46", bg: "#ffffff" },
    { name: "Slate Professional", primary: "#1e293b", secondary: "#475569", text: "#0f172a", accent: "#64748b", bg: "#ffffff" },
    { name: "Cool Executive", primary: "#0f172a", secondary: "#334155", text: "#1e293b", accent: "#475569", bg: "#ffffff" },
    { name: "Warm Editorial", primary: "#1c1917", secondary: "#57534e", text: "#1c1917", accent: "#78716c", bg: "#fafaf9" },
    { name: "Navy Corporate", primary: "#1e3a8a", secondary: "#3b82f6", text: "#1f2937", accent: "#0ea5e9", bg: "#ffffff" },
    { name: "Charcoal Executive", primary: "#111827", secondary: "#374151", text: "#1f2937", accent: "#d97706", bg: "#ffffff" },
    { name: "Teal Modern", primary: "#0f766e", secondary: "#115e59", text: "#0f172a", accent: "#14b8a6", bg: "#ffffff" },
    { name: "Indigo Tech", primary: "#4f46e5", secondary: "#312e81", text: "#111827", accent: "#a855f7", bg: "#ffffff" },
    { name: "Creative Royal", primary: "#6d28d9", secondary: "#4c1d95", text: "#111827", accent: "#ec4899", bg: "#ffffff" },
    { name: "Terracotta Warm", primary: "#7c2d12", secondary: "#9a3412", text: "#1c1917", accent: "#ea580c", bg: "#fafaf9" }
];

const LAYOUTS = ["standard", "leftSidebar", "rightSidebar", "timeline", "doubleColumn", "headerLeft", "academic", "topAccent"];
const HEADER_STYLES = ["splitHeader", "centered"];
const SPACING_OPTIONS = ["compact", "spacious"];

const TEMPLATE_NAMES = {
    Technology: ["DevOps Pioneer", "FAANG Standard", "FullStack Architect", "AI Research Fellow", "SaaS Builder", "CyberSec Sentinel", "Cloud Native Architect", "Data Scientist Pro", "Systems Specialist", "Agile Innovator"],
    Freshers: ["Entry Level Classic", "Graduate Launchpad", "Internship Ready", "First Step Modern", "Academic Starter", "Skills Highlight", "Clean Canvas", "New Beginnings", "Junior Dev Standard", "Career Starter"],
    Corporate: ["Wall Street Senior", "Enterprise Manager", "Consulting Partner", "Operations Director", "HR Strategist", "Business Analyst Pro", "Global Supply Executive", "Financial Planner", "Sales Pioneer", "Marketing Lead"],
    Academic: ["CV Scholar", "PostDoc Researcher", "Faculty Standard", "Grant Proposal Layout", "Medical CV Elite", "Ivy League Academic", "Scientific Fellow", "PhD Dissertation Focus", "Research Specialist", "Classical EducatorCV"],
    Startup: ["Disruptive Builder", "Growth Marketer", "Lean Product Manager", "Co-Founder Profile", "Agile Specialist", "Web3 Developer", "Venture Profile", "Creative Evangelist", "Unicorn Dev", "Bootstrapped Leader"],
    Minimal: ["Pure White", "Slate Simplicity", "Clean Nordic", "Zen Balance", "Strict Monochrome", "Ultra Compact", "Essence Only", "Elegance", "Plain Standard", "Modernist Outline"],
    Executive: ["Boardroom Ready", "C-Suite Leader", "VP Operations", "Managing Director", "Managing Partner", "Senior Advisor", "Corporate Officer", "Principal Consultant", "Strategic Pioneer", "Legacy Elite"],
    International: ["Europass Modern", "UK Standard Clean", "Global CV Pro", "Cross-Border Executive", "Multilingual Layout", "Schengen Standard", "Asia-Pacific Lead", "US Resumee Standard", "Bilingual Elite", "Universal Minimalist"]
};

const generateTemplates = () => {
    const featuredTemplates = [
        {
            id: "altacv_featured",
            name: "AltaCV Template (Overleaf)",
            category: "Technology",
            atsFriendly: 96,
            downloads: 4820,
            popularity: 4.9,
            recommendedFor: "Software Engineers & Researchers",
            industry: "Software & Research",
            experienceLevel: "Mid Level",
            config: {
                fonts: { header: "Georgia, serif", body: "'Inter', sans-serif" },
                colors: { name: "Navy Corporate", primary: "#1e3a8a", secondary: "#3b82f6", text: "#1f2937", accent: "#0ea5e9", bg: "#ffffff" },
                layout: "altacv",
                headerStyle: "splitHeader",
                sectionSpacing: "compact"
            }
        },
        {
            id: "hipster_featured",
            name: "Simple Hipster CV (Overleaf)",
            category: "Minimal",
            atsFriendly: 85,
            downloads: 3490,
            popularity: 4.8,
            recommendedFor: "Designers & Creative Developers",
            industry: "Creative Arts",
            experienceLevel: "Entry Level",
            config: {
                fonts: { header: "'Outfit', sans-serif", body: "'Inter', sans-serif" },
                colors: { name: "Charcoal Executive", primary: "#111827", secondary: "#374151", text: "#1f2937", accent: "#d97706", bg: "#ffffff" },
                layout: "hipstercv",
                headerStyle: "left-aligned",
                sectionSpacing: "compact"
            }
        },
        {
            id: "curve_featured",
            name: "A Customised CurVe CV (Overleaf)",
            category: "Academic",
            atsFriendly: 94,
            downloads: 2810,
            popularity: 4.7,
            recommendedFor: "Academic Researchers & PhDs",
            industry: "Education & Science",
            experienceLevel: "Senior Level",
            config: {
                fonts: { header: "'Playfair Display', serif", body: "'Inter', sans-serif" },
                colors: { name: "Terracotta Warm", primary: "#7c2d12", secondary: "#9a3412", text: "#1c1917", accent: "#ea580c", bg: "#fafaf9" },
                layout: "curvecv",
                headerStyle: "left-aligned",
                sectionSpacing: "spacious"
            }
        }
    ];

    const templates = [];
    let idCounter = 1;

    CATEGORIES.forEach((category) => {
        const names = TEMPLATE_NAMES[category] || ["Professional Layout"];
        
        // Generate about 30 templates per category to reach ~240 templates
        for (let i = 0; i < 30; i++) {
            const nameIndex = i % names.length;
            const baseName = names[nameIndex];
            const variantNumber = Math.floor(i / names.length) + 1;
            const name = variantNumber > 1 ? `${baseName} (Variant ${variantNumber})` : baseName;

            const palette = COLOR_PALETTES[idCounter % COLOR_PALETTES.length];
            const font = FONT_OPTIONS[idCounter % FONT_OPTIONS.length];
            const layout = LAYOUTS[idCounter % LAYOUTS.length];
            const headerStyle = HEADER_STYLES[idCounter % HEADER_STYLES.length];
            const sectionSpacing = SPACING_OPTIONS[idCounter % SPACING_OPTIONS.length];

            // ATS Score bias based on layout - single column layouts rank higher
            let atsFriendly = 82 + (idCounter % 18);
            if (layout === "standard" || layout === "timeline") {
                atsFriendly = Math.min(99, atsFriendly + 5);
            }

            const downloads = 150 + ((idCounter * 37) % 4500);
            const popularity = (4.4 + ((idCounter % 6) * 0.1)).toFixed(1);

            templates.push({
                id: `${category.toLowerCase()}_tpl_${idCounter}`,
                name: name,
                category: category,
                atsFriendly: atsFriendly,
                downloads: downloads,
                popularity: parseFloat(popularity),
                recommendedFor: getRecommendedRole(category, i),
                industry: getIndustry(category),
                experienceLevel: getExperienceLevel(category, i),
                config: {
                    fonts: font,
                    colors: palette,
                    layout: layout,
                    headerStyle: headerStyle,
                    sectionSpacing: sectionSpacing
                }
            });
            idCounter++;
        }
    });

    return [...featuredTemplates, ...templates];
};

const getRecommendedRole = (category, index) => {
    const roles = {
        Technology: ["Software Engineer", "DevOps Engineer", "Data Scientist", "Cloud Architect", "Frontend Developer"],
        Freshers: ["Graduate Assistant", "Intern", "Junior Developer", "Associate Analyst", "Management Trainee"],
        Corporate: ["Product Manager", "Operations Lead", "Financial Analyst", "HR Specialist", "Business Consultant"],
        Academic: ["Research Assistant", "PhD Candidate", "Lecturer", "Scientific Writer", "PostDoc Researcher"],
        Startup: ["Fullstack Engineer", "Growth Hacker", "Founding Engineer", "UX/UI Designer", "Product Owner"],
        Minimal: ["Graphic Designer", "Content Writer", "Consultant", "Project Coordinator", "Freelancer"],
        Executive: ["VP of Product", "Director of Engineering", "Chief Technology Officer", "Managing Director", "Chief Operations Officer"],
        International: ["Global Project Manager", "Export Coordinator", "Bilingual Advisor", "International Consultant", "Diplomatic Liaison"]
    };
    const list = roles[category] || ["Professional"];
    return list[index % list.length];
};

const getIndustry = (category) => {
    const industries = {
        Technology: "Software & Technology",
        Freshers: "General Entry",
        Corporate: "Business Services",
        Academic: "Education & Research",
        Startup: "Internet & SaaS",
        Minimal: "Creative & General",
        Executive: "Corporate Leadership",
        International: "Global Business"
    };
    return industries[category] || "General Business";
};

const getExperienceLevel = (category, index) => {
    if (category === "Freshers") return "Entry Level";
    if (category === "Executive") return "Senior Executive";
    
    const levels = ["Mid Level", "Senior Level", "Entry Level"];
    return levels[index % levels.length];
};

export const ALL_TEMPLATES = generateTemplates();
