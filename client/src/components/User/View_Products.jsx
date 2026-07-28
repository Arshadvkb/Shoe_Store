import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/Product_Context";
import { useNavigate } from "react-router-dom";

const View_Products = () => {
  const { state, fetchProduct } = useContext(ProductContext);

  const navigate=useNavigate()

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log(state.products);

  return (
    <div className="pt-20 w-full min-h-screen bg-neutral">
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {state.products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg bg-secondary p-4"
            onClick={() => navigate(`/user/product/details/${product.id}`)}
          >
            <img
              src={product.images[1]}
              alt={product.name}
              className="h-48 w-full rounded-md object-cover"
            />

            <h2 className="mt-3 text-lg font-bold">{product.name}</h2>

            <p className="mt-2">₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View_Products;
