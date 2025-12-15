'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative">
        <div className="h-5 w-5 rounded-full border-2 border-amber-500/30"></div>
        <div className="absolute top-0 left-0 h-5 w-5 rounded-full border-2 border-transparent border-t-amber-500 animate-spin"></div>
      </div>
      <span className="text-amber-500 text-sm font-medium">AI is processing...</span>
    </div>
  );
}

