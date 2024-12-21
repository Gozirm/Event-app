import React from "react";
import "../Styles/Main.css";
import { category, Events } from "../APIS/Events";
import LocationIcon from "../assets/location.svg";
import Calender from "../assets/calendar.svg";
import Ticket from "../assets/ticket.svg";
import HomePage from "./HomePage";
import Navbar from "../Navbar/Navbar";
import OffcanvasNavbar from "../Navbar/OffcanvasNavbar";
import Footer from "../Navbar/Footer";
import { Link, Outlet, useMatch } from "react-router";
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const Main = () => {
  const randomEvents = shuffleArray([...Events]).slice(0, 3);
  const match = useMatch("/");
  return (
    <>
      <Navbar/>
      <OffcanvasNavbar />
      {match ? (
        <div>
          <HomePage />
          <main className="main">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h1>Upcoming Events</h1>
              <a href="/event">See All</a>
            </div>
            <div className="event-container">
              {randomEvents
                .map((event) => {
                  return (
                    <Link key={event.id} to={`${event.path}/${event.id}`}>
                      <div className="event-item">
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
                            <img src={LocationIcon} alt="" />
                          </span>
                          <p className="w-100">{event.location}</p>
                        </div>

                        <div className="d-flex gap-2 my-0">
                          <span className="icons">
                            <img src={Calender} alt="" />
                          </span>
                          <p>{event.date}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <span className="icons">
                            <img src={Ticket} alt="" />
                          </span>
                          <p>{event.ticket}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
                .slice(0, 3)}
            </div>
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3 mt-5">
                <h1>Event Categories</h1>
                <a href="/event">See All</a>
              </div>
              <div className="event-container">
                {category.map((events) => {
                  return (
                    <div className="event-item event-cate" key={events.id}>
                      <img src={events.image} alt="" className="image" />
                      <div className="middle">
                        <div className="text">{events.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-center how-it-works">How it Works</h1>
              <div className="d-lg-flex  align-items-center justify-content-between gap-5">
                <div className="join-create-event mb-5 mb-lg-0">
                  <h1>Join An Event</h1>
                  <p>
                    Discover exciting events that match your interests and join
                    with just a few clicks. Whether it's a concert, workshop, or
                    social gathering, our platform makes it simple to find and
                    book tickets. Stay updated with event details and enjoy
                    seamless entry with digital tickets. Join the fun and make
                    memories!
                  </p>
                  <button className="join-btn">Join Event</button>
                </div>
                <div className="join-create-event">
                  <h1>Create An Event</h1>
                  <p>
                    Bring your vision to life by creating and hosting your own
                    event. From intimate meetups to large-scale gatherings, our
                    easy-to-use platform helps you manage everything—from
                    ticketing to promotion. Engage with your audience, track
                    your attendees, and make your event a success in just a few
                    steps.
                  </p>
                  <button className="create-btn">Create Event</button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3 mt-5">
              <h1>Upcoming Events</h1>
              <a href="/event">See All</a>
            </div>
            <div className="event-container">
              {randomEvents
                .map((event) => {
                  return (
                    <div className="event-item" key={event.id}>
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
                          <img src={LocationIcon} alt="" />
                        </span>
                        <p className="w-100">{event.location}</p>
                      </div>

                      <div className="d-flex gap-2 my-0">
                        <span className="icons">
                          <img src={Calender} alt="" />
                        </span>
                        <p>{event.date}</p>
                      </div>
                      <div className="d-flex gap-2">
                        <span className="icons">
                          <img src={Ticket} alt="" />
                        </span>
                        <p>{event.ticket}</p>
                      </div>
                    </div>
                  );
                })
                .slice(0, 3)}
            </div>
          </main>
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
};

export default Main;
