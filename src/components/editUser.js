import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router";
import Records from "./school.json";

const state = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function EditUser() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    almaMater: "",
    date: [],
    type: "",
    gender: "",
    state: "",
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
      state: form.state,
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
      <h3 style={titleStyle}>Edit Account</h3>
      <br></br>
      <form style={formStyle} onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="almaMater">Alma Mater</label>
          <div></div>
          <input
            list="form-control"
            placeholder={form.almaMater}
            className="form-control"
            onChange={(e) => updateForm({ almaMater: e.target.value })}
          />
          <div></div>
          <datalist id="form-control" value={form.almaMater}>
            <option></option>
            {Records.map((op) => (
              <option>{op.institution}</option>
            ))}
          </datalist>
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
        <input
          type="button"
          value="Edit Dates"
          className="btn btn-warning"
          onClick={viewDatesClicked}
        />
        <br></br>
        <br></br>
        {viewDates === true && (
          <div className="form-group">
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className="form-group">
                  <label>Start Date/Time</label>
                  <br></br>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    disable={index === 0}
                    value={inputField.startDate}
                    onChange={(event) => handleStartChange(index, event)}
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>End Date/Time</label>
                  <br></br>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    disable={index === 0}
                    value={inputField.endDate}
                    onChange={(event) => handleEndChange(index, event)}
                  />
                </div>
                <br></br>
                <hr></hr>
                <div className="form-group">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => handleAddFields(index)}
                  >
                    Add
                  </button>

                  <button
                    style={buttonStyle}
                    className="btn btn-danger"
                    type="button"
                    disable={index === 0}
                    onClick={() => handleRemoveFields(index)}
                  >
                    Remove
                  </button>
                  <br></br>
                </div>
                <br></br>
              </Fragment>
            ))}
          </div>
        )}
        <br></br>
        <div className="form-group">
          <input type="submit" value="Update Account" className="btn btn-primary" />
        </div>
        <br></br>
        <br></br>
      </form>
    </div>
  );
}
