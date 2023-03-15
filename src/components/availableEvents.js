import React, { useState, useEffect, Fragment, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Records from "./school.json";

import { UserContext } from "../App";

const Event = (props) => (
  <tr>
    <td>{props.event.institution}</td>
    <td>{props.event.state}</td>
    <td>{props.event.type}</td>
    <td>{props.event.eventPriority}</td>
    <td>{props.event.startDate}</td>
    <td>{props.event.endDate}</td>
    <td>{props.event.available}</td>
  </tr>
);

const eventListStyle = {
  marginLeft: "10px",
};

const tableStyle = {
  marginLeft: "10px",
  marginTop: "10px",
  marginRight: "10px",
};

export default function AvailableEvents() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  var userList = currentUser.split("-");

  const [events, setEvents] = useState([]);

  const tempAvailableEvents = [];
  const [availableEvents, setAvailableEvents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    password: "",
    almaMater: "",
    date: [],
    type: "",
  });

  const [inputFields, setInputFields] = useState([
    { startDate: "", endDate: "" },
  ]);

  const [viewDates, setViewDates] = useState(false);

  function viewDatesClicked() {
    setViewDates(true);
  }

  const params = useParams();
  const navigate = useNavigate();

  const [entered, setEntered] = useState(false);

  function eventList() {
    return availableEvents.map((event) => {
      console.log(events);
      return <Event event={event} key={event._id} />;
    });
  }

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

      //  console.log("events");
      //  console.log(events);

      //  console.log(events[0].startDate);
      //  console.log("formcontents");
      //  console.log(form.date[0].startDate);
      //  console.log(events[0].startDate > form.date);

      //  for(let i = 0; i < events.length; ++i)
      //  {
      //     //edit event for comparing
      //     var localStart = events[i].startDate;
      //     var localEnd = events[i].endDate;
      //     //local = local.startDate.replace('T', ' ');
      //     console.log(localStart);

      //     var arr = localStart.split('-');
      //     var arr2 = arr[2].split('T');
      //     var startString = arr[1] + "/" + arr2[0] + "/" + arr[0] + "/" + arr2[1];
      //     console.log(startString);

      //     arr = localEnd.split('-');
      //     arr2 = arr[2].split('T');
      //     var endString = arr[1] + "/" + arr2[0] + "/" + arr[0] + "/" + arr2[1];

      //     console.log(endString);

      //     var comparableEventStart = startString.split('/');
      //     var comparableEventEnd = endString.split('/');

      //     for(let j = 0; j < form.date.length; ++i)
      //     {
      //     //edit form dates for comparing
      //     var localStartForm = events[i].startDate;
      //     var localEndForm = events[i].endDate;
      //     //local = local.startDate.replace('T', ' ');
      //     console.log(localStart);

      //     var arr = localStartForm.split('-');
      //     var arr2 = arr[2].split('T');
      //     var startStringForm = arr[1] + "/" + arr2[0] + "/" + arr[0] + "/" + arr2[1];
      //     console.log(startStringForm);

      //     arr = localEndForm.split('-');
      //     arr2 = arr[2].split('T');
      //     var endStringForm = arr[1] + "/" + arr2[0] + "/" + arr[0] + "/" + arr2[1];

      //     console.log(endStringForm);

      //     var comparableFormStart = startStringForm.split('/');
      //     var comparableFormEnd = endStringForm.split('/');

      //         if(startStringForm[0] <= startString[0] && endStringForm[0] >= endString[0])
      //         {
      //             console.log("here");
      //             availableEvents.push(events[i]);
      //         }
      //     }
      //  }
      setAvailableEvents(availableEvents);
      setEvents(events);
      setAvailableEvents(events);
      //setEvents(availableEvents);
      console.log("new events");
      console.log(events);
      console.log("available events");
      console.log(availableEvents);
    }

    getEvents();

    return;
  }, [availableEvents.length]);

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:2500/user/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `Hello An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const profile = await response.json();
      if (!profile) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      console.log("PROFILE");
      console.log(profile);

      for (let i = 0; i < inputFields.length; i++) {
        inputFields.pop();
      }

      for (let i = 0; i < profile.date.length; i++) {
        console.log(profile.date[i]);
        inputFields.push(profile.date[i]);
      }

      setForm(profile);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    for (let i = 0; i < form.date.length; i++) {
      form.date = [];
    }

    console.log("SUBMITTED INPUT FIELDS");
    console.log(inputFields);

    for (let i = 0; i < inputFields.length; i++) {
      form.date.push(inputFields[i]);
    }

    console.log("SUBMITTED FORM");
    console.log(form);

    e.preventDefault();
    const editedPerson = {
      name: form.name,
      password: form.password,
      almaMater: form.almaMater,
      date: form.date,
      type: form.type,
      gender: form.gender,
    };

    console.log(editedPerson);

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:2500/updateUser/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/eventList");
  }

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ startDate: "", endDate: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleStartChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "startDate") {
      values[index].startDate = event.target.value;
    } else {
      values[index].startDate = event.target.value;
    }

    setInputFields(values);
  };

  const handleEndChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "endDate") {
      values[index].endDate = event.target.value;
    } else {
      values[index].endDate = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    alert(JSON.stringify(inputFields, null, 2));
  };

  const formStyle = {
    marginLeft: "50px",
    marginRight: "50px",
  };

  const titleStyle = {
    marginLeft: "50px",
  };

  const buttonStyle = {
    marginLeft: "10px",
  };

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <br></br>
      <h3 style={eventListStyle}>{form.name}'s Event Availability</h3>
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
          </tr>
        </thead>
        <tbody>{eventList()}</tbody>
      </table>
    </div>
  );
}
