import React, { useEffect, useState } from "react";
import axios from 'axios';

const SavedEvents = ({ userId }) => {
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const response = await axios.get(`/api/saved-events/${userId}`);
        setSavedEvents(response.data);
      } catch (error) {
        console.error("Error fetching saved events:", error);
      }
    };

    fetchSavedEvents();
  }, [userId]);
  return (
    <>
      <main>
        <div>
          <h2>Saved Events</h2>
          <ul>
            {savedEvents.map((event) => (
              <li key={event._id}>
                <h3>{event.title}</h3>
                <p>Hosted by: {event.host}</p>
                <p>Category: {event.category}</p>
                <p>Location: {event.location}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <img src={event.image} alt={event.title} />
                <p>Ticket Info: {event.ticket}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default SavedEvents;
