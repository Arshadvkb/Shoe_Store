import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/Product_Context";

const View_Products = () => {
  const { state, fetchProduct } = useContext(ProductContext);
  useEffect(() => {
    fetchProduct();
  }, []);

  console.log(state.products);

  return (
    <div className="pt-20">
      <div className="grid grid-cols-4 pl-64 ">
        {state.products.map((product) => (
          <div key={product.id} className="">
            <img src={product.images[1]} alt="" className="h-10 w-10" />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View_Products;
