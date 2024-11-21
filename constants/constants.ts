export const AUTHOR_EMAIL = 'me@example.com';
export const AUTHOR_NAME = 'My Name';
export const AUTHOR_NICKNAME = 'My Nickname';

export const GITHUB_USERNAME = 'username';
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

export const COMPANY_NAME = 'Me, inc..';

export const APP_NAME = 'My OS';
export const APP_VERSION = '';

export const COPYRIGHT_YEAR = '2000-2005';
export const COPYRIGHT_TEXT = `© ${COPYRIGHT_YEAR} ${COMPANY_NAME} | ALL RIGHTS RESERVED`;

export const WEBSITE_TITLE = "My OS-Like Website"

// Component Information
// ABOUT ME
export const ABOUT_BIO = 'Example About Me Content';
export const ABOUT_SKILLS = ['Skill 1', 'Skill 2', 'Skill 3'];
export const ABOUT_INTERESTS = ['Interest 1', 'Interest 2', 'Interest 3'];

// CHAT
export const CHAT_DEFAULT_RESPONSES = {
  greeting: "Hey there! I'm ... How can I help you today?",
  skills: 'I specialize in ...',
  experience: "I've been ....",
  projects: 'Check out my Github...',
  contact: 'Feel free to reach out via email...',
  default: "That's an interesting topic...",
};
export const CHAT_OLLAMA_SYSTEM_MESSAGE = {
  role: 'system',
  content: `I am Me-GPT, an ai made to handle people's outreach. 
    I respond as ${AUTHOR_NAME}, with his knowledge, experience, and personality. 
    I am typing via an online chat application, so I keep my responses short and sweet!
    `,
};
export const CHAT_INTRO_MESSAGES = [
  {
    id: 2,
    text: `Welcome to Ai Chat!`,
    sender: 'me-GPT',
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: 3,
    text: `I'm not around right now... Reach out with the contact methods below!`,
    sender: 'me-GPT',
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: 4,
    text: `In the meantime, feel free to talk to me! I run on WebLLM. WebLLM doesn't require an install, but only works on certain browsers and copmuters.`,
    sender: 'me-GPT',
    timestamp: new Date().toLocaleTimeString(),
  },
];
