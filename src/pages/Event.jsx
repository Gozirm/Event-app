import React from "react";
import SearchArea from "../Gateway/SearchArea";
import { Events } from "../APIS/Events";
import { Link } from "react-router";
import LocationIcon from "../assets/location.svg";
import Calender from "../assets/calendar.svg";
import Ticket from "../assets/ticket.svg";
import "../Styles/Event.css";
import "../Styles/Main.css";
const Event = () => {
  console.log(...Events);

  return (
    <>
      <main>
        <SearchArea />
        <div className="events-main main">
          <div className="d-flex align-items-center justify-content-between ">
            <h1>All Events</h1>
          </div>
          <div className="event-container ">
            {Events.map((event) => {
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
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Event;
