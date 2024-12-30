import React from "react";
import "../Styles/SkeletionLoader.css";
const SkeletonLoader = () => {
  return (
    <>
      <main>
        <div className="skeleton-loader">
          <div className="skeleton-header"></div>
          <div className="skeleton-event-container">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="skeleton-event-item" key={index}>
                <div className="skeleton-img"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-location"></div>
                <div className="skeleton-date"></div>
                <div className="skeleton-ticket"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default SkeletonLoader;
