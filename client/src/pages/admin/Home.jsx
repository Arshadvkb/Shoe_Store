import Cards from "../../components/Admin/Cards";
import WelcomeMessage from "../../components/Admin/WelcomeMessage";
import Layout from "./Layout";

const Home = () => {
 

  return (
  <Layout>
   <WelcomeMessage/>
    <Cards/>
   
  </Layout>
  );
};

export default Home;
