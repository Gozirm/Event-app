import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <>
      <main className="loader-container">
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="grow" />
          <h1 className="fs-3 mt-2">Loading</h1>
        </div>
      </main>
    </>
  );
};

export default Loader;
