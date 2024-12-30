import React, { useEffect, useState } from "react";
import "../Styles/Main.css";
import { category, Events } from "../APIS/Events";
import LocationIcon from "../assets/location.svg";
import Calender from "../assets/calendar.svg";
import Ticket from "../assets/ticket.svg";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { RiShareFill } from "react-icons/ri";
import HomePage from "./HomePage";
import Navbar from "../Navbar/Navbar";
import OffcanvasNavbar from "../Navbar/OffcanvasNavbar";
import Footer from "../Navbar/Footer";
import { Link, NavLink, Outlet, useMatch, useNavigate } from "react-router";
import axios from "axios";
import MainLoader from "../Auth/MainLoader";
import { useAuth } from "../Auth/AuthContext";
import toast from "react-hot-toast"; // Make sure to import toast

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const match = useMatch("/");
  const [isLoading, setIsLoading] = useState(true);
  const [isEvents, setIsEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState(new Set());
  const token = localStorage.getItem("mubby-event-token");

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:4090/api/users/all-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.events);
      setIsEvents(res.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const randomEvents = shuffleArray([...isEvents]).slice(0, 3);

  const handlebtn = () => {
    if (user) {
      navigate("/event");
    } else {
      navigate("/sign-up");
    }
  };

  const handleSaveEvent = async (eventId) => {
    if (!user) {
      toast.error("You must be logged in to save events.");
      return;
    }

    try {
      if (savedEvents.has(eventId)) {
        await axios.delete(
          `http://localhost:4090/api/users/delete-saved-events`,
          {
            data: {
              userId: user._id,
              eventId: eventId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        savedEvents.delete(eventId);
        toast.success("Event unsaved successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:4090/api/users/saved-events",
          {
            userId: user._id,
            eventId: eventId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        savedEvents.add(eventId);
        toast.success(response.data.message);
      }
      setSavedEvents(new Set(savedEvents));
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error(error.response.data.message);
    }
  };

  const copyEventLink = (eventId) => {
    const eventLink = `http://localhost:5173/single-page/${eventId}`; // Adjust the URL as needed
    navigator.clipboard
      .writeText(eventLink)
      .then(() => {
        toast.success("Event link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link.");
      });
  };

  return (
    <>
      <Navbar />
      <OffcanvasNavbar />
      {match ? (
        <div>
          <HomePage />
          {isLoading ? (
            <MainLoader />
          ) : (
            <main className="main">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1>Upcoming Events</h1>
                <a href="/event">See All</a>
              </div>
              <div className="event-container">
                {randomEvents
                  .map((event) => {
                    return (
                      <div className="event-item" key={event._id}>
                        <Link to={`/single-page/${event._id}`}>
                          <img
                            src={event.image}
                            alt={event.title}
                            className="event-img"
                          />
                        </Link>
                        <h2 className="event-title">{event.title}</h2>
                        <p className="m-0">
                          <span className="me-1">Host:</span>
                          {event.createdBy}
                        </p>
                        <p className="m-0 my-1">
                          <span className="me-1">Category:</span>
                          {event.category}
                        </p>
                        <div className="d-flex gap-2 m-0">
                          <span className="icons ">
                            <img src={LocationIcon} alt="" loading="lazy" />
                          </span>
                          <p className="w-100">{event.location}</p>
                        </div>
                        <div className="d-flex gap-2 my-0">
                          <span className="icons">
                            <img src={Calender} alt="" loading="lazy" />
                          </span>
                          <p>{event.date}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <span className="icons">
                            <img src={Ticket} alt="" loading="lazy" />
                          </span>
                          <div className="d-flex justify-content-between w-100">
                            <p>{event.ticket}</p>
                            {user ? (
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  onClick={() => handleSaveEvent(event._id)}
                                  className={`save-button ${
                                    savedEvents.has(event._id) ? "saved" : ""
                                  }`}
                                >
                                  {savedEvents.has(event._id) ? (
                                    <IoBookmark />
                                  ) : (
                                    <IoBookmarkOutline />
                                  )}
                                </div>
                                <RiShareFill
                                  onClick={() => copyEventLink(event._id)}
                                />
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
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
                        <img
                          src={events.image}
                          alt=""
                          className="image"
                          loading="lazy"
                        />
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
                <div className="d-lg-flex align-items-center justify-content-between gap-5">
                  <div className="join-create-event mb-5 mb-lg-0">
                    <h1>Join An Event</h1>
                    <p>
                      Discover exciting events that match your interests and
                      join with just a few clicks. Whether it's a concert,
                      workshop, or social gathering, our platform makes it
                      simple to find and book tickets. Stay updated with event
                      details and enjoy seamless entry with digital tickets.
                      Join the fun and make memories!
                    </p>
                    <button className="join-btn" onClick={handlebtn}>
                      Join Event
                    </button>
                  </div>
                  <div className="join-create-event">
                    <h1>Create An Event</h1>
                    <p>
                      Bring your vision to life by creating and hosting your own
                      event. From intimate meetups to large-scale gatherings,
                      our easy-to-use platform helps you manage everything—from
                      ticketing to promotion. Engage with your audience, track
                      your attendees, and make your event a success in just a
                      few steps.
                    </p>
                    <NavLink to="/create-events">
                      <button className="create-btn">Create Event</button>
                    </NavLink>
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
                            <img src={LocationIcon} alt="" loading="lazy" />
                          </span>
                          <p className="w-100">{event.location}</p>
                        </div>
                        <div className="d-flex gap-2 my-0">
                          <span className="icons">
                            <img src={Calender} alt="" loading="lazy" />
                          </span>
                          <p>{event.date}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <span className="icons">
                            <img src={Ticket} alt="" loading="lazy" />
                          </span>
                          <p>{event.ticket}</p>
                        </div>
                      </div>
                    );
                  })
                  .slice(0, 3)}
              </div>
            </main>
          )}
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
};

export default Main;
