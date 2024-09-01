import HeroCards from "../../components/home/hero-section/HeroCards";
import HeroSection from "../../components/home/hero-section/HeroSection";
import Information from "../../components/home/information/Information";
import Header from "../../layouts/header/NavBar";

const Home = ({ }) => {
  return (
    <>
      <div className="">
        <HeroSection />
        <HeroCards />
      </div>
      <Information />
    </>
  );
};

export default Home;