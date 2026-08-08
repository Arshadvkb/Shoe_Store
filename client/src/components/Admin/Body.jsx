import Product_chart from "./Product_chart";
import Products_Table from "./Products_Table";
import Quic_Actions from "./Quic_Actions";
import User_Table from "./User_Table";

const Body = () => {
  return (
    <div className="grid grid-cols-5 gap-5 pt-5">
      <div className="col-span-2 space-y-5">
        <Product_chart />
        <Products_Table />
      </div>

      <div className="col-span-3 space-y-5">
        <User_Table />
        <Quic_Actions />
      </div>
    </div>
  );
};

export default Body;
