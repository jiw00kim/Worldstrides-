import React from "react";
import { useState, useEffect, useContext } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { Navigate, NavLink } from "react-router-dom";

import { UserContext } from "../App";

const buttonStyle = {
  marginRight: "10px",
};

// Here, we display our Navbar
function Navbar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  var userList = currentUser.split("-");

  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");

  const [signedOut, setSignedOut] = useState(false);

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

    console.log("Current");
    console.log(currentUser);

    getUsers();

    return;
  }, [users.length]);

  const titleStyle = {
    marginLeft: "5%",
    fontSize: "30px",
  };

  const styles = {
    buttonStyle: {
      right: "10px",
      color: "black",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };

  function refershPage() {
    window.location.reload(false);
    Navigate("./");
  }
  function showAlert() {
    alert("Successfully Sign out...");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <h1 class="navbar-brand" href="#" style={titleStyle}>
            WorldStrides
          </h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {userList[0] == "Admin" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/assignments"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] == "Admin" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/staffList"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] != "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/eventList"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] == "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/createUser"
                  style={styles.buttonStyle}
                >
                  Sign up
                </NavLink>
              </li>
            )}

            {(userList[0] == "Admin" || userList[0] == "Lead") && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/createEvent"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] != "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to={`/editUser/${userList[3]}`}
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] != "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="assignments"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] == "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/createLogin"
                  style={styles.buttonStyle}
                >
                  Sign in
                </NavLink>
              </li>
            )}
            {/* {userList[0] != "default" && (
              <li className="nav-item cactive">
                <NavLink
                  className="nav-link"
                  to="/createLogin"
                  style={styles.buttonStyle}
                  onClick={refershPage}
                >
                  Sign out
                </NavLink>
              </li>
            )} */}
            {userList[0] != "default" && (
              <li className="nav-item cactive">
                <NavDropdown
                  className="nav-link"
                  style={styles.buttonStyle}
                  title="User Setting"
                  id="nav-dropdown"
                >
                  <NavDropdown.Item eventKey="3.1">
                    <NavLink
                      className="nav-link"
                      to={`/editUser/${userList[3]}`}
                      style={styles.buttonStyle}
                    >
                      My Account
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="3.2">
                    <NavLink
                      className="nav-link"
                      to={`/viewAvailability/${userList[3]}`}
                      style={styles.buttonStyle}
                    >
                      Event Availability
                    </NavLink>
                  </NavDropdown.Item>

                  <NavDropdown.Item eventKey="3.3">
                    <NavLink
                      className="nav-link"
                      to="/eventList"
                      style={styles.buttonStyle}
                    >
                      Event List
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
            {userList[0] == "Admin" && (
              <li className="nav-item cactive">
                <NavDropdown
                  className="nav-link"
                  to="/adminCenter"
                  style={styles.buttonStyle}
                  // onClick={refershPage}
                  title="Admin"
                  id="nav-dropdown"
                >
                  <NavDropdown.Item eventKey="4.1">
                    <NavLink
                      className="nav-link"
                      to="/adminCenter"
                      style={styles.buttonStyle}
                    >
                      Admin
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">
                    <NavLink
                      className="nav-link"
                      to="/assignments"
                      style={styles.buttonStyle}
                    >
                      Matches
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">
                    <NavLink
                      className="nav-link"
                      to="/staffList"
                      style={styles.buttonStyle}
                    >
                      StaffList
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4">
                    <NavLink
                      className="nav-link"
                      to="/createEvent"
                      style={styles.buttonStyle}
                    >
                      Create Event
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}

            {userList[0] != "default" && (
              <li className="nav-item cactive">
                <NavDropdown
                  className="nav-link"
                  style={styles.buttonStyle}
                  title="Setting"
                >
                  <NavDropdown.Item eventKey="5.1">
                    <NavLink
                      className="nav-link"
                      to="/createUser"
                      style={styles.buttonStyle}
                      onClick={(err) => {
                        alert("Go to sign up page.");
                      }}
                    >
                      Sign up
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="5.2">
                    <NavLink
                      className="nav-link"
                      to="/createLogin"
                      style={styles.buttonStyle}
                      onClick={(err) => {
                        alert("Go to sign in page.");
                      }}
                    >
                      Sign In
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="5.3">
                    <NavLink
                      className="nav-link"
                      to="/createLogin"
                      style={styles.buttonStyle}
                      onClick={(err) => {
                        alert("Successfully Log out your account.");
                      }}
                    >
                      Sign Out
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
