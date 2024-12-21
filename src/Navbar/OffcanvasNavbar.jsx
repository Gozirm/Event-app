import React from "react";
import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import logo from "../assets/Logo.svg";
const OffcanvasNavbar = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="nav d-md-none">
        <div className="d-flex justify-content-between w-100">
          <img src={logo} alt="" />
          <Button onClick={handleShow}>
            Click Me
          </Button>
        </div>
        <Offcanvas show={show} onHide={handleClose} placement="top" {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default OffcanvasNavbar;
