import { useContext, useEffect } from "react";
import Layout from "./Layout";
import { Admincontext } from "../../context/Admin_conext";
import { NavLink } from "react-router-dom";

const View_Products = () => {
  const { state, FetchProducts } = useContext(Admincontext);

  useEffect(() => {
    FetchProducts();
  }, []);

  const products = state.products;

  return (
    <Layout>
      <div className="p-6 w-full">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your products and their availability
          </p>
        </div>

        {/* Product Table Card */}
        <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">All Products</h2>

              <p className="text-sm text-gray-500 mt-1">
                {products.length} products
              </p>
            </div>

            <NavLink
              to="/admin/add-product"
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition"
            >
              + Add Product
            </NavLink>
          </div>

          {/* Scrollable Table */}
          <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
            <table className="w-full text-left">
              {/* Table Head */}
              <thead className="sticky top-0 z-10 bg-tertiary">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Product
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Category
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Price
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Image
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {products.map((product) => {
                  const isAvailable = product.isAvailable;

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-primary/5 transition-colors"
                    >
                      {/* Product Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {product.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-secondary px-3 py-1 text-sm text-gray-700">
                          {Array.isArray(product.category)
                            ? product.category.join(" / ")
                            : product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          ₹{product.price}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Unavailable
                          </span>
                        )}
                      </td>

                      {/* Image */}
                      <td className="px-6 py-3">
                        <div className="h-14 w-14 rounded-xl overflow-hidden border border-gray-200 bg-neutral">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition">
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View_Products;
