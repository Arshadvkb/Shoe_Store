import { useContext } from "react";
import { CartContext } from "../../context/Cart_Context";
import Navbar from "../../components/User/Navbar";
import WishlistItem from "../../components/User/WishlistItem";
import { Heart, ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  const {
    wishlist = [],
    removeFromWishlist,
    addToCart,
    clearWishlist,
    getWishlistCount,
    isInCart,
    isUserAuthenticated,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const count = getWishlistCount ? getWishlistCount() : wishlist.length;
  const isLoggedIn = isUserAuthenticated ? isUserAuthenticated() : false;

  const promptLogin = (message) => {
    alert(message);
    navigate("/login");
  };

  const handleAddAllToCart = () => {
    if (!isLoggedIn) {
      return promptLogin("Please log in to add items to your cart.");
    }

    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
  };

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      return promptLogin("Please log in to add items to your cart.");
    }
    addToCart(item, 1);
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
                My Wishlist
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-600 pl-13">
              You have <span className="font-bold text-primary">{count}</span> {count === 1 ? "item" : "items"} saved in your wishlist
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 active:scale-95"
              >
                <ShoppingCart size={18} />
                <span>Add All to Cart</span>
              </button>

              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 rounded-xl bg-neutral px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm border border-red-200 transition hover:bg-red-50 active:scale-95"
              >
                <Trash2 size={18} />
                <span>Clear Wishlist</span>
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Content / Empty State */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-neutral p-12 text-center shadow-sm border border-secondary/40 my-10 min-h-[450px]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-primary mb-6 shadow-inner">
              <Heart size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 max-w-md text-gray-500">
              Save your favorite sneakers and footwear here so you can easily find them later and add them to your cart!
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="rounded-2xl bg-primary px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95"
              >
                Discover Shoes
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onAddToCart={(prod) => handleAddToCart(prod)}
                onRemove={removeFromWishlist}
                isInCart={isInCart ? isInCart(item.id) : false}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
