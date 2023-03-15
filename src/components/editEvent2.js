import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Records from "./school.json";
 
export default function EditEvent() {

 const [form, setForm] = useState({
  eventPriority:"",
  state:"",
  type:"",
  institution:"",
  startDate: "",
  endDate: "",
  available: "",
 });

 const [startDateString, setStartDateString] = useState("");
 const [endDateString, setEndDateString] = useState("");

 const [ startDate, setStartDate] = useState("");
 const [ endDate, setEndDate] = useState("");

 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {

   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://worldstrides.herokuapp.com//event/${params.id.toString()}`);

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

     setForm(profile);

     setStartDate(profile.startDate);
     setEndDate(profile.endDate);
     setStartDateString(profile.startDate);
     setEndDateString(profile.endDate);
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

   e.preventDefault();

   form.startDate = startDateString;
   form.endDate = endDateString;

   const editedPerson = {
     eventPriority: form.eventPriority,
     institution: form.institution,
     state: form.state,
     type: form.type,
     startDate: form.startDate,
     endDate: form.endDate,
     available:form.available,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://worldstrides.herokuapp.com//updateEvent/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/eventList");
 }

 const state = ["AL","AK","AZ","AR","CA","CO","CT",
 "DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD"
,"MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC",
"ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]

const formStyle = 
{    
  marginLeft: "50px",
  marginRight: "50px"
}

const titleStyle = 
{
 marginLeft: "50px"
}

const handleStartChange = (event) => {
  var local = "";
  local = event.target.value.replace('T', ' ');

  setStartDateString(local);

  setStartDate(local);
};

const handleEndChange = (event) => {
  var local = "";
  local = event.target.value.replace('T', ' ');

  setEndDateString(local);

  setEndDate(local);
};

 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
    <br></br>
  <h3 style={titleStyle}>Edit Event</h3>
  <br></br>
  <form style={formStyle} onSubmit={onSubmit}>
    <label htmlFor="institution">Institution</label>
    <div className="form-group">
    <div></div>
        <input list = "form-control" placeholder= {form.institution} className="form-control" onChange={(e) => updateForm({institution:e.target.value})}/>
        <div></div>
        <datalist id = "form-control" value = {form.institution}>
        <option></option>
        {
          Records.map((op) => <option>{op.institution}</option>)
        }
        </datalist>
       {/* <label htmlFor="institution">Institution</label>
      // <input
      //   type="text"
      //   className="form-control"
      //   id="institution"
      //   value={form.institution}
      //   onChange={(e) => updateForm({ institution: e.target.value })}
      // /> */}
    </div>
    <br></br>
    <div className="form-group" size = "30" placeholder="Search">
         <label htmlFor="state">State</label>
         <div></div>
         <select className = "form-control" value = {form.state} onChange = {(e)=>updateForm({state:e.target.value})}>
          <div></div>
          <option></option>
          {state.map((op)=><option>{op}</option>)}
        </select>
       </div>

       <br></br>
    <div className="form-group">
         <label htmlFor="type">Event Type</label>
         <select className = "form-control" value = {form.type} onChange = {(e) => updateForm({type: e.target.value})}>
              <option></option>
              <option>Fair</option>
              <option>B2C</option>
              <option>B2B</option>
         </select>
       </div>
      {/* <input
        type="text"
        className="form-control"
        id="state"
        value={form.state}
        onChange={(e) => updateForm({ state: e.target.value })}
      /> */}
      <br></br>
      <div className="form-group"> 
       <label htmlFor="eventPriority">Event Priority</label>
       <div></div>
       <select className = "form-control" value={form.eventPriority} onChange={(e)=>updateForm( {eventPriority : e.target.value})}>
        <option></option>
        <option>
          Must Attend
        </option>
        <option>
          Should Attend
        </option>
        <option>
          Can Attend
        </option>
       </select>     
       </div>

      {/* <input
        type="text"
        className="form-control"
        id="type"
        value={form.type}
        onChange={(e) => updateForm({ type: e.target.value })}
      /> */}
    <br></br>
    {/* <div className="form-group">
      <label htmlFor="type">Event Available</label>
      <select className="form-control" value = {form.available} onChange = {(e) => updateForm({available:e.target.value})}>
      <option></option>
      <option>Yes</option>
      <option>No</option>
      <option>Cancel</option>
      <option>N/A</option>
      </select>
    </div> */}
    <div className="form-group">
      <label htmlFor="state">Start Date/Time</label>
      <input 
               type="datetime-local"
               className="form-control"
               id="startDate"
               name="startDate"
               value={form.startDate}
               onChange={(e) => handleStartChange(e)}
               />
    </div>
    <br></br>
    <div className="form-group">
      <label htmlFor="endDate">End Date/Time</label>
      <input 
               type="datetime-local"
               className="form-control"
               id="endDate"
               name="endDate"
               value={form.endDate}
               onChange={(e) => handleEndChange(e)}
               />
    </div>
    <br></br>
    {/* <div className="form-group">
    <label htmlFor="availability">Join the Event</label>
         <div></div>
         <select className = "form-control" value = {form.availability} onChange = {(e) => updateForm({availability: e.target.value})} placeholder = {form.availability}>
              <option>Choose Availability</option>
              <option>YES</option>
              <option>NO</option>
              <option>N/A</option>
         </select>
       </div>
    <br></br> */}
    <br></br>
    <div className="form-group">
      <input
        type="submit"
        value="Update Event"
        className="btn btn-primary"
      />
    </div>
  </form>
  <br></br>
  <br></br>
</div>
 );
}