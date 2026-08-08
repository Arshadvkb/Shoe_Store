import { Package2Icon, Plus, Tag, Users2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Quic_Actions = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[190px] rounded-2xl border border-primary grid grid-cols-4 items-center gap-8 px-8">
      {/* Add Product */}
      <div
        className="h-[100px] rounded-2xl bg-primary/10 flex flex-col items-center justify-evenly cursor-pointer hover:bg-primary/20 transition"
        onClick={() => navigate("/admin/add-product")}
      >
        <div className="h-11 w-11 rounded-lg bg-primary flex items-center justify-center">
          <Plus className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>

        <h2 className="text-sm font-medium">Add Product</h2>
      </div>

      {/* View Users */}
      <div
        className="h-[100px] rounded-2xl bg-secondary/70 flex flex-col items-center justify-evenly cursor-pointer hover:bg-secondary transition"
        onClick={() => navigate("/admin/view-users")}
      >
        <div className="h-11 w-11 rounded-lg bg-primary flex items-center justify-center">
          <Users2 className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>

        <h2 className="text-sm font-medium">View Users</h2>
      </div>

      {/* View Products */}
      <div
        className="h-[100px] rounded-2xl bg-primary/10 flex flex-col items-center justify-evenly cursor-pointer hover:bg-primary/20 transition"
        onClick={() => navigate("/admin/view-products")}
      >
        <div className="h-11 w-11 rounded-lg bg-primary flex items-center justify-center">
          <Package2Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>

        <h2 className="text-sm font-medium">View Products</h2>
      </div>

      {/* Manage Categories */}
      <div
        className="h-[100px] rounded-2xl bg-secondary/70 flex flex-col items-center justify-evenly cursor-pointer hover:bg-secondary transition"
        onClick={() => navigate("/admin/categories")}
      >
        <div className="h-11 w-11 rounded-lg bg-primary flex items-center justify-center">
          <Tag className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>

        <h2 className="text-sm font-medium">Manage Categories</h2>
      </div>
    </div>
  );
};

export default Quic_Actions;
