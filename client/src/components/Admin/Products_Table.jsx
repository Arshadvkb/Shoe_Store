import { useContext } from "react";
import { Admincontext } from "../../context/Admin_conext";
import { SportShoe } from "lucide-react";
import ViewAll from "./ViewAll";

const Products_Table = () => {
  const {state}=useContext(Admincontext)
  const products=state.products
products.map(p=>console.log("availability"+p.isAvailable))
  
 return (
   <div className="w-full h-[350px] rounded-2xl border border-primary bg-white overflow-hidden">
     <div className="h-[310px] overflow-y-auto px-3">
       <ViewAll name="Products" />
       <table className="w-full table-fixed border-collapse">
         <thead className="sticky top-0 z-10 bg-white">
           <tr className="text-gray-500 text-sm border-b">
             <th className="w-[35%] text-left px-4 py-3 font-medium">
               Product
             </th>

             <th className="w-[25%] text-left px-4 py-3 font-medium">
               Category
             </th>

             <th className="w-[20%] text-center px-4 py-3 font-medium">
               Price
             </th>

             <th className="w-[20%] text-center px-4 py-3 font-medium">
               Status
             </th>
           </tr>
         </thead>

         <tbody>
           {products.map((product) => (
             <tr
               key={product.id}
               className="border-b last:border-none hover:bg-primary/5 transition"
             >
               <td className="py-3 px-4">
                 <div className="flex items-center gap-3">
                   <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                     <SportShoe />
                   </div>

                   <p className="font-medium text-gray-800 truncate">
                     {product.name}
                   </p>
                 </div>
               </td>

               <td className="py-3 px-4 text-gray-600">
                 <span className="truncate block">
                   {product.category?.[0] || "N/A"}
                   {product.category?.[1] && ` / ${product.category[1]}`}
                 </span>
               </td>

               <td className="py-3 px-4 text-center">
                 <span className="font-medium text-gray-800">
                   ₹{product.price}
                 </span>
               </td>

               <td className="py-3 px-4 text-center">
                 <span
                   className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                     product.isAvailable
                       ? "bg-green-100 text-green-600"
                       : "bg-red-100 text-red-600"
                   }`}
                 >
                   {product.isAvailable ? "Available" : "Out of stock"}
                 </span>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 );
}

export default Products_Table
