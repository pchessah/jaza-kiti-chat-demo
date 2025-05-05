'use client';
import React, { useState } from 'react';
import EmailForm from '../components/EmailForm';
import ChatWindow from '../components/ChatWindow';
import { Message } from '../interfaces/Message';
import { submitEmail, sendMessage } from '../services/chatService';

const HomePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  const handleEmailSubmit = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const msgs = await submitEmail(email);
      setMessages(msgs);
      setEmailSubmitted(true);
      setUserEmail(email);
    } catch (err: any) {
      setError(err.message || 'Failed to submit email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    setError(null);
    setLoading(true);
    try {
      const newMsgs = await sendMessage(content, userEmail);
      setMessages((prev: Message[]) => [...prev, ...newMsgs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
    } catch (err: any) {
      setError(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return emailSubmitted ? (
    <ChatWindow
      messages={messages}
      onSend={handleSendMessage}
      loading={loading}
      error={error}
    />
  ) : (
    <EmailForm onSubmit={handleEmailSubmit} loading={loading} error={error} />
  );
};

export default HomePage;
