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
    <div className="flex flex-col items-center justify-center p-8 bg-transparent w-full h-full relative group">
      <div className="absolute inset-0 bg-gradient-to-tl from-onclip-accent/10 to-transparent pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
      
      <div className="relative z-10 max-w-sm w-full space-y-8 flex flex-col items-center">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-onclip-bg-alt text-onclip-accent-dark mb-2 shadow-sm border border-onclip-accent/40">
            <Download className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-onclip-text uppercase">Receive Text</h2>
          <div className="space-y-2 mt-2 px-2">
            <p className="text-onclip-text/80 text-sm md:text-base font-medium leading-relaxed">
              Instantly retrieve shared snippets directly to your clipboard. Simply enter the unique 6-digit access code provided by the sender.
            </p>
          </div>
        </div>

        <form onSubmit={handleReceive} className="w-full space-y-4">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="000000"
            className="w-full text-center text-4xl tracking-[0.5em] font-extrabold py-4 md:py-5 px-4 bg-white/40 backdrop-blur-sm border-2 border-onclip-accent/30 rounded-2xl text-onclip-text placeholder:text-onclip-text/30 focus:outline-none focus:border-onclip-accent focus:ring-4 focus:ring-onclip-accent/20 transition-all font-mono shadow-inner"
          />

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full flex items-center justify-center gap-3 relative overflow-hidden group rounded-2xl bg-onclip-text px-8 py-5 text-onclip-bg text-lg font-semibold shadow-xl border border-onclip-text/20 hover:bg-onclip-accent-dark transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-onclip-bg/70" />
            ) : (
              <>
                <Download className="w-6 h-6 shrink-0 text-onclip-bg" />
                <span>Get Text</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
