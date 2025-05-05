import { Message } from '../interfaces/Message';

const API_BASE = 'http://127.0.0.1:8000';


export async function submitEmail(email: string): Promise<Message[]> {
  try {
    const res = await fetch(`${API_BASE}/messages/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      throw new Error('Failed to submit email.');
    }
    const data = await res.json();
    // Expecting data.messages: Message[]
    return (data.messages || []).sort((a: Message, b: Message) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  } catch (err: any) {
    throw new Error(err.message || 'Network error.');
  }
}

export async function sendMessage(content: string, email: string): Promise<Message[]> {
  try {
    const res = await fetch(`${API_BASE}/messages/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, email }),
    });
    if (!res.ok) {
      throw new Error('Failed to send message.');
    }
    const data = await res.json();
    // Expecting data.user_message and data.admin_response
    const messages: Message[] = [];
    if (data.user_message) messages.push(data.user_message);
    if (data.admin_response) messages.push(data.admin_response);
    return messages;
  } catch (err: any) {
    throw new Error(err.message || 'Network error.');
  }
} 