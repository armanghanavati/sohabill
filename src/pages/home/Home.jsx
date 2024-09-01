import FAQSection from "src/common/FAQSection";
import HeroCards from "../../components/home/hero-section/HeroCards";
import HeroSection from "../../components/home/hero-section/HeroSection";
import Information from "../../components/home/information/Information";
import Tutorial from "../../components/home/tutorial/Tutorial";

const Home = ({}) => {
  return (
    <>
      <HeroSection />
      <HeroCards />
      <Information />
      <Tutorial />
      <div className="tw-container tw-m-auto tw-flex tw-flex-col tw-gap-20 tw-py-[124px] lg:tw-gap-32">
        <FAQSection />
      </div>
    </>
  );
};

export default Home;
