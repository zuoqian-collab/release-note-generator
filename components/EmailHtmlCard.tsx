'use client';

interface EmailHtmlCardProps {
  content: string;
}

export default function EmailHtmlCard({ content }: EmailHtmlCardProps) {
  const handleOpenInBrowser = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(content);
      newWindow.document.close();
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-amber-500/5">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
        <div>
          <h3 className="font-semibold text-zinc-100">HTML Newsletter</h3>
          <p className="text-xs text-zinc-500">AI-selected highlights for weekly email</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Open in Browser Button */}
          <button
            onClick={handleOpenInBrowser}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in Browser
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {content ? (
          <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed max-h-80 overflow-y-auto">
            {content}
          </pre>
        ) : (
          <div className="text-zinc-500 text-center py-8">
            Waiting for generation...
          </div>
        )}
      </div>
    </div>
  );
}
