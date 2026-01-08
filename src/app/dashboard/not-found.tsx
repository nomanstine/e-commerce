import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border-2 border-amber-100">
        <div className="flex flex-col items-center text-center">
          <div className="bg-yellow-100 p-4 rounded-full mb-4 border-2 border-yellow-300">
            <FileQuestion className="text-yellow-600" size={48} />
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">
            Page Not Found
          </h2>
          
          <p className="text-amber-700 mb-6">
            The dashboard page you're looking for doesn't exist.
          </p>
          
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-colors flex items-center gap-2 font-medium shadow-lg"
          >
            <Home size={20} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}