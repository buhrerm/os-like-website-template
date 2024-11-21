import { CHAT_DEFAULT_RESPONSES, CHAT_OLLAMA_SYSTEM_MESSAGE } from '../../constants/constants';

export async function checkWebGPUAvailability(): Promise<boolean> {
  return false;
}

// Ollama integration
interface OllamaModel {
  name: string;
  // Add other properties if needed
}

export async function fetchOllamaModels(): Promise<string[]> {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    const data: { models: OllamaModel[] } = await response.json();
    return data.models.map((model: OllamaModel) => model.name);
  } catch (error) {
    console.error('Failed to fetch Ollama models:', error);
    return [];
  }
}

function decodeBase64(base64String: string): string {
  if (typeof window !== 'undefined' && window.atob) {
    return window.atob(base64String);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64String, 'base64').toString('utf-8');
  } else {
    throw new Error('Unable to decode base64 string: environment not supported');
  }
}

export async function generateOllamaResponse(
  messages: Array<{ role: string; content: string }>,
  model: string
): Promise<string> {
  try {
    // Add a system message to instruct the model to pretend to be you
    const fullMessages = [CHAT_OLLAMA_SYSTEM_MESSAGE, ...messages];

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: fullMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: {
      response?: string;
      base64_response?: string;
      message?: { content: string };
    } = await response.json();

    if (data.response) {
      return data.response;
    } else if (data.base64_response) {
      return decodeBase64(data.base64_response);
    } else if (data.message?.content) {
      return data.message.content;
    } else {
      throw new Error('Unexpected response format from Ollama');
    }
  } catch (error) {
    console.error('Error generating Ollama response:', error);
    throw error;
  }
}

export function getSimulatedResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('skills') || lowerInput.includes('what can you do')) {
    return CHAT_DEFAULT_RESPONSES.skills;
  } else if (lowerInput.includes('experience')) {
    return CHAT_DEFAULT_RESPONSES.experience;
  } else if (lowerInput.includes('project')) {
    return CHAT_DEFAULT_RESPONSES.projects;
  } else if (lowerInput.includes('contact') || lowerInput.includes('email')) {
    return CHAT_DEFAULT_RESPONSES.contact;
  } else {
    return CHAT_DEFAULT_RESPONSES.default;
  }
}
