import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const buttonStyle = {
  marginRight: "10px",
};

const Event = (props) => (
  <tr>
    <td>{props.event.institution}</td>
    <td>{props.event.state}</td>
    <td>{props.event.type}</td>
    <td>{props.event.eventPriority}</td>
    <td>{props.event.startDate}</td>
    <td>{props.event.endDate}</td>
    <td>{props.event.available}</td>
    <td>
      <Link
        style={buttonStyle}
        className="btn btn-success"
        to={`/editEvent/${props.event._id}`}
      >
        Select Availability
      </Link>
      <Link
        style={buttonStyle}
        className="btn btn-warning"
        to={`/editEvent2/${props.event._id}`}
      >
        Edit
      </Link>
      <button
        style={buttonStyle}
        className="btn btn-danger"
        onClick={() => {
          props.deleteEvent(props.event._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function EventList() {
  const [events, setEvents] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:2500/event/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const events = await response.json();
      setEvents(events);
    }

    getEvents();

    return;
  }, [events.length]);

  // This method will delete a record
  async function deleteEvent(id) {
    await fetch(`http://localhost:2500/event/${id}`, {
      method: "DELETE",
    });
    const newEvents = events.filter((el) => el._id !== id);
    setEvents(newEvents);
  }

  // This method will map out the records on the table
  function eventList() {
    return events.map((event) => {
      console.log(events);
      return (
        <Event
          event={event}
          deleteEvent={() => deleteEvent(event._id)}
          key={event._id}
          availability={event.availability}
        />
      );
    });
  }

  const eventListStyle = {
    marginLeft: "10px",
  };

  const tableStyle = {
    marginLeft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  };

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <br></br>
      <h3 style={eventListStyle}>Event List</h3>
      <table style={tableStyle} className="table table-striped">
        <thead>
          <tr>
            <th>Institution</th>
            <th>State</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Start Date/Time</th>
            <th>End Date/Time</th>
            <th>Event availability</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{eventList()}</tbody>
      </table>
    </div>
  );
}
