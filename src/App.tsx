import { Toaster } from 'react-hot-toast';
import { SenderSection } from './components/SenderSection';
import { ReceiverSection } from './components/ReceiverSection';

function App() {
  return (
    <main className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-zinc-950 font-sans selection:bg-purple-500/30">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#27272a',
            color: '#fff',
            borderRadius: '16px',
            border: '1px solid #3f3f46',
            padding: '16px 24px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }} 
      />
      
      {/* Split Layout Container */}
      <div className="flex-1 flex w-full h-full relative z-10">
        <SenderSection />
      </div>

      <div className="w-full h-[1px] md:w-[1px] md:h-full bg-border flex-shrink-0 z-20 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold text-zinc-400 z-30 shadow-sm hidden md:flex">
           OR
         </div>
      </div>

      <div className="flex-1 flex w-full h-full relative z-10">
        <ReceiverSection />
      </div>
    </main>
  );
}

export default App;
