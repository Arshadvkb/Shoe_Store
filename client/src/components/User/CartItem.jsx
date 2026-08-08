import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  const imageSrc =
    item.images && item.images.length > 0
      ? item.images[0]
      : "https://via.placeholder.com/150";

  const itemTotal = (item.price || 0) * (item.quantity || 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-neutral p-4 shadow-sm border border-secondary/40 transition-all hover:shadow-md">
      {/* Product Thumbnail & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary/30 p-2 border border-secondary/50">
          <img
            src={imageSrc}
            alt={item.name}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 capitalize">
            {Array.isArray(item.category)
              ? item.category.join(" • ")
              : item.category || "Footwear"}
          </p>
          <p className="mt-1 text-base font-semibold text-primary">
            ₹{item.price?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Quantity & Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        {/* Quantity Controls */}
        <div className="flex items-center rounded-xl border border-gray-300 bg-white p-1 shadow-inner">
          <button
            onClick={() => onDecrement(item.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-black active:scale-90"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-sm font-bold text-gray-800">
            {item.quantity}
          </span>
          <button
            onClick={() => onIncrement(item.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-black active:scale-90"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[90px]">
          <p className="text-xs text-gray-400 font-medium">Subtotal</p>
          <p className="text-lg font-bold text-gray-900">
            ₹{itemTotal.toLocaleString()}
          </p>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-primary active:scale-95"
          title="Remove from cart"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
