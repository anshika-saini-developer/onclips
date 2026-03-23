import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getClip } from '../lib/db';

export function ReceiverSection() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReceive = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    try {
      setIsLoading(true);
      const text = await getClip(code);

      if (!text) {
        toast.error('Invalid or expired code. Please try again.');
        return;
      }

      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard!');
      setCode('');
    } catch (error: any) {
      console.error(error);
      if (error && error.code === 'not-found') {
        toast.error('Firestore Database not found! Please go to your Firebase Console and click "Create Database".', { duration: 6000 });
      } else if (error && error.code === 'permission-denied') {
        toast.error('Firebase Permissions Error! Update your Firestore Rules to allow reads.', { duration: 6000 });
      } else {
        toast.error(error?.message || 'Failed to connect to database or copy text.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 w-full h-full relative group">
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/10 to-transparent pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
      
      <div className="relative z-10 max-w-sm w-full space-y-8 flex flex-col items-center">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 text-indigo-400 mb-4 shadow-sm border border-zinc-700">
            <Download className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Receive</h2>
          <p className="text-zinc-400">
            Enter your 6-digit code to instantly copy the shared text.
          </p>
        </div>

        <form onSubmit={handleReceive} className="w-full space-y-4">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="000000"
            className="w-full text-center text-4xl tracking-[0.5em] font-bold py-6 px-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
          />

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full flex items-center justify-center gap-3 relative overflow-hidden group rounded-2xl bg-white px-8 py-5 text-zinc-900 text-lg font-medium shadow-xl hover:bg-zinc-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
            ) : (
              <>
                <Download className="w-6 h-6 shrink-0 text-zinc-700" />
                <span>Get Text</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
