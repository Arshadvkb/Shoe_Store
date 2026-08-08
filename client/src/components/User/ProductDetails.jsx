import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductContext } from "../../context/Product_Context"
import { CartContext } from "../../context/Cart_Context"
import Navbar from "./Navbar"

const ProductDetails = () => {
    const { id } = useParams()
    const { state } = useContext(ProductContext)
    const { addToCart, toggleWishlist, isInWishlist } = useContext(CartContext)
    const [quantity, setQuantity] = useState(1)

    const products = state.products || []
    const product = products.find(p => p.id === id)

    if (!product) {
      return (
        <div className="min-h-screen bg-tertiary">
          <Navbar />
          <div className="flex h-[80vh] items-center justify-center">
            <p className="text-xl font-semibold text-gray-700">Loading product details...</p>
          </div>
        </div>
      )
    }

    const isWishlisted = isInWishlist ? isInWishlist(product.id) : false

  return (
    <div className="min-h-screen bg-tertiary">
      <Navbar />

      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-10">
        <div className="grid w-full grid-cols-1 gap-10 rounded-3xl bg-neutral p-6 shadow-sm md:grid-cols-2 md:p-10">
          {/* Product Image */}
          <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-secondary p-8">
            <img
              className="h-full max-h-[500px] w-full max-w-[500px] object-contain transition duration-500 hover:scale-105"
              src={product.images ? product.images[0] : ""}
              alt={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center px-2 py-6 md:px-8">
            {/* Category */}
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {product.category && product.category.length > 1 ? `${product.category[0]} / ${product.category[1]}` : product.category && product.category[0] ? product.category[0] : "Uncategorized"}
            </p>

            {/* Product Name */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-6 text-3xl font-bold text-primary">
              ₹{product.price}
            </p>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Divider */}
            <div className="my-8 h-px w-full bg-gray-200" />

            {/* Colors */}
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">
                Available Colors
              </h3>

              <div className="flex gap-3">
                {product.colors?.map((color, index) => (
                  <button
                    key={index}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-900 shadow-md ring-1 ring-gray-300"
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 sm:w-32">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="text-xl font-semibold text-gray-600 hover:text-black"
                >
                  −
                </button>

                <span className="font-semibold">{quantity}</span>

                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="text-xl font-semibold text-gray-600 hover:text-black"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 rounded-xl bg-primary px-8 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg active:scale-95"
              >
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`rounded-xl border-2 border-primary px-6 py-3 font-semibold transition ${
                  isWishlisted
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {isWishlisted ? "♥" : "♡"}
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="rounded-xl bg-tertiary p-4">
                <p className="font-semibold text-gray-900">Free Delivery</p>
                <p className="mt-1">On eligible orders</p>
              </div>

              <div className="rounded-xl bg-tertiary p-4">
                <p className="font-semibold text-gray-900">Easy Returns</p>
                <p className="mt-1">7-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails

