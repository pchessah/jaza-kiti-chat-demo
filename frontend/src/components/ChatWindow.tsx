import React, { useRef, useEffect, useState } from 'react';
import { Message } from '../interfaces/Message';

interface ChatWindowProps {
  messages: Message[];
  onSend: (content: string) => void;
  loading?: boolean;
  error?: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend, loading, error }) => {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    setSuccess(null);
    await onSend(input);
    setInput('');
    setSending(false);
    setSuccess('Message sent!');
    setTimeout(() => setSuccess(null), 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <div className="flex-shrink-0 px-6 py-4 bg-white/60 backdrop-blur-md shadow-md z-10 rounded-b-2xl border-b border-white/30">
        <h2 className="text-xl font-bold text-indigo-700 drop-shadow">Jaza Kiti Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-4 md:px-8 md:py-6 space-y-2">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">No messages yet. Start the conversation!</div>
        )}
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-md text-base break-words transition-all glass-card
                ${msg.sender === 'user'
                  ? 'bg-indigo-600/80 text-white rounded-br-none backdrop-blur-md'
                  : 'bg-white/60 text-gray-800 rounded-bl-none border border-white/30 backdrop-blur-md'}
              `}
              style={{ boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
              <div>{msg.content}</div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 px-4 py-3 bg-white/60 backdrop-blur-md border-t border-white/30 shadow-lg sticky bottom-0 z-20 rounded-t-2xl"
        style={{ boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10)' }}
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all text-gray-700 bg-white/40 backdrop-blur-md placeholder-gray-400"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading || sending}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all disabled:opacity-60"
          disabled={loading || sending || !input.trim()}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
      {/* Loading Overlay */}
      {(loading || sending) && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg border border-white/30 flex flex-col items-center">
            <div className="loader mb-2" />
            <span className="text-indigo-700 font-semibold">{sending ? 'Sending...' : 'Loading...'}</span>
          </div>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div className="absolute left-0 right-0 bottom-20 flex justify-center z-40">
          <div className="bg-red-100/80 backdrop-blur-md text-red-700 px-4 py-2 rounded shadow text-sm border border-red-200/60 glass-card">
            {error}
          </div>
        </div>
      )}
      {/* Success Message */}
      {success && (
        <div className="absolute left-0 right-0 bottom-32 flex justify-center z-40">
          <div className="bg-green-100/80 backdrop-blur-md text-green-700 px-4 py-2 rounded shadow text-sm border border-green-200/60 glass-card">
            {success}
          </div>
        </div>
      )}
      {/* Glassmorphism utility class */}
      <style jsx>{`
        .glass-card {
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .loader {
          border: 4px solid #e0e7ff;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatWindow; 