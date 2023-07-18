import Navbar from "../components/Navbar";
import AutoSlider from "../components/AutoSlider";
import NewArrivals from "../components/NewArrivals";
import Categories from "../components/Categories";
import Store from "../components/Store";
import Info from "../components/Info";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <AutoSlider />
      <NewArrivals />
      <Categories />
      <Store />
      <Info />
      <Footer />
    </div>
  );
};

export default Home;
