import { useState } from 'react';
import { CopyIcon, Loader2, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { saveClip } from '../lib/db';

export function SenderSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastId, setLastId] = useState<string | null>(null);

  const handleSend = async () => {
    try {
      setIsLoading(true);
      const text = await navigator.clipboard.readText();
      
      if (!text || text.trim() === '') {
        toast.error('Your clipboard is empty!');
        setIsLoading(false);
        return;
      }

      const newId = await saveClip(text);
      setLastId(newId);
      toast.success('Text sent successfully!');
    } catch (error: any) {
      console.error(error);
      if (error && error.code === 'not-found') {
        toast.error('Firestore Database not found! Please go to your Firebase Console and click "Create Database" in the Firestore section.', { duration: 6000 });
      } else if (error && error.code === 'permission-denied') {
        toast.error('Firebase Permissions Error! Please update your Firestore Security Rules to allow writes.', { duration: 6000 });
      } else {
        toast.error(error?.message || 'Failed to read clipboard or save data.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-transparent w-full h-full relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-onclip-accent/20 to-transparent pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
      
      <div className="relative z-10 max-w-sm w-full space-y-8 flex flex-col items-center">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-onclip-accent/20 text-onclip-accent-dark mb-2 shadow-sm border border-onclip-accent/30">
            <Send className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-onclip-text uppercase">Send Text</h2>
          <div className="space-y-2 mt-2 px-2">
            <p className="text-onclip-text/80 text-sm md:text-base font-medium leading-relaxed">
              Securely share your clipboard content across devices in seconds. Click the button below to generate a unique, highly secure 6-digit access code for your text.
            </p>
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={isLoading}
          className="relative overflow-hidden w-full group rounded-2xl bg-onclip-text px-6 py-4 md:py-5 text-onclip-bg text-base md:text-lg font-semibold shadow-xl shadow-onclip-text/10 hover:bg-onclip-accent-dark transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3 border border-onclip-text/20"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <CopyIcon className="w-6 h-6 shrink-0" />
              <span>Send from Clipboard</span>
            </>
          )}
        </button>

        {lastId && (
          <div className="w-full p-6 rounded-2xl bg-onclip-bg-alt/50 border border-onclip-accent/40 shadow-sm animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-2 backdrop-blur-sm">
            <span className="text-sm font-semibold text-onclip-text/80 uppercase tracking-widest">Your Code</span>
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-onclip-accent-dark to-onclip-text tracking-widest drop-shadow-sm">
              {lastId}
            </span>
            <span className="text-xs font-medium text-onclip-text/60 mt-2">Expires in 15 minutes</span>
          </div>
        )}
      </div>
    </div>
  );
}
