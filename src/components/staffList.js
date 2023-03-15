import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const buttonStyle = {
  marginRight: "10px",
};

const User = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.almaMater}</td>
    <td>{props.user.state}</td>
    <td>{props.user.type}</td>
    <td>
      <button
        style={buttonStyle}
        className="btn btn-danger"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </button>
      <Link
        style={buttonStyle}
        className="btn btn-success"
        to={`/viewAvailability/${props.user._id}`}
      >
        Availability
      </Link>
      <Link
        style={buttonStyle}
        className="btn btn-success"
        to={`/availableEvents/${props.user._id}`}
      >
        Events
      </Link>
    </td>
  </tr>
);

export default function UserList() {
  const [users, setUsers] = useState([]);

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

  // This method will delete a record
  async function deleteUser(id) {
    await fetch(`http://localhost:2500/user/${id}`, {
      method: "DELETE",
    });
    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
  }

  // This method will map out the records on the table
  function userList() {
    return users.map((user) => {
      console.log("USERS");
      console.log(users);
      return (
        <User
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      );
    });
  }

  function showAvailability() {
    return users.map((user) => {
      console.log("users");
      console.log(users);
      return (
        <User
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
          pass={user.pass}
        />
      );
    });
  }

  const userListStyle = {
    marginLeft: "10px",
  };

  const tableStyle = {
    marginLeft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  };

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <br></br>
      <h3 style={userListStyle}>Staff List</h3>
      <table style={tableStyle} className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Alma Mater</th>
            <th>Current State</th>
            <th>Account Type</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
}
