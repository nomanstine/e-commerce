import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';

interface Settings {
  currency: string;
  tax_rate: number;
  shipping_fee: number;
  free_shipping_threshold: number;
}

export default function CartSummary() {
  const { state } = useCart();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading || !settings) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = state.total;
  const tax = subtotal * (settings.tax_rate / 100);
  const shipping = subtotal >= settings.free_shipping_threshold ? 0 : settings.shipping_fee;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
      <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({state.items.length} items)</span>
          <span>৳{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Tax ({settings.tax_rate}%)</span>
          <span>৳{tax.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `৳${shipping.toLocaleString()}`
            )}
          </span>
        </div>

        {subtotal < settings.free_shipping_threshold && (
          <div className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
            Add ৳{(settings.free_shipping_threshold - subtotal).toLocaleString()} more for free shipping!
          </div>
        )}

        <hr className="border-gray-200" />

        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>৳{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-semibold"
          disabled={state.items.length === 0}
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          className="w-full border-amber-200 text-amber-900 hover:bg-amber-50 py-3"
        >
          Continue Shopping
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Secure checkout powered by SSL encryption
        </p>
      </div>
    </div>
  );
}