import React, { useContext, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { UserContext } from "../context/userContext";

const localizer = momentLocalizer(moment);

const AdminCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date() });
  const { users, loggedInUser } = useContext(UserContext);
  const currentUser = users.find(
    (user) => user.username === loggedInUser.username
  );

  const getUserEvents = () => {
    let userEvents = [];

    // Transform purchases into events
    if (currentUser.purchases) {
      currentUser.purchases.forEach((purchase) => {
        const event = {
          title: `${purchase.purchaseName} - ${purchase.total}₪`,
          start: new Date(purchase.datePurchased),
          end: new Date(purchase.datePurchased),
          type: "purchase", // added a type property to make it easier to identify
          allDay: true,
        };
        userEvents.push(event);
      });
    }

    // Transform incomes into events
    if (currentUser.incomes) {
      currentUser.incomes.forEach((income) => {
        const event = {
          title: `${income.incomeName} + ${income.incomeAmount}₪`,
          start: new Date(income.dateIncome),
          end: new Date(income.dateIncome),
          type: "income", // added a type property to make it easier to identify
          allDay: true,
        };
        userEvents.push(event);
      });
    }

    return userEvents;
  };
  const [events, setEvents] = useState(getUserEvents);

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "#f0f0f0"; // default color

    if (event.type === "income") {
      backgroundColor = "green";
    } else if (event.type === "purchase") {
      backgroundColor = "red";
    }

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };

    return { style: style };
  };

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
          eventPropGetter={eventStyleGetter} // <-- Use eventStyleGetter here
        />
      </div>
    </div>
  );
};

export default AdminCalendar;
