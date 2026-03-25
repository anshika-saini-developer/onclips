import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="h-screen w-screen bg-onclip-bg font-sans text-onclip-text selection:bg-onclip-accent/30 p-8 md:p-16 overflow-y-auto overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="flex items-center gap-4 mb-12">
          <a 
            href="/" 
            className="p-3 bg-onclip-bg-alt/50 rounded-xl hover:bg-onclip-accent/20 text-onclip-accent-dark transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </a>
          <h1 className="text-4xl font-black tracking-widest text-onclip-text uppercase">
            Privacy Policy
          </h1>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-onclip-accent-dark">1. Introduction</h2>
          <p className="text-onclip-text/80 leading-relaxed font-medium">
            Welcome to OnClip. We are committed to protecting your privacy and ensuring your data is handled securely. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our clipboard synchronization service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-onclip-accent-dark">2. Data Collection and Usage</h2>
          <p className="text-onclip-text/80 leading-relaxed font-medium">
            When you use OnClip to send code snippets or text, the content you provide is temporarily stored on our secure servers. This data is exclusively used to facilitate the transfer of text between your devices.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-onclip-accent-dark">3. Data Retention and Deletion</h2>
          <p className="text-onclip-text/80 leading-relaxed font-medium">
            We strongly believe in data minimization. Any text or snippet uploaded to our database is heavily guarded and is automatically and permanently deleted exactly 15 minutes after its creation. We do not keep backups of deleted clipboard items.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-onclip-accent-dark">4. Security</h2>
          <p className="text-onclip-text/80 leading-relaxed font-medium">
            The security of your clipboard data is our primary concern. We implement industry-standard security measures, including database rules and encryption during transit, to protect against unauthorized access or alteration of your snippets before they expire.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-onclip-accent-dark">5. Advertising</h2>
          <p className="text-onclip-text/80 leading-relaxed font-medium">
            Our site utilizes Google AdSense to serve advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google's Ads Settings.
          </p>
        </section>

      </div>
    </main>
  );
}
