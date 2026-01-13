import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-amber-50 rounded-full p-6 mb-6">
        <ShoppingBag className="w-12 h-12 text-amber-900" />
      </div>

      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
        Your cart is empty
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        Looks like you haven't added any items to your cart yet.
        Explore our collection of beautiful Bangladeshi crafts and antiques.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/shop">
          <Button>
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        <Link href="/categories">
          <Button variant="outline">
            Browse Categories
          </Button>
        </Link>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>Free shipping on orders over ৳5,000</p>
      </div>
    </div>
  );
}