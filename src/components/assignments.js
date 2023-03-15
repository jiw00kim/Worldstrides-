import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import { UserContext } from "../App";

const buttonStyle = {
  marginRight: "10px",
};

//add default assignment to database
//don't have preferences implemented
//implement based on availability
//add amount available
//upon button press, go to function that goes through each event, and assigns to a user
//create isAvailable function that gets the dates and tests if available

const Event = (props) => (
  <tr>
    <td>{props.event.institution}</td>
    <td>{props.event.state}</td>
    <td>{props.event.type}</td>
    <td>{props.event.eventPriority}</td>
    <td>{props.event.startDate}</td>
    <td>{props.event.endDate}</td>
    <td>{props.event.available}</td>
    {/* <button className="btn btn-primary">Assignment</button> */}

    <td>{props.event.assignment}</td>
  </tr>
);

const User = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.date}</td>
    <td>{props.user.almaMater}</td>
    <td>{props.user.assignmentCount}</td>
    <td>{props.user.state}</td>

    <td></td>
  </tr>
);

export default function Assignments() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    eventPriority: "",
    state: "",
    type: "",
    institution: "",
    startDate: "",
    endDate: "",
    available: "",
    assignment: "",
    happy: "",
  });

  const navigate = useNavigate();

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

      for (let i = 0; i < events.length; ++i) {}

      console.log("EVENTS NEW", events);

      setEvents(events);
    }

    getEvents();

    return;
  }, [events.length]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:2500/user/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const users = await response.json();
      setUsers(users);
    }

    getUsers();

    return;
  }, [users.length]);

  function eventList() {
    return events.map((event) => {
      console.log(events);
      return (
        <Event
          event={event}
          key={event._id}
          availability={event.availability}
        />
      );
    });
  }

  // This method will map out the records on the table
  function userList() {
    return users.map((user) => {
      console.log("USERS");
      console.log(users);
      return <User user={user} key={user._id} />;
    });
  }

  const buttonStyle = {
    marginLeft: "10px",
  };

  const buttonRightStyle = {
    marginRight: "30%",
    marginTop: "10px",
  };

  const eventListStyle = {
    marginLeft: "10px",
  };

  const tableStyle = {
    marginLeft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  };

  function assignment() {
    navigate("./../eventList"); //we can replace to create Navbar called Assignemnt, which contains every assign employee lists in page and numbers based on order of priority
  }

  function assign() {
    console.log("in assign");

    var tempEvents = events;
    var tempUsers = users;

    //sort users according to number of events they are assigned to

    console.log("tempEvents", tempEvents);

    //same user can be assigned to multiple events, but must not exceed their count
    //add looping through all user unavailability, and keeping a bool value, that when is set to false, breaks
    //then start testing

    //add levels of priority for checks
    for (var i = 0; i < events.length; ++i) {
      var eventEndArrFull = tempEvents[i].endDate.split(" ");
      var eventEndArr = eventEndArrFull[0].split("/");
      var eventEndMonth = eventEndArr[0];
      var eventEndDay = eventEndArr[1];
      var eventEndYear = eventEndArr[2];

      var eventStartArrFull = tempEvents[i].startDate.split(" ");
      var eventStartArr = eventStartArrFull[0].split("/");
      var eventStartMonth = eventStartArr[0];
      var eventStartDay = eventStartArr[1];
      var eventStartYear = eventStartArr[2];

      tempEvents[i].assignment = "Not Assigned";
      console.log("event", events[i].assignment);
      var found = false;
      for (var j = 0; j < users.length; ++j) {
        console.log("EVENT: ", tempEvents[i]);
        console.log("USER: ", tempUsers[j]);

        //logic for almaMater

        for (let k = 0; k < users[j].date.length; ++k) {
          var userStartArr = users[j].date[k].startDate.split("-");
          var userStartYear = userStartArr[0];
          var userStartMonth = userStartArr[1];
          var userStartDay = userStartArr[2];

          var userEndArr = users[j].date[k].endDate.split("-");
          var userEndYear = userEndArr[0];
          var userEndMonth = userEndArr[1];
          var userEndDay = userEndArr[2];

          //logic for dates
          //   if ( ((userStartMonth < eventStartMonth && userStartYear > eventStartYear) || (userStartMonth > eventStartMonth && userStartYear >= eventStartYear) ||
          //   (userStartMonth == eventStartMonth && userStartDay != eventStartDay)) &&

          //  ((userEndMonth < eventEndMonth && userEndYear == eventEndYear) || (userEndMonth == eventEndMonth && (userEndDay > eventEndDay && userStartDay > eventStartDay)))
          //   &&
          //   (tempUsers[j].assignmentCount != 0)
          //   )
          //   {
          //     console.log("ASSIGNING DUE TO AVAILABILITY")
          //     tempEvents[i].assignment = users[j]
          //     tempUsers[j].assignmentCount--;
          //   }

          var available = false;
          console.log(
            userStartMonth,
            userStartDay,
            userStartYear,
            eventStartMonth,
            eventStartDay,
            eventStartYear
          );
          //have an if statement outside of this one for the months

          //add conditional for the years

          if (users[j].state === events[i].state) {
            if (
              (userEndMonth < eventStartMonth && userEndYear > eventEndYear) ||
              (userStartMonth > eventStartMonth &&
                userStartYear < eventStartYear) ||
              userStartMonth == eventStartMonth
            ) {
              if (
                userStartMonth == userEndMonth &&
                (userStartDay > eventEndDay ||
                  (userEndDay < eventStartDay && userEndDay < eventStartDay))
                //tempEvents[i].state === tempUsers[j].state))
                // events[i].state === users[j].state))
              ) {
                console.log("ASSIGNING DUE TO AVAILABILITY");
                console.log(events[i].state, users[j].state);
                console.log(tempUsers[j].name);
                tempEvents[i].assignment = tempUsers[j].name;
                update(tempEvents[i], tempEvents[i]._id);
                tempUsers[j].assignmentCount--;
                found = true;
                break;
              }
              if (events[i].institution === users[j].almaMater) {
                console.log("ASSIGNING DUE TO SAME ALMA MATER");
                console.log(tempUsers[j].name);
                console.log(events[i].state, users[j].state);
                tempEvents[i].assignment = tempUsers[j].name;
                update(tempEvents[i], tempEvents[i]._id);
                //keep a temp of this to reset it, maybe not
                tempUsers[j].assignmentCount--;
                found = false;
                available = false;
                break;
              }
              if (events[i].state === users[j].state) {
                console.log("ASSIGNING DUE TO SAME STATE");
                console.log(tempUsers[j].name);
                tempEvents[i].assignment = tempUsers[j].name;
                update(tempEvents[i], tempEvents[i]._id);
                tempUsers[j].assignmentCount--;
                found = false;
                available = false;
                break;
              }
            }
          }

          if (
            found === false &&
            events[i].statet !== users[j].state &&
            available === true
          ) {
            console.log(events[i].state, users[j].state);
            tempEvents[i].assignment = "Not Assigned";
            update(tempEvents[i], tempEvents[i]._id);
          }
        }
      }
    }
    setEvents(tempEvents);
    console.log("Events after setting from tempEvents", events);
  }

  async function update(event, id) {
    const editedPerson = {
      eventPriority: event.eventPriority,
      institution: event.institution,
      state: event.state,
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      available: event.available,
      assignment: event.assignment,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:2500/updateEvent/${id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/assignments");
  }

  function onSubmit() {
    navigate("/assignments");
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div className="form-group" style={buttonStyle} onClick={assign}>
        <input type="button" value="Assign" className="btn btn-primary" />
      </div>
      <div className="form-group" style={buttonRightStyle} onClick={assignment}>
        <input
          type="button"
          value="View Event List"
          className="btn btn-success"
        />
      </div>
      <br></br>
      <h3 style={eventListStyle}>Event List</h3>
      <table style={tableStyle} className="table table-striped">
        <thead>
          <tr>
            <th>Institution</th>
            <th>State</th>
            <th>Event Priority</th>
            <th>Event Type</th>
            <th>Start Date/Time</th>
            <th>End Date/Time</th>
            <th>Availability</th>
            <th>Assignment</th>
          </tr>
        </thead>
        <tbody>{eventList()}</tbody>
      </table>
      <br></br>
      <div className="form-group" style={buttonStyle} onSubmit={onSubmit}>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
    </div>
  );
}
