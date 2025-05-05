import React, { useState } from 'react';

interface EmailFormProps {
  onSubmit: (email: string) => void;
  loading?: boolean;
  error?: string | null;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const isValidEmail = (email: string) => /.+@.+\..+/.test(email);
  const showError = (touched && !isValidEmail(email)) || !!error;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValidEmail(email)) {
      onSubmit(email);
      setSuccess('Welcome! Loading your chat...');
      setTimeout(() => setSuccess(null), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-6 border border-white/30 glass-card"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2 drop-shadow">Welcome to Jaza Kiti Chat</h2>
        <p className="text-gray-500 text-center mb-4">Enter your email to start chatting</p>
        <input
          type="email"
          className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all text-gray-700 bg-white/40 backdrop-blur-md placeholder-gray-400 ${showError ? 'border-red-400' : 'border-gray-200'}`}
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={loading}
        />
        {showError && (
          <div className="text-red-500 text-sm -mt-4 mb-2 bg-red-100/80 backdrop-blur-md px-2 py-1 rounded border border-red-200/60 glass-card">
            {error || 'Please enter a valid email address.'}
          </div>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition-all disabled:opacity-60"
          disabled={loading || !isValidEmail(email)}
        >
          {loading ? 'Loading...' : 'Start Chatting'}
        </button>
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg border border-white/30 flex flex-col items-center">
              <div className="loader mb-2" />
              <span className="text-indigo-700 font-semibold">Loading...</span>
            </div>
          </div>
        )}
        {/* Success Message */}
        {success && (
          <div className="absolute left-0 right-0 bottom-8 flex justify-center z-40">
            <div className="bg-green-100/80 backdrop-blur-md text-green-700 px-4 py-2 rounded shadow text-sm border border-green-200/60 glass-card">
              {success}
            </div>
          </div>
        )}
      </form>
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

export default EmailForm; 