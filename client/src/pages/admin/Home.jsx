import { Package } from "lucide-react";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { Admincontext } from "../../context/Admin_conext";

const Home = () => {
  const { FetchUser } = useContext(Admincontext);
useEffect(() => {
    FetchUser();
  }, []);
  return (
    <div>
      <Layout>
        <main className="flex-1 p-5 bg-gray-100">
          <div className="pt-5 pl-5">
            <h1 className="text-2xl font-black">Welcome Back,Admin! 👋</h1>
            <p>Here is what happening in your store</p>
          </div>
          <div className="flex justify-between pt-7">
            <div className="h-36 w-72 rounded-2xl bg-primary/10 border border-primary/20 p-6 flex items-center justify-between shadow-sm">
           
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>

          
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm font-medium">
                  Total Products
                </p>

                <h1 className="text-4xl font-bold text-gray-900">40</h1>

                <p className="text-sm text-green-600 font-medium">
                  ↑ 12% from last month
                </p>
              </div>
            </div>
            <div className="h-36 w-72 rounded-2xl bg-secondary/60 border border-orange-300"></div>
            <div className="h-36 w-72 rounded-2xl bg-red-100  border border-red-400"></div>
            <div className="h-36 w-72 rounded-2xl bg-orange-100 border border-orange-400 "></div>
          </div>
          <div></div>
        </main>
     
      </Layout>
    </div>
  );
};

export default Home;
