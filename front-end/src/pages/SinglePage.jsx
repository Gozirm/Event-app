import { useEffect, useState } from "react";
import React from "react";
import { Events } from "../APIS/Events";
import { Link, useParams } from "react-router-dom";
import { NavLink } from "react-router";
import arrow from "../assets/arrow.svg";
import "../Styles/SinglePage.css";
import calender from "../assets/calendar.svg";
import locationIcon from "../assets/location.svg";
import ticket from "../assets/ticket.svg";
import axios from "axios";
import Ticket from "../Gateway/Ticket";
import SinglePageLoading from "../Auth/SinglePageLoading";
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const SinglePage = () => {
  const { _id } = useParams();
  const [event, setEvent] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("mubby-event-token");
  useEffect(() => {
    const getEventDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://event-app-9x9f.onrender.com/api/users/event/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setEvent(response.data.event);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getEventDetails();
  }, [_id, token]);

  const totalPrice = Array.isArray(event?.price)
    ? event.price.reduce((acc, ticket) => acc + ticket.price, 0)
    : 0;
  useEffect(() => {
    const foundEvent = Events.find((event) => event._id === parseInt(_id));
    setEvent(foundEvent);
  }, [_id]);
  const randomEvents = shuffleArray([...Events]).slice(0, 3);

  if (!event) {
    return <SinglePageLoading />;
  }
  return (
    <>
      {isLoading ? (
        <SinglePageLoading />
      ) : (
        <main className="single-page">
          <div className="d-flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-event-details" : "event-details"
              }
            >
              Home
            </NavLink>
            <img src={arrow} alt=""loading="lazy" />
            <NavLink
              to="/event"
              className={({ isActive }) =>
                isActive ? "active-event-details" : "event-details"
              }
            >
              Events
            </NavLink>
            <img src={arrow} alt=""loading="lazy" />
            <NavLink
              to={`/single-page/${event._id}`}
              className={({ isActive }) =>
                isActive ? "active-event-details" : "event-details"
              }
            >
              Event Details
            </NavLink>
          </div>
          <img src={event.image} alt="" className="single-page-img mt-4"loading="lazy" />
          <div className="container-lg mt-4">
            <div className="row d-lg-flex gap-5 justify-content-between">
              <div className="col-lg-8 col-md-12 event-detail ps-0">
                <div className="mb-4">
                  <img
                    src={calender}
                    alt="Calendar icon"
                    className="me-2 mb-lg-3 mb-2"
                  />
                  <span>
                    {event.date} {event.time}
                  </span>
                </div>
                <div>
                  <img
                    src={locationIcon}
                    alt="Location icon"
                    className="me-2 mb-lg-3 mb-2"
                  />
                  <span>{event.location}</span>
                </div>
                <div className="my-3 event-tag-div">
                  {event?.tags?.length > 0 ? (
                    event.tags[0]?.split(" ").map((eventTag) => (
                      <i key={eventTag} className="event-tags">
                        #{eventTag}
                      </i>
                    ))
                  ) : (
                    <p>No tags available</p>
                  )}
                </div>

                <div>
                  <h1>{event.title}</h1>
                  <p className="event-des">{event.description}</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 event-price d-flex row justify-content-between m-0 ">
                <h1 className="text-center price-h1">Price</h1>
                <div className="w-100">
                  {Array.isArray(event.price) && event.price.length > 0 ? (
                    event.price.map((priceOption) => (
                      <div
                        key={priceOption.type}
                        className="d-flex justify-content-between"
                      >
                        <p className="mb-1 type">{priceOption.type}</p>
                        <p className="mb-0 price">
                          NGN{" "}
                          {priceOption.price > 0
                            ? priceOption.price.toLocaleString()
                            : "Free"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No ticket prices available</p>
                  )}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button onClick={() => setModalShow(true)}>
                    Select Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3 mt-5">
            <h1 className="other-event-h1">Other Events You Might Like</h1>
            <Link to="/event" className="see-all">
              See All
            </Link>
          </div>
          <div className="event-container">
            {randomEvents
              .map((event) => {
                return (
                  <div className="event-item" key={event._id}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-img"
                    />
                    <h2 className="event-title">{event.title}</h2>
                    <p className="m-0">
                      <span className="me-1">Host:</span>
                      {event.host}
                    </p>
                    <p className="m-0 my-1">
                      <span className="me-1">Category:</span>
                      {event.category}
                    </p>
                    <div className="d-flex gap-2 m-0">
                      <span className="icons ">
                        <img src={locationIcon} alt=""loading="lazy" />
                      </span>
                      <p className="w-100">{event.location}</p>
                    </div>

                    <div className="d-flex gap-2 my-0">
                      <span className="icons">
                        <img src={calender} alt=""loading="lazy" />
                      </span>
                      <p>{event.date}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <span className="icons">
                        <img src={ticket} alt=""loading="lazy" />
                      </span>
                      <p>{event.ticket}</p>
                    </div>
                  </div>
                );
              })
              .slice(0, 3)}
          </div>
          <Ticket
            show={modalShow}
            onHide={() => setModalShow(false)}
            ticketPrice={event.price}
            total={totalPrice}
          />
        </main>
      )}
    </>
  );
};

export default SinglePage;
