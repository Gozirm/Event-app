import React from "react";
import "../Styles/MainLoader.css";
const MainLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-header w-100"></div>
      <div className="skeleton-event-container">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="skeleton-event-item" key={index}>
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default MainLoader;
