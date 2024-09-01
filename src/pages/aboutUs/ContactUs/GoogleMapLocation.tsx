import React from "react";

const GoogleMapLocation: React.FC = () => {
  return (
    <div className="tw-rounded-xl tw-shadow-md">
      <iframe
        className="tw-rounded-xl"
        width="100%"
        height="270"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d202.3956204722001!2d51.41058235729165!3d35.74269470354906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1718195455452!5m2!1sen!2s"
      >
        <a href="https://www.maps.ie/population/">Population Estimator map</a>
      </iframe>
    </div>
  );
};

export default GoogleMapLocation;
