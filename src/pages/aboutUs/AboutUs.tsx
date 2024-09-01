import FAQSection from "../../common/FAQSection";
import ContactUs from "./ContactUs/ContactUs";
import Header from "../../layouts/header/NavBar";
const AboutUs: React.FC = () => {
  return (
    <div>
      <div className="tw-flex tw-flex-col tw-gap-20 lg:tw-gap-32">
        <ContactUs />
        <div className="tw-px-6 lg:tw-px-28">
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
