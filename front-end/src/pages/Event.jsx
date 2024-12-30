import React, { useEffect, useState } from "react";
import SearchArea from "../Gateway/SearchArea";
import { Link } from "react-router-dom"; // Updated to use react-router-dom
import LocationIcon from "../assets/location.svg";
import Calender from "../assets/calendar.svg";
import Ticket from "../assets/ticket.svg";
import "../Styles/Event.css";
import "../Styles/Main.css";
import { RiShareFill } from "react-icons/ri";
import SkeletonLoader from "../Auth/SkeletonLoader";
import axios from "axios";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import toast from "react-hot-toast";
import { useAuth } from "../Auth/AuthContext";

const Event = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEvents, setIsEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState(new Set());
  const token = localStorage.getItem("mubby-event-token");
  const { user } = useAuth();

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://event-app-9x9f.onrender.com/api/users/all-events",
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
  const handleSaveEvent = async (eventId) => {
    if (!user) {
      toast.error("You must be logged in to save events.");
      return;
    }

    try {
      if (savedEvents.has(eventId)) {
        await axios.delete(
          `https://event-app-9x9f.onrender.com/api/users/delete-saved-events`,
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
          "https://event-app-9x9f.onrender.com/api/users/saved-events",
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
    const eventLink = `https://event-app-three-pi.vercel.app/single-page/${eventId}`;
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
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <main>
          <SearchArea />
          <div className="events-main main">
            <div className="d-flex align-items-center justify-content-between">
              <h1>All Events</h1>
            </div>
            <div className="event-container">
              {isEvents?.map((event) => {
                const {
                  title,
                  category,
                  location,
                  date,
                  ticket,
                  image,
                  createdBy,
                  _id,
                } = event;

                return (
                  <div key={_id} className="event-item">
                    <Link to={`/single-page/${_id}`}>
                      <img
                        src={image}
                        alt={title}
                        className="event-img"
                        loading="lazy"
                      />
                    </Link>

                    <h2 className="event-title">{title}</h2>
                    <p className="m-0">
                      <span className="me-1">Host:</span>
                      {createdBy}
                    </p>
                    <p className="m-0 my-1">
                      <span className="me-1">Category:</span>
                      {category}
                    </p>
                    <div className="d-flex gap-2 m-0">
                      <span className="icons">
                        <img src={LocationIcon} alt="Location" loading="lazy" />
                      </span>
                      <p className="w-100">{location}</p>
                    </div>
                    <div className="d-flex gap-2 my-0">
                      <span className="icons">
                        <img src={Calender} alt="Calendar" loading="lazy" />
                      </span>
                      <p>{date.slice(0, 15)}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <span className="icons">
                        <img src={Ticket} alt="Ticket" loading="lazy" />
                      </span>
                      <div className="d-flex justify-content-between w-100">
                        <p>{ticket}</p>
                        {user ? (
                          <div className="d-flex align-items-center gap-2">
                            <div
                              onClick={() => handleSaveEvent(_id)}
                              className={`save-button ${
                                savedEvents.has(_id) ? "saved" : ""
                              }`}
                            >
                              {savedEvents.has(_id) ? (
                                <IoBookmark />
                              ) : (
                                <IoBookmarkOutline />
                              )}
                            </div>
                            <RiShareFill onClick={() => copyEventLink(_id)} />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Event;
