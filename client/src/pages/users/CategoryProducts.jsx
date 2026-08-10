import { useContext, useEffect, useState, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/Product_Context";
import { CartContext } from "../../context/Cart_Context";
import Navbar from "../../components/User/Navbar";
import {
  Heart,
  ShoppingCart,
  Search,
  Tag,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

const CategoryProducts = ({ category: categoryProp }) => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active category (men, women, offers, or all)
  const activeCategory = (
    categoryProp ||
    categoryName ||
    location.pathname.replace("/", "") ||
    "all"
  ).toLowerCase();

  const { state, fetchProduct } = useContext(ProductContext);
  const { addToCart, toggleWishlist, isInWishlist, isUserAuthenticated } = useContext(CartContext);

  const queryParam = new URLSearchParams(location.search).get("query") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const isLoggedIn = isUserAuthenticated ? isUserAuthenticated() : false;

  const promptLogin = (message) => {
    alert(message);
    navigate("/login");
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      return promptLogin("Please log in to add items to your cart.");
    }
    addToCart(product, 1);
  };

  const handleToggleWishlist = (product) => {
    if (!isLoggedIn) {
      return promptLogin("Please log in to manage your wishlist.");
    }
    toggleWishlist(product);
  };

  // Always fetch products from API on mount
  useEffect(() => {
    fetchProduct();
  }, []);

  // Products array directly from API
  const apiProducts = state.products || [];

  // Filter products directly based on API category field
  const categoryFiltered = useMemo(() => {
    if (activeCategory === "men") {
      return apiProducts.filter(
        (p) =>
          Array.isArray(p.category) &&
          p.category.some((c) => String(c).toLowerCase() === "men")
      );
    }
    if (activeCategory === "women") {
      return apiProducts.filter(
        (p) =>
          Array.isArray(p.category) &&
          p.category.some((c) => String(c).toLowerCase() === "women")
      );
    }
    if (activeCategory === "offers") {
      return apiProducts.filter((p) => {
        if (!p.category || !Array.isArray(p.category)) return p.price <= 3500;
        const lowerCats = p.category.map((c) => String(c).toLowerCase());
        return (
          lowerCats.includes("offers") ||
          lowerCats.includes("offer") ||
          p.price <= 3500
        );
      });
    }
    return apiProducts;
  }, [apiProducts, activeCategory]);

  // Extract colors from API product data
  const availableColors = useMemo(() => {
    const colorsSet = new Set();
    categoryFiltered.forEach((p) => {
      if (p.colors && Array.isArray(p.colors)) {
        p.colors.forEach((c) => colorsSet.add(String(c).toLowerCase()));
      }
    });
    return Array.from(colorsSet);
  }, [categoryFiltered]);

  // Search & Filter & Sort
  const displayedProducts = useMemo(() => {
    let result = [...categoryFiltered];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedColor !== "all") {
      result = result.filter(
        (p) =>
          p.colors &&
          Array.isArray(p.colors) &&
          p.colors.some((c) => String(c).toLowerCase() === selectedColor)
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "name-az") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return result;
  }, [categoryFiltered, searchQuery, selectedColor, sortBy]);

  // Header Title & Description
  const getBannerText = () => {
    switch (activeCategory) {
      case "men":
        return {
          title: "Men's Collection",
          subtitle: "Products fetched from API for Men's category",
        };
      case "women":
        return {
          title: "Women's Collection",
          subtitle: "Products fetched from API for Women's category",
        };
      case "offers":
        return {
          title: "Offers & Special Deals",
          subtitle: "Products fetched from API with special offer pricing",
        };
      default:
        return {
          title: "All Products",
          subtitle: "Products fetched directly from API",
        };
    }
  };

  const banner = getBannerText();

  return (
    <div className="min-h-screen bg-tertiary">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="rounded-3xl bg-neutral p-6 md:p-8 shadow-sm border border-secondary/50 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {banner.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{banner.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-gray-800">
              {displayedProducts.length} {displayedProducts.length === 1 ? "Product" : "Products"}
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-neutral p-4 shadow-sm border border-secondary/40 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                const updatedSearch = e.target.value;
                setSearchQuery(updatedSearch);
                navigate(`/search?query=${encodeURIComponent(updatedSearch)}`);
              }}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {availableColors.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                  <SlidersHorizontal size={14} /> Color:
                </span>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-primary capitalize"
                >
                  <option value="all">All Colors</option>
                  {availableColors.map((color) => (
                    <option key={color} value={color} className="capitalize">
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <ArrowUpDown size={14} /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:border-primary"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-neutral p-12 text-center shadow-sm border border-secondary/40 my-8 min-h-[300px]">
            <Tag size={44} className="text-gray-300 mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">No Products Available</h3>
            <p className="mt-1 text-sm text-gray-500">
              No products found from API for this selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedProducts.map((product) => {
              const imageSrc =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "https://via.placeholder.com/250";

              const isWishlisted = isInWishlist ? isInWishlist(product.id) : false;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-neutral p-4 shadow-sm border border-secondary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Product Image */}
                  <div
                    className="relative h-56 w-full overflow-hidden rounded-2xl bg-secondary/30 p-4 flex items-center justify-center cursor-pointer"
                    onClick={() => navigate(`/user/product/details/${product.id}`)}
                  >
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all active:scale-90 ${
                        isWishlisted
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
                      }`}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Product Data */}
                  <div className="mt-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {Array.isArray(product.category)
                          ? product.category.join(" • ")
                          : product.category || "Footwear"}
                      </span>

                      <h3
                        onClick={() => navigate(`/user/product/details/${product.id}`)}
                        className="mt-1 text-lg font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing & Cart Button */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-lg font-extrabold text-primary">
                        ₹ {product.price}
                      </span>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-primary active:scale-95"
                      >
                        <ShoppingCart size={14} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryProducts;
