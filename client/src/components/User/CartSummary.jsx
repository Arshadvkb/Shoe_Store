import { useState } from "react";
import { ArrowRight, ShoppingBag, Trash2, Tag, ShieldCheck } from "lucide-react";

const CartSummary = ({ cartTotal, itemCount, onClearCart, onCheckout }) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const shippingFee = cartTotal > 1999 || itemCount === 0 ? 0 : 150;
  const grandTotal = Math.max(0, cartTotal + shippingFee - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    if (!promoCode.trim()) return;

    if (promoCode.toUpperCase() === "SHOE10") {
      const disc = Math.round(cartTotal * 0.1);
      setDiscount(disc);
      setPromoSuccess("10% discount applied!");
    } else if (promoCode.toUpperCase() === "FREESHIP") {
      setDiscount(shippingFee);
      setPromoSuccess("Free shipping promo applied!");
    } else {
      setPromoError("Invalid promo code. Try 'SHOE10'");
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-neutral p-6 md:p-8 shadow-md border border-secondary/50">
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">
        Order Summary
      </h2>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1">
          <Tag size={14} className="text-primary" /> Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code (e.g. SHOE10)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase"
          />
          <button
            type="submit"
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-95"
          >
            Apply
          </button>
        </div>
        {promoSuccess && (
          <p className="text-xs font-medium text-green-600">{promoSuccess}</p>
        )}
        {promoError && (
          <p className="text-xs font-medium text-red-500">{promoError}</p>
        )}
      </form>

      {/* Price Details Breakdown */}
      <div className="flex flex-col gap-3 text-sm border-t border-b border-gray-200 py-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span className="font-semibold text-gray-900">₹{cartTotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping Fee</span>
          <span>
            {shippingFee === 0 ? (
              <span className="font-semibold text-green-600 uppercase text-xs">FREE</span>
            ) : (
              <span className="font-semibold text-gray-900">₹{shippingFee}</span>
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- ₹{discount.toLocaleString()}</span>
          </div>
        )}

        {shippingFee > 0 && (
          <p className="text-xs text-gray-400">
            Add ₹{(2000 - cartTotal).toLocaleString()} more for FREE shipping!
          </p>
        )}
      </div>

      {/* Grand Total */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Amount</p>
          <p className="text-3xl font-extrabold text-primary">₹{grandTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={onCheckout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white transition-all hover:bg-red-600 hover:shadow-lg active:scale-98"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={20} />
        </button>

        <button
          onClick={onClearCart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50/50 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100/80 active:scale-98"
        >
          <Trash2 size={16} />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Guarantee badge */}
      <div className="flex items-center justify-center gap-2 rounded-xl bg-secondary/30 py-3 px-4 text-xs font-medium text-gray-700">
        <ShieldCheck size={18} className="text-primary flex-shrink-0" />
        <span>Secure Checkout • Guaranteed Quality</span>
      </div>
    </div>
  );
};

export default CartSummary;
