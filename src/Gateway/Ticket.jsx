import React from "react";
import Modal from "react-bootstrap/Modal";
import minusIcon from "../assets/minus-circle.svg";
import addIcon from "../assets/plus-circle.svg";
import { useState } from "react";
const Ticket = (props) => {
  const { ticketPrice } = props;
  const { total } = props;
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
  const calculateTotalPrice = () => {
    return ticketPrice?.reduce((acc, price) => {
      const quantity = quantities[price.type] || 0;
      return acc + price.price * quantity;
    }, 0);
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
          {ticketPrice?.length > 0 ? (
            ticketPrice?.map((prices) => (
              <div key={prices.type} className="d-flex justify-content-between">
                <p className="mb-1 type">{prices.type}</p>
                <div className="d-flex justify-content-between w-25">
                  <img
                    src={minusIcon}
                    alt=""
                    className="mb-3"
                    onClick={() => handleDecrement(prices.type)}
                  />
                  <p>{quantities[prices.type] || 0}</p>
                  <img
                    src={addIcon}
                    alt=""
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
            NGN{" "}
            {calculateTotalPrice() ? `${calculateTotalPrice()}` : `${total}`}
          </p>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button>Proceed To Payment</button>
        </div>
      </main>
    </Modal>
  );
};

export default Ticket;
