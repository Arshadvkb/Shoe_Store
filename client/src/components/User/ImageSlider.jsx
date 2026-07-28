import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/Product_Context";

const ImageSlider = () => {
  const { state } = useContext(ProductContext);
  const [currentImage, setCurrentImage] = useState(0);

  const images = state.products[0]?.images || [];

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[90vh] w-full overflow-hidden ">
      <img
        src={images[currentImage]}
        alt="Shoe"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default ImageSlider;
