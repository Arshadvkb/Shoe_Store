import { Trash2, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WishlistItem = ({ item, onAddToCart, onRemove, isInCart }) => {
  const navigate = useNavigate();

  const imageSrc =
    item.images && item.images.length > 0
      ? item.images[0]
      : "https://via.placeholder.com/200";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-neutral p-5 shadow-sm border border-secondary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-secondary/30 p-4 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={item.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Remove from Wishlist Badge Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-md backdrop-blur-sm transition-all hover:bg-red-500 hover:text-white active:scale-90"
          title="Remove from wishlist"
        >
          <Trash2 size={18} />
        </button>

        {/* Quick Details Eye Button */}
        <button
          onClick={() => navigate(`/user/product/details/${item.id}`)}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur-sm transition-all hover:bg-black hover:text-white active:scale-90 opacity-0 group-hover:opacity-100"
          title="View product details"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {Array.isArray(item.category)
              ? item.category[0]
              : item.category || "Footwear"}
          </span>
          <h3
            onClick={() => navigate(`/user/product/details/${item.id}`)}
            className="mt-1 text-xl font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors line-clamp-1"
          >
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400 font-medium">Price</p>
            <p className="text-xl font-extrabold text-gray-900">
              ₹{item.price?.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => onAddToCart(item)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
              isInCart
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-primary text-white hover:bg-red-600 shadow-md hover:shadow-lg"
            }`}
          >
            <ShoppingCart size={16} />
            <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
