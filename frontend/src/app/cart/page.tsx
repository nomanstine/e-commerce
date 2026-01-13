'use client';

import { Breadcrumb } from '@/components/shop';
import { CartItem, CartSummary, EmptyCart } from '@/components/cart';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { state } = useCart();

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Cart' }
      ]} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {state.items.length === 0
              ? 'Your cart is empty'
              : `${state.items.length} item${state.items.length === 1 ? '' : 's'} in your cart`
            }
          </p>
        </div>

        {state.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Cart Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                  onClick={() => window.history.back()}
                  className="text-amber-900 hover:text-amber-700 font-semibold flex items-center gap-2 transition"
                >
                  ← Continue Shopping
                </button>

                <button
                  onClick={() => {
                    // Clear cart functionality could be added here
                    if (confirm('Are you sure you want to clear your cart?')) {
                      // dispatch({ type: 'CLEAR_CART' });
                    }
                  }}
                  className="text-red-600 hover:text-red-800 font-semibold transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </>
  );
}