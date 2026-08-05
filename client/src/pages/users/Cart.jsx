import { useContext } from "react";
import { CartContext } from "../../context/Cart_Context";
import Navbar from "../../components/User/Navbar";
import CartItem from "../../components/User/CartItem";
import CartSummary from "../../components/User/CartSummary";
import { ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart = [],
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const cartTotal = getCartTotal ? getCartTotal() : 0;
  const itemCount = getCartCount ? getCartCount() : cart.length;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert("Thank you for your order! Checkout process initiated successfully.");
  };

  return (
    <div className="min-h-screen bg-tertiary">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral shadow-sm border border-secondary/50 text-gray-700 transition hover:bg-secondary/40"
                title="Go back"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-600 pl-13">
              You have <span className="font-bold text-primary">{itemCount}</span> {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="flex items-center gap-2 rounded-xl bg-neutral px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm border border-secondary/50 transition hover:bg-secondary/30"
            >
              <Heart size={18} className="text-primary" />
              <span>View Wishlist</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
            >
              <ShoppingBag size={18} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Empty State vs Cart Content */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-neutral p-12 text-center shadow-sm border border-secondary/40 my-10 min-h-[450px]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary/40 text-primary mb-6 shadow-inner">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Shopping Cart is Empty
            </h2>
            <p className="mt-2 max-w-md text-gray-500">
              Looks like you haven't added any shoes to your cart yet. Explore our latest collections and find your perfect pair!
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="rounded-2xl bg-primary px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95"
              >
                Browse Products
              </Link>
              <Link
                to="/wishlist"
                className="rounded-2xl bg-secondary px-8 py-3.5 text-base font-bold text-gray-900 transition-all hover:bg-amber-200 active:scale-95"
              >
                Check Saved Wishlist
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Cart Items List */}
            <div className="flex flex-col gap-4 lg:col-span-7 xl:col-span-8">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
              <CartSummary
                cartTotal={cartTotal}
                itemCount={itemCount}
                onClearCart={clearCart}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
