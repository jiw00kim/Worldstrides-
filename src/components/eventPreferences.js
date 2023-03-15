import React, { useEffect, useState } from "react";

 
export default function EventPreferences() {
 const [events, setEvents] = useState([]);
 const [isSelected] = useState(false);

 //dropdown showing these are available, star next to preference later

 
 //know what the current event is from props.event._id
 //create tempEvents list, then make copies of that, and reset the temp each time before reseting the events at the end
 //so we can just pass that value into the handleChange function
 //and search for the event with the matching id
 //could copy each event to a new list
 //change the one that needs changing
 //then set again
 //when unclicked we search, then pop
 //we should end with a submit button that submits everything and saves the new info

 //we could make it easier and have the user click a button and then add themselves to the event
 //then we could show in a dropdown, who has what event on the event list. 

 //no, we need to figure out how to dynamically change things on the list pages, not by clicking a button first
 //to get to the specific list item. 
const Event = (props) => ( 
  <tr>
    <td>{props.event.institution}</td>
    <td>{props.event.state}</td>
    <td>{props.event.type}</td>
    <td>{props.event.eventPriority}</td>
    <td>{props.event.startDate}</td>
    <td>{props.event.endDate}</td>
     <td>
     <div class="form-check">
  <input class="form-check-input" type="checkbox" value={isSelected} id="flexCheckDefault" onChange={e => handleChange(e, props.event._id) }></input>
  <label class="form-check-label" for="flexCheckDefault">
    Select Event
  </label>
</div>
     </td>
  </tr>
 );

const handleChange = (event, key) => {
  if(event.target.checked)
  {
    console.log(key)
    var copyEvents = []
    for(let i = 0; i < events.length; ++i)
    {
      copyEvents.push(events[i]);
    }
    for(let i = 0; i < events.length; ++i)
    {
      console.log(events[i])
      console.log(copyEvents[i])
      if(events[i]._id === key)
      {
        console.log("matched");
        //copyEvents[i].userList.push(key);
        //events[i].userList.push(key)
      }
    }
  } 
  else
  {
    console.log("unchecked")
    //copyEvents.pop(i);
  }
  //setIsSelected(!isSelected); 
  
}; 
 
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
     method: "DELETE"
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
 
 const eventListStyle = 
 {
   marginLeft: "10px"
 }

 const tableStyle =
 {
  marginLeft: "10px",
  marginTop: "10px",
  marginRight: "10px"
 }

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
           <th>Event Priority</th>
           <th>Event Type</th>
           <th>Start Date/Time</th>
           <th>End Date/Time</th>
           <th>Options</th>
         </tr>
       </thead>
       <tbody>{eventList()}</tbody>
     </table>
   </div>
 );
}