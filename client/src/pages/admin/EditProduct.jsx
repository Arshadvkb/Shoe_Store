import { useContext, useEffect, useState } from "react";
import { Admincontext } from "../../context/Admin_conext";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, X, Trash2, Save } from "lucide-react";
import Layout from "./Layout";

const EditProduct = () => {
  const { state, EditProduct } = useContext(Admincontext);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = state.products.find(
    (product) => String(product.id) === String(id),
  );

  const [formData, setFormData] = useState({
    name: "",
    images: [],
    price: "",
    colors: [],
    description: "",
    category: [],
    isAvailable: true,
  });

  const [newImage, setNewImage] = useState("");
  const [newColor, setNewColor] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        images: product.images || [],
        price: product.price || "",
        colors: product.colors || [],
        description: product.description || "",
        category: product.category || [],
        isAvailable: product.isAvailable ?? true,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((item) => item !== category)
        : [...prev.category, category],
    }));
  };

  const addColor = () => {
    if (!newColor.trim()) return;

    if (!formData.colors.includes(newColor.toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.toLowerCase()],
      }));
    }

    setNewColor("");
  };

  const removeColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((item) => item !== color),
    }));
  };

  const addImage = () => {
    if (!newImage.trim()) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }));

    setNewImage("");
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      ...formData,
      price: Number(formData.price),
    };

    console.log(updatedProduct);

    await EditProduct(id, updatedProduct);

    navigate("/admin/view-products");
  };

  if (!product) {
    return (
      <Layout>
        <div className="p-6">
          <h2 className="text-2xl font-bold">Product not found</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-tertiary p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/view-products")}
              className="w-10 h-10 rounded-xl bg-white border
                         border-primary/20 flex items-center justify-center
                         hover:bg-secondary transition"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>

              <p className="text-sm text-gray-500">
                Update product information
              </p>
            </div>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              formData.isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {formData.isAvailable ? "Available" : "Out of Stock"}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="xl:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl border border-primary/20 p-6">
                <h2 className="text-lg font-semibold mb-5">
                  Basic Information
                </h2>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border
                                 border-gray-200 outline-none
                                 focus:border-primary"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl
                                   border border-gray-200 outline-none
                                   focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border
                                 border-gray-200 outline-none resize-none
                                 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-primary/20 p-6">
                <h2 className="text-lg font-semibold mb-5">Categories</h2>

                <div className="flex gap-3">
                  {["men", "women"].map((category) => (
                    <button
                      type="button"
                      key={category}
                      onClick={() => handleCategory(category)}
                      className={`px-6 py-3 rounded-xl border capitalize ${
                        formData.category.includes(category)
                          ? "bg-primary border-primary font-semibold"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white rounded-2xl border border-primary/20 p-6">
                <h2 className="text-lg font-semibold mb-5">Available Colors</h2>

                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Enter color"
                    className="flex-1 px-4 py-3 rounded-xl border
                               border-gray-200 outline-none
                               focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={addColor}
                    className="px-5 rounded-xl bg-secondary font-medium"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {formData.colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center gap-2 px-4 py-2
                                 rounded-full bg-tertiary border"
                    >
                      <span className="capitalize">{color}</span>

                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* Preview */}
              <div className="bg-white rounded-2xl border border-primary/20 p-6">
                <h2 className="text-lg font-semibold mb-5">Product Preview</h2>

                <div className="aspect-square rounded-2xl bg-tertiary overflow-hidden">
                  <img
                    src={formData.images[0]}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-lg">{formData.name}</h3>

                <p className="text-xl font-bold mt-1">
                  ₹{Number(formData.price).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Images */}
              <div className="bg-white rounded-2xl border border-primary/20 p-6">
                <h2 className="text-lg font-semibold mb-5">Product Images</h2>

                <div className="grid grid-cols-2 gap-3">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl
                                 overflow-hidden group"
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8
                                   rounded-full bg-white flex items-center
                                   justify-center text-red-500
                                   opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg
                               border border-gray-200 outline-none"
                  />

                  <button
                    type="button"
                    onClick={addImage}
                    className="px-3 rounded-lg bg-secondary"
                  >
                    <ImagePlus size={18} />
                  </button>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-2xl border border-primary/20 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold">Availability</h2>

                    <p className="text-sm text-gray-500">
                      Product can be purchased
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isAvailable: !prev.isAvailable,
                      }))
                    }
                    className={`w-14 h-7 rounded-full p-1 ${
                      formData.isAvailable ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition ${
                        formData.isAvailable ? "translate-x-7" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Save */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary
                           font-semibold flex items-center
                           justify-center gap-2"
              >
                <Save size={19} />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProduct;
