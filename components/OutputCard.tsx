'use client';

import { useState } from 'react';

interface OutputCardProps {
  title: string;
  description: string;
  content: string;
}

export default function OutputCard({ title, description, content }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-amber-500/5">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
        <div>
          <h3 className="font-semibold text-zinc-100">{title}</h3>
          <p className="text-xs text-zinc-500">{description}</p>
        </div>
        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500/20'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="p-4 max-h-80 overflow-y-auto">
        <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
          {content || 'Waiting for generation...'}
        </pre>
      </div>
    </div>
  );
}

