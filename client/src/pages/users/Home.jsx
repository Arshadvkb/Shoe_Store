import { Navigate } from "react-router-dom";
import Hero from "../../components/User/View_Products";
import ImageSlider from "../../components/User/ImageSlider";
import Navbar from "../../components/User/Navbar";

const Home = () => {
  const activeUser = JSON.parse(sessionStorage.getItem("Active User") || "null");

  if (activeUser?.role === "admin") {
    return <Navigate to="/admin/home" replace />;
  }

  return (
    <div>
      <Navbar />
      <ImageSlider />
      <Hero />
    </div>
  );
};

export default Home;
