import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="animate-spin text-amber-600 mx-auto mb-4" size={48} />
        <h2 className="text-xl font-serif font-semibold text-amber-900 mb-2">
          Loading Dashboard...
        </h2>
        <p className="text-amber-700">
          Please wait while we prepare your admin panel
        </p>
      </div>
    </div>
  );
}