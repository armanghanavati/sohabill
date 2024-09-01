import React from "react";

const GoogleMapLocation: React.FC = () => {
  return (
    <div className="tw-rounded-xl tw-shadow-md">
      <iframe
        className="tw-rounded-xl"
        width="100%"
        height="270"
        // frameborder="0"
        // scrolling="no"
        // marginheight="0"
        // marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=270&amp;hl=en&amp;q=%EE%83%88%20%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%20%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C%20%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D8%B3%D8%B1%D8%A2%D8%A8%D8%A7%D8%AF%D8%A7%D9%86%DB%8C%D8%8C%20%D8%A7%DB%8C%D8%B1%D8%A7%D9%86+(soha)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.maps.ie/population/">Population Estimator map</a>
      </iframe>
    </div>
  );
};

export default GoogleMapLocation;
