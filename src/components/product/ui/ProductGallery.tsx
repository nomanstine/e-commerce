'use client';

import { useState } from 'react';
import { Share2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-amber-50 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
        <img
          src={images[selectedImage] || 'https://via.placeholder.com/800'}
          alt={productName}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 bg-white text-amber-900 p-2 sm:p-3 rounded-full hover:bg-amber-100 transition shadow-lg">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Navigation Arrows */}
        {images && images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-900 p-2 sm:p-3 rounded-full transition shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-900 p-2 sm:p-3 rounded-full transition shadow-lg"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {images && images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
              selectedImage === index ? 'border-amber-900' : 'border-transparent hover:border-amber-300'
            }`}
          >
            <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}