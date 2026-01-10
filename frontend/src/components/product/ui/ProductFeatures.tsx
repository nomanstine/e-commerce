import { Truck, Shield, Package } from 'lucide-react';

interface ProductFeaturesProps {
  shipping?: {
    standard?: string;
    express?: string;
    returns?: string;
  };
}

export default function ProductFeatures({ shipping }: ProductFeaturesProps) {
  return (
    <div className="bg-amber-50 rounded-lg p-4 sm:p-6 space-y-3">
      <div className="flex items-start space-x-3">
        <Truck className="w-5 h-5 text-amber-900 mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm sm:text-base text-gray-800">{shipping?.standard || 'Standard delivery available'}</p>
          <p className="text-xs sm:text-sm text-gray-600">{shipping?.express || 'Express delivery available'}</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Shield className="w-5 h-5 text-amber-900 mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm sm:text-base text-gray-800">Authentic Guarantee</p>
          <p className="text-xs sm:text-sm text-gray-600">100% genuine antique with certificate</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Package className="w-5 h-5 text-amber-900 mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm sm:text-base text-gray-800">Easy Returns</p>
          <p className="text-xs sm:text-sm text-gray-600">{shipping?.returns || 'Returns available'}</p>
        </div>
      </div>
    </div>
  );
}