'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border-2 border-amber-100">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full mb-4 border-2 border-red-300">
            <AlertCircle className="text-red-600" size={48} />
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">
            Something went wrong!
          </h2>
          
          <p className="text-amber-700 mb-6">
            {error.message || 'An unexpected error occurred in the dashboard.'}
          </p>
          
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-colors flex items-center gap-2 font-medium shadow-lg"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}