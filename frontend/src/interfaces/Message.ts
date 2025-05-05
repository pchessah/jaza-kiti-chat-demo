export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: string; // ISO string
} 