import React, { useState } from "react";
import { useNavigate } from "react-router";

//CSV data is "flat" - there is no good way to embed sub-documents in a row of a CSV file, so you may want to restructure the data to match the structure you wish to have in your MongoDB documents.
 
export default function AdminCenter() {
  const [form ] = useState({
    eventPriority: "",
    state: "",
    type: "",
    institution: "",
    startDate: "",
    endDate: "",
    available: "",
    assignment: "",
  });

 const [file, setFile] = useState({
  name: "",
  contents: ""
 })

 const onImportEvent = e => 
 {
  const file = e.target.files[0]
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    setFile({name: file.name, contents: reader.result});
  }

  reader.onerror = () => {
    console.log('file error', reader.error)
  }
 }

 const navigate = useNavigate();

 const formStyle = 
 {    
   marginLeft: "5%",
   width: "500px"
 }

 const titleStyle = 
 {
  marginLeft: "5%",
  marginRight: "5%"
 }

 const buttonStyle = 
 {
  marginLeft: "5%",

 }

function runImportEvent()
{
  var text = file.contents
  console.log(file.contents)
  console.log(text)
  const lines = text.split('\n');
  console.log(lines)

  var newInstitution = ""
  var newState = ""
  var newType = ""
  var newStartDate = ""
  var newEndDate = ""
  var newAvailable = ""
  var newAssignment = ""
  var newEventPriority = ""

  for(let i = 0; i < lines.length; ++i)
  {
    var items = lines[i].split(',')
    newInstitution = items[0]
    newState = items[1]
    newType = items[2]
    newStartDate = items[3]
    newEndDate = items[4]
    newEventPriority = items[5]
    newAvailable = items[6]
    newAssignment = items[7]

    form.institution = newInstitution;
    form.state = newState;
    form.type = newType;
    form.startDate = newStartDate
    form.endDate = newEndDate
    form.eventPriority = newEventPriority
    form.available = newAvailable
    form.assignment = newAssignment

    console.log("ITEMS")
    console.log(items)
    console.log("FORM")
    console.log(form)

    var newEvent = { ...form };

    console.log("EVENT")
    console.log(newEvent)

    fetch("http://localhost:2500/event/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }
  navigate("/eventList")
}

 // This following section will display the form that takes the input from the user.
 return (
   <div>
    <br></br>
     <h3 style={titleStyle}>Import Events</h3>
       <div style={formStyle}>
        <br></br>
         <input
           type="file"
           onChange={onImportEvent}
         />
       </div>
       <br></br>
       <div className="form-group">
         <input style={buttonStyle}
           type="button"
           value="Import"
           className="btn btn-primary"
           onClick={runImportEvent}
         />
       </div>

   </div>
 );
}