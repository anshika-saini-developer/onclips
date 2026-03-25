import { Toaster } from 'react-hot-toast';
import { SenderSection } from './components/SenderSection';
import { ReceiverSection } from './components/ReceiverSection';

function App() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-onclip-bg font-sans selection:bg-onclip-accent/30">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#C5BDAA',
            color: '#3E220F',
            borderRadius: '16px',
            border: '1px solid rgba(186, 150, 104, 0.4)',
            padding: '16px 24px',
            boxShadow: '0 10px 15px -3px rgba(62, 34, 15, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#78583E',
              secondary: '#EAE8D7',
            },
          },
          error: {
            iconTheme: {
              primary: '#3E220F',
              secondary: '#C5BDAA',
            },
          }
        }} 
      />
      
      {/* Left Ad Space */}
      <aside className="hidden lg:flex w-48 xl:w-64 h-full border-r border-onclip-accent/20 p-6 bg-onclip-bg/50 shrink-0">
        <div className="w-full h-full border-2 border-dashed border-onclip-accent/30 rounded-2xl flex flex-col items-center justify-center text-onclip-text/40 space-y-2 p-4 text-center">
          <span className="text-sm font-bold uppercase tracking-widest">Google Ads</span>
          <span className="text-xs">Advertisement Space (Left)</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Title ONCLIP on top left */}
        <div className="absolute top-6 left-6 md:top-8 md:left-12 z-40">
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.2em] text-onclip-text uppercase">
            OnClip
          </h1>
        </div>

        {/* Chrome Extension Promo */}
        <div className="absolute top-6 right-6 md:top-8 md:right-12 z-40">
          <div className="flex items-center gap-2 md:gap-3 bg-onclip-text text-onclip-bg px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg border border-onclip-text/20 hover:scale-105 transition-transform cursor-default">
            <span className="text-xs md:text-sm font-semibold opacity-90 hidden sm:inline">Try our Chrome Extension</span>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-onclip-accent text-onclip-text text-xs font-bold rounded-full hover:bg-onclip-accent-dark hover:text-onclip-bg transition-colors shadow-sm whitespace-nowrap"
            >
              Get Extension
            </a>
          </div>
        </div>

        {/* Split Layout Container */}
        <div className="flex-1 flex flex-col md:flex-row w-full h-full relative z-10 pt-24 md:pt-28 pb-16">
          <div className="flex-1 flex w-full h-full relative z-10">
            <SenderSection />
          </div>

          <div className="w-[80%] h-[1px] md:w-[1px] md:h-[70%] bg-onclip-accent/20 flex-shrink-0 z-20 relative self-center mx-auto md:mx-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-onclip-bg border-2 border-onclip-accent/30 rounded-full w-12 h-12 flex items-center justify-center text-xs font-bold text-onclip-accent-dark z-30 shadow-sm hidden md:flex">
               OR
             </div>
          </div>

          <div className="flex-1 flex w-full h-full relative z-10">
            <ReceiverSection />
          </div>
        </div>
        
        {/* Footer Area with Privacy Policy */}
        <div className="absolute bottom-6 w-full text-center z-30">
          <a href="/privacy" className="text-sm font-semibold text-onclip-text/60 hover:text-onclip-text transition-colors underline decoration-onclip-accent/50 underline-offset-4 pointer-events-auto">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Right Ad Space */}
      <aside className="hidden lg:flex w-48 xl:w-64 h-full border-l border-onclip-accent/20 p-6 bg-onclip-bg/50 shrink-0">
        <div className="w-full h-full border-2 border-dashed border-onclip-accent/30 rounded-2xl flex flex-col items-center justify-center text-onclip-text/40 space-y-2 p-4 text-center">
          <span className="text-sm font-bold uppercase tracking-widest">Google Ads</span>
          <span className="text-xs">Advertisement Space (Right)</span>
        </div>
      </aside>
    </main>
  );
}

export default App;
