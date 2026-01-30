/**
 * Generates an "AI-like" ultra-short summary from a bio.
 * Uses NLP-lite heuristics to extract entities and synthesize a formatted tagline.
 * @param {string} text - The full bio text.
 * @returns {string} - The generated summary (tagline).
 */
export const getSmartSummary = (text) => {
    if (!text) return '';

    const lower = text.toLowerCase();

    // 1. Extract Years of Experience (e.g., "14 years", "10+ years")
    const yearsMatch = text.match(/(\d+\+?)\s*years?/i);
    const years = yearsMatch ? yearsMatch[1] : null;

    // 2. Extract Role
    // We search for specific titles. Sort by length desc to match "Associate Professor" before "Professor".
    const knownRoles = [
        'Associate Professor', 'Assistant Professor', 'Professor',
        'Senior Engineer', 'Software Engineer', 'Engineer',
        'Developer', 'Architect', 'Data Scientist', 'Scientist',
        'Researcher', 'Consultant', 'Director', 'Head of Dept', 'Head', 'Professional'
    ];
    let role = knownRoles.find(r => text.includes(r));
    if (!role) role = 'Expert'; // Generic fallback

    // 3. Extract Topic/Domain
    // Look for key phrases and grab the following words
    const topicTriggers = ['specializing in', 'specializes in', 'expert in', 'working on', 'research in', 'field of', 'domain of', 'passionate about'];
    let topic = '';

    for (const trigger of topicTriggers) {
        if (lower.includes(trigger)) {
            const index = lower.indexOf(trigger) + trigger.length;
            // Get text after trigger
            let suffix = text.substring(index).trim();
            // Take the first 3-4 words or until punctuation
            const match = suffix.match(/^([a-zA-Z\s]+)(?:[.,]|$)/);
            if (match) {
                // Limit to roughly 4 words to keep it "ultra short"
                const wordCount = match[1].split(' ').length;
                if (wordCount > 6) {
                    topic = match[1].split(' ').slice(0, 4).join(' ');
                } else {
                    topic = match[1];
                }
                break;
            }
        }
    }

    // Topic Fallback: Check for known tech keywords if phrase extraction failed
    if (!topic) {
        const commonTech = ['IoT', 'AI', 'Machine Learning', 'Robotics', 'Cloud Computing', 'Android', 'Web Development', 'Blockchain', 'Cybersecurity', 'Data Science'];
        const found = commonTech.find(t => text.includes(t));
        if (found) topic = found;
    }

    // --- Synthesis: Generative Templates ---

    // Pattern 1: Full Combo
    if (role !== 'Expert' && years && topic) {
        return `${role} with ${years} years in ${topic}.`;
    }

    // Pattern 2: Role + Years
    if (role !== 'Expert' && years) {
        return `${role} with ${years} years of experience.`;
    }

    // Pattern 3: Role + Topic
    if (role !== 'Expert' && topic) {
        return `${role} specializing in ${topic}.`;
    }

    // Pattern 4: Years + Topic (using generic 'Expert')
    if (years && topic) {
        return `Expert with ${years} years in ${topic}.`;
    }

    // Fallback: If we couldn't generate a synthetic line, return the first sentence (truncated)
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    const firstSentence = sentences[0].trim();
    return firstSentence.length > 85 ? firstSentence.substring(0, 82) + '...' : firstSentence;
};
