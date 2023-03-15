import React, { useState } from "react";
import { useNavigate } from "react-router";
import Records from "./school.json";

export default function CreateEvent() {
  const [form, setForm] = useState({
    eventPriority: "",
    city: "",
    state: "",
    type: "",
    institution: "",
    startDate: "",
    endDate: "",
    assignment: ""
  });
  const navigate = useNavigate();

  const [startDateString, setStartDateString] = useState("");
  const [endDateString, setEndDateString] = useState("");

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const state = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newEvent = { ...form };

    console.log("NEW")
    console.log(newEvent);

    newEvent.startDate = startDateString;
    newEvent.endDate = endDateString;
    newEvent.assignment = "Not Assigned";

    console.log(newEvent);

    await fetch("http://localhost:2500/event/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({
      institution: "",
      state: "",
      type: "",
      startDate: "",
      endDate: "",
      eventPriority: "",
      avalible: "",
      assignment: "",
    });
    navigate("/eventList");
  }

  const formStyle = {
    marginLeft: "5%",
    width: "500px",
  };

  const titleStyle = {
    marginLeft: "5%",
  };
  const handleStartChange = (event) => {
    var arr = event.target.value.split("-");
    var arr2 = arr[2].split("T");
    var str = arr[1] + "/" + arr2[0] + "/" + arr[0] + " " + arr2[1];
    console.log(str);

    setStartDateString(str);
  };

  const handleEndChange = (event) => {
    var arr = event.target.value.split("-");
    var arr2 = arr[2].split("T");
    var str = arr[1] + "/" + arr2[0] + "/" + arr[0] + " " + arr2[1];
    console.log(str);

    setEndDateString(str);
  };

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <br></br>
      <h3 style={titleStyle}>Create New Event</h3>
      <div style={titleStyle}>
      </div>
      <br></br>
      <form style={formStyle} onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="institution">Institution (Enter a new institution, if not in the list)</label>
          <div></div>
          <input
            list="form-control"
            placeholder="Search"
            className="form-control"
            onChange={(e) => updateForm({ institution: e.target.value })}
          />
          <div></div>
          <datalist id="form-control" value={form.institution}>
            <option></option>
            {Records.map((op) => (
              <option>{op.institution}</option>
            ))}
          </datalist>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            required
            placeholder="City"
            type="text"
            className="form-control"
            id="city"
            value={form.city}
            onChange={(e) => updateForm({ city: e.target.value })}
          />
        </div>
        <br></br>
        <div className="form-group" size="30" placeholder="Search">
          <label htmlFor="state">State</label>
          <div></div>
          <select
            className="form-control"
            value={form.state}
            onChange={(e) => updateForm({ state: e.target.value })}
          >
            <div></div>
            <option></option>
            {state.map((op) => (
              <option>{op}</option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="type">Event Type</label>
          <div></div>
          <select
            className="form-control"
            value={form.type}
            onChange={(e) => updateForm({ type: e.target.value })}
          >
            <option></option>
            <option>Fair</option>
            <option>B2C</option>
            <option>B2B</option>
          </select>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="eventPriority">Event Priority</label>
          <div></div>
          <select
            className="form-control"
            value={form.eventPriority}
            onChange={(e) => updateForm({ eventPriority: e.target.value })}
          >
            <option></option>
            <option>Must Attend</option>
            <option>Should Attend</option>
            <option>Can Attend</option>
          </select>
        </div>

        {/* <br></br> */}
        {/* <div className="form-group">
        <label htmlFor="state">State</label>
        <div></div>
        <select value = {form.state} onChange = {(e)=>updateForm({state:e.target.value})}>
          <div></div>
          <option></option>
          {state.map((op)=><option>{op}</option>)}
        </select>
       </div> */}
        {/* <br></br> */}
        {/* <div className="form-group">
        <label htmlFor="school">Institution</label>
        <div></div>
        <input list = "form-control" size="50" placeholder="Search"/>
        <div></div>
        <datalist id = "form-control" value = {form.institution} onChange = {(e)=>updateForm({institution:e.target.value})}>
        <option></option>
        {
          Records.map((op) => <option>{op.institution}</option>)
        }
        </datalist>
      </div> */}

        <br></br>
        <div className="form-group">
          <label htmlFor="state">Start Date/Time</label>
          <input
            required
            type="datetime-local"
            className="form-control"
            id="startDate"
            name="startDate"
            //value={inputField.datetime}
            onChange={(e) => handleStartChange(e)}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="endDate">End Date/Time</label>
          <input
            required
            type="datetime-local"
            className="form-control"
            id="endDate"
            name="endDate"
            //value={inputField.datetime}
            onChange={(e) => handleEndChange(e)}
          />
        </div>
        <br></br>
        {/* <div className="form-group">
       <label htmlFor="availability">Join the Event</label>
       <div></div>
       <select className = "form-control" value = {form.availability} onChange = {(e) => updateForm({availability: e.target.value})}>
              <option>Select Default</option>
              <option>YES</option>
              <option>NO</option>
              <option>N/A</option>
         </select>
      </div> */}
        <div className="form-group">
          <input
            type="submit"
            value="Create Event"
            className="btn btn-primary"
          />
        </div>
        <br></br>
      </form>
    </div>
  );
}
