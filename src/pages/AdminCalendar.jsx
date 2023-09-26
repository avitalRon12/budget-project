import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const AdminCalendar = () => {
  const [events, setEvents] = useState([
    {
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)), // 1 hour later
      title: "Sample Event",
    },
  ]);
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date() });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "start" || name === "end") {
      const dateValue = new Date(Date.parse(value));
      const userTimezoneOffset = dateValue.getTimezoneOffset() * 60000;
      const localDate = new Date(dateValue.getTime() - userTimezoneOffset);
      setNewEvent((prev) => ({ ...prev, [name]: localDate }));
    } else {
      setNewEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setNewEvent({ title: "", start: new Date(), end: new Date() }); // Reset form
  };

  return (
    <div>
      <div>
        <input
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Event Title"
        />
        <input
          type="datetime-local"
          name="start"
          value={newEvent.start.toISOString().substr(0, 16)} // Format to "YYYY-MM-DDTHH:MM"
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Add Event</button>
      </div>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;
