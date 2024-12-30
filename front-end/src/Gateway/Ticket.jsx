import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import minusIcon from "../assets/minus-circle.svg";
import addIcon from "../assets/plus-circle.svg";

const Ticket = (props) => {
  const { ticketPrice, total, onHide } = props; // Destructure onHide to close the modal
  const [quantities, setQuantities] = useState({}); // State to track quantities

  // Function to handle increment
  const handleIncrement = (type) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
  };

  // Function to handle decrement
  const handleDecrement = (type) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: Math.max((prev[type] || 0) - 1, 0), // Prevent negative quantities
    }));
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return Array.isArray(ticketPrice)
      ? ticketPrice.reduce((acc, price) => {
          const quantity = quantities[price.type] || 0;
          return acc + price.price * quantity;
        }, 0)
      : 0; // Fallback to 0 if ticketPrice is not an array
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <main className="col-lg-4 col-md-12 event-price d-flex row justify-content-between m-0 w-100 ">
        <h1 className="text-center price-h1">Select Ticket</h1>
        <div className="w-100">
          {Array.isArray(ticketPrice) && ticketPrice.length > 0 ? (
            ticketPrice.map((prices) => (
              <div key={prices.type} className="d-flex justify-content-between">
                <p className="mb-1 type">{prices.type}</p>
                <div className="d-flex justify-content-between w-25">
                  <img
                    src={minusIcon}
                    alt="Decrease"
                    className="mb-3"
                    onClick={() => handleDecrement(prices.type)}
                  />
                  <p>{quantities[prices.type] || 0}</p>
                  <img
                    src={addIcon}
                    alt="Increase"
                    className="mb-3"
                    onClick={() => handleIncrement(prices.type)}
                  />
                </div>
                <p className="mb-0 price">NGN {prices.price}</p>
              </div>
            ))
          ) : (
            <p>No ticket prices available</p>
          )}
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <p className="type">Total:</p>
          <p className="price">
            NGN {calculateTotalPrice() > 0 ? calculateTotalPrice() : total}
          </p>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button onClick={onHide}>Proceed To Payment</button> {/* Close modal on click */}
        </div>
      </main>
    </Modal>
  );
};

export default Ticket;