import React from "react";
import "../Styles/SinglePageLoader.css";
const SinglePageLoading = () => {
  return (
    <>
      <div className="skeleton-loader">
        <div className="skeleton-header"></div>
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-button"></div>
      </div>
    </>
  );
};

export default SinglePageLoading;
