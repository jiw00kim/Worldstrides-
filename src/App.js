import './components/App.css';
import React from "react";
import { useState } from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import StaffList from "./components/staffList";
import EventList from "./components/eventList";
import EditUser from "./components/editUser";
import EditEvent from './components/editEvent';
import CreateUser from "./components/createUser";
import CreateEvent from "./components/createEvent";
import CreateLogin from './components/createLogin';
import ApplyEvent from './components/editEvent2';
import ViewAvailability from './components/availability';
import AvailableEvents from './components/availableEvents';
import AdminCenter from './components/adminCenter';
import EventPreferences from './components/eventPreferences';
import Assignments from './components/assignments';

export var UserContext = React.createContext({
  currentUser: "default",
  setCurrentUser: () => {}
});

function App() {
  const [currentUser, setCurrentUser] = useState("default");
  const value = { currentUser, setCurrentUser };

 return (
   <div>
    <UserContext.Provider value={value}>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<CreateLogin />} />
       <Route exact path="/staffList" element={<StaffList />} />
       <Route exact path="/eventList" element={<EventList />} />
       <Route path="/editUser/:id" element={<EditUser />} />
       <Route path="/editEvent/:id" element={<EditEvent />} />
       <Route path="/editEvent2/:id" element={<ApplyEvent />} />
       <Route path="/createUser" element={<CreateUser />} />
       <Route path="/createEvent" element={<CreateEvent />} />
       <Route path="/createLogin" element = {<CreateLogin />} />
       <Route path="/ApplyEvent" element = {<ApplyEvent />} />
       <Route path="/viewAvailability/:id" element = {<ViewAvailability />} />
       <Route path="/availableEvents/:id" element = {<AvailableEvents />} />
       <Route path="/adminCenter" element = {<AdminCenter />} />
       <Route path="/eventPreferences" element = {<EventPreferences />} />
       <Route path="/assignments" element = {<Assignments /> } />
     </Routes>
 
     {/* <div>
        <img class = "logo-img" src = "images/logo/download.png" alt = "logo"/>
     </div> */}
  </UserContext.Provider>
</div>
            

 );
};
 
export default App;