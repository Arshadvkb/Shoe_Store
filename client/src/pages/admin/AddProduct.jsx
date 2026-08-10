import { useContext, useState } from "react";
import Layout from "./Layout";
import { Admincontext } from "../../context/Admin_conext";
import { Plus, Trash2, Image, X } from "lucide-react";

const AddProduct = () => {
  const { AddProduct } = useContext(Admincontext);

  const [formData, setFormData] = useState({
    name: "",
    images: [],
    price: "",
    colors: [],
    description: "",
    category: [],
    isAvailable: true,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const addImage = () => {
    if (!imageUrl.trim()) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl.trim()],
    }));

    setImageUrl("");
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };


  const addColor = () => {
    if (!color.trim()) return;

    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, color.trim()],
    }));

    setColor("");
  };

  const removeColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  
  const addCategory = () => {
    if (!category.trim()) return;

    if (formData.category.includes(category.trim())) return;

    setFormData((prev) => ({
      ...prev,
      category: [...prev.category, category.trim()],
    }));

    setCategory("");
  };

  const removeCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter((_, i) => i !== index),
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    AddProduct(formData);
  };

  return (
    <Layout>
      <div className="w-full min-h-screen bg-neutral p-8">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add Product</h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your store
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-5xl bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
        >
        
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Product Information
            </h2>

            <div className="grid grid-cols-2 gap-6">
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full h-11 px-4 rounded-xl border border-gray-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full h-11 px-4 rounded-xl border border-gray-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  required
                />
              </div>
            </div>
          </div>

  
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Product Images
            </h2>

            <div className="flex gap-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL"
                className="flex-1 h-11 px-4 rounded-xl border border-gray-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={addImage}
                className="h-11 px-5 rounded-xl bg-primary text-white flex items-center gap-2 hover:opacity-90"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

         
            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-5">
                {formData.images.map((url, index) => (
                  <div
                    key={index}
                    className="relative group h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
                  >
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-red-500 shadow opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {formData.images.length === 0 && (
              <div className="mt-5 h-28 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                <Image size={25} />
                <p className="text-sm mt-2">
                  Add image URLs to preview them here
                </p>
              </div>
            )}
          </div>

      
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Colors</h2>

            <div className="flex gap-3">
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Example: Black"
                className="flex-1 h-11 px-4 rounded-xl border border-gray-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={addColor}
                className="h-11 px-5 rounded-xl bg-primary text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {formData.colors.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-gray-700 rounded-lg"
                >
                  <span>{item}</span>

                  <button type="button" onClick={() => removeColor(index)}>
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

     
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Category
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Example: Men"
                className="flex-1 h-11 px-4 rounded-xl border border-gray-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={addCategory}
                className="h-11 px-5 rounded-xl bg-primary text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {formData.category.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg"
                >
                  <span>{item}</span>

                  <button type="button" onClick={() => removeCategory(index)}>
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Enter product description..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none resize-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              required
            />
          </div>

          <div className="mb-8 flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div>
              <h3 className="font-medium text-gray-800">
                Product Availability
              </h3>

              <p className="text-sm text-gray-500">
                Allow users to purchase this product
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
              className={`w-12 h-6 rounded-full p-1 transition ${
                formData.isAvailable ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  formData.isAvailable ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

     
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
            <button
              type="button"
              className="px-6 h-11 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 h-11 rounded-xl bg-primary text-white font-medium hover:opacity-90"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;
