import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext } from "react";

import { Pie } from "react-chartjs-2";
import { Admincontext } from "../../context/Admin_conext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const Product_chart = () => {
const {state}=useContext(Admincontext)

const products = state?.products || [];
const men = products.filter(p => Array.isArray(p.category) ? p.category.includes("men") : p.category === "men");
const women = products.filter(p => Array.isArray(p.category) ? p.category.includes("women") : p.category === "women");
const sports = products.filter(p => Array.isArray(p.category) ? p.category.includes("sports") : p.category === "sports");
const casual = products.filter(p => Array.isArray(p.category) ? p.category.includes("casual") : p.category === "casual");
console.log(women);

  const data = {
    labels: [ "Men", "Women", "Sports", "Casual"],
    datasets: [
      {
        label: "Products",
        data: [ men.length, women.length, sports.length, casual.length],
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-[350px] rounded-2xl border border-primary p-5">
      <Pie data={data} options={options} />
    </div>
  );
};

export default Product_chart;
