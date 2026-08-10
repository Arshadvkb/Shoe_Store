import { Package, Users, UserX, Archive } from "lucide-react";
import { useContext, useEffect } from "react";
import { Admincontext } from "../../context/Admin_conext";

const Cards = () => {
     const { FetchUser, state, FetchProducts } = useContext(Admincontext);
     useEffect(() => {
       FetchUser();
       FetchProducts();
     }, []);
     const users = state.users.filter(u=>u.role!=="admin");
     const products = state.products ?? [];
     console.log(users);
     console.log(products);
  return (
    <div className="grid grid-cols-4 gap-6 pt-7">
      <div className="h-36 rounded-2xl bg-primary/10 border border-primary/20 p-6 flex items-center justify-between shadow-sm">
        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Package className="h-8 w-8 text-primary" />
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Total Products</p>
          <h1 className="text-4xl font-bold">{products.length}</h1>
          <p className="text-sm text-green-600">Available Products</p>
        </div>
      </div>

      <div className="h-36 rounded-2xl bg-secondary/60 border border-orange-300 p-6 flex items-center justify-between shadow-sm">
        <div className="h-16 w-16 rounded-full bg-orange-200 flex items-center justify-center">
          <Users className="h-8 w-8 text-orange-700" />
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Total Users</p>
          <h1 className="text-4xl font-bold">{users.length}</h1>
          <p className="text-sm text-orange-600">Registered Users</p>
        </div>
      </div>

      <div className="h-36 rounded-2xl bg-red-100 border border-red-300 p-6 flex items-center justify-between shadow-sm">
        <div className="h-16 w-16 rounded-full bg-red-200 flex items-center justify-center">
          <UserX className="h-8 w-8 text-red-600" />
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Blocked Users</p>
          <h1 className="text-4xl font-bold">
            {users.filter((u) => u.isBlocked).length}
          </h1>
          <p className="text-sm text-red-600">Restricted Accounts</p>
        </div>
      </div>

      <div className="h-36 rounded-2xl bg-orange-100 border border-orange-300 p-6 flex items-center justify-between shadow-sm">
        <div className="h-16 w-16 rounded-full bg-orange-200 flex items-center justify-center">
          <Archive className="h-8 w-8 text-orange-600" />
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Inactive Products</p>
          <h1 className="text-4xl font-bold">
        
            {products.filter((p)=>!p.isAvailable).length}
          </h1>
          <p className="text-sm text-orange-600">Soft Deleted</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
