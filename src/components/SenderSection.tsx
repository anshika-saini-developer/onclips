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
    <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 w-full h-full relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-transparent pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
      
      <div className="relative z-10 max-w-sm w-full space-y-8 flex flex-col items-center">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-4 shadow-sm">
            <Send className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Send</h2>
          <p className="text-zinc-500">
            Copy text to your clipboard, then click below to generate a secure code.
          </p>
        </div>

        <button
          onClick={handleSend}
          disabled={isLoading}
          className="relative overflow-hidden w-full group rounded-2xl bg-zinc-900 px-8 py-6 text-white text-lg font-medium shadow-xl shadow-zinc-900/10 hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3"
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
          <div className="w-full p-6 rounded-2xl bg-white border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Your Code</span>
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-widest">
              {lastId}
            </span>
            <span className="text-xs text-zinc-400 mt-2">Expires in 15 minutes</span>
          </div>
        )}
      </div>
    </div>
  );
}
