import React, { useState } from 'react';
import { X, Lock, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onSuccess }) => {
  const [passcode, setPasscode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [shaking, setShaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set static admin password logic
    if (passcode === 'admin123') {
      setError('');
      setPasscode('');
      onSuccess();
      onClose();
    } else {
      setError('Invalid Administrator Passcode');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPasscode('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden relative p-8 ${
          shaking ? 'animate-bounce' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-50 hover:bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 font-serif">Admin Access Portal</h3>
            <p className="text-sm text-gray-500 mt-2">
              Please enter the administrator passcode to access the quote manager and gallery dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                required
                autoFocus
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode (e.g. admin123)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-center font-bold tracking-widest text-lg transition-all"
              />
            </div>

            {error && (
              <p className="text-xs font-bold text-red-500 animate-pulse">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-rose-500/20 active:scale-97 transition-all flex items-center justify-center gap-2"
            >
              Authorize Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
