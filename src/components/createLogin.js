import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import MicrosoftLogin from "react-microsoft-login";

import { UserContext } from "../App";

export default function CreateLogin() {
  var { setCurrentUser } = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const authHandler = (err, data) => {
    console.log(err, data);
  };
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

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

  const invalid = ["!", "#", "$", "%", "^", "-", " ", "&", "*", "(", ")", "~"];

  let i = 0;

  // This function will handle the submission.
  async function onSubmit(e) {
    var myUser;
    e.preventDefault();

    console.log(users);

    //users.getUsers();

    var found = false;

    for (let i = 0; i < users.length; i++) {
      if (users[i].name === form.name && users[i].password === form.password) {
        found = true;
        myUser = users[i];
        setCurrentUser(
          myUser.type +
            "-" +
            myUser.name +
            "-" +
            myUser.password +
            "-" +
            myUser._id
        );
        break;
      } else if (users[i].name === invalid) {
        found = false;
      } else {
        found = false;
      }
    }
    if (found === true) {
      if (myUser.type === "Admin") {
        navigate("/staffList");
      } else {
        navigate("/eventList");
      }
    } else if (found === false && users.name === invalid) {
      navigate("/createUser");
      alert("You enter ivalid UserName or Password");
    } else if (found === false) {
      i++;
      console.log(i);
      alert("Incorrect Username or Password. ");
      if (i === 5) {
        navigate("/createUser");
        alert(
          "You enter 5 times incorrect Username or Password\n please sign up again."
        );
      }
    }
  }

  const formStyle = {
    marginLeft: "5%",
    width: "500px",
  };

  const titleStyle = {
    marginLeft: "5%",
    marginRight: "5%",
  };

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <br></br>
      <h3 style={titleStyle}>Sign In</h3>
      <br></br>
      <form style={formStyle} onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            required
            placeholder="First_Name Last_Name"
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
            required
            placeholder="Type Your Password Here"
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <br></br>
        <br></br>
        <div className="form-group">
          <input
            type="submit"
            value="Sign in"
            className="btn btn-primary"
            //style={{marginLeft:"20px"}}
          />
          <br></br>
          <br></br>
          <div className="form-group">
            <MicrosoftLogin
              buttonTheme="light"
              withUserData
              clientId="18bd2206-a8ad-488e-a049-e603048f9817"
              authCallback={authHandler}
            />
          </div>
          <br></br>

          {/* <input
          type = "submit"
          value = "Sign out"
          className="btn btn-primary btn-"
          style={{marginRight :"10px"}}
          navigate = "/" */}
        </div>
        <div class="text-center mb-3">
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}