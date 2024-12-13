import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

 

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/employees");
    setUsers(result.data);
  };

  const deleteUser = async (empid) => {
    await axios.delete(`http://localhost:8080/api/employees/${empid}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Empid</th>
              <th scope="col">Name</th>
              <th scope="col">Salary</th>
              <th scope="col">Age</th>
              <th scope="col">City</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.empid}>
                <th scope="row">
                  {index + 1}
                </th>
                <td>{user.empid}</td>
                <td>{user.empname}</td>
                <td>{user.empsalary}</td>
                <td>{user.empage}</td>
                <td>{user.empcity}</td>
                <td>
                  
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.empid}`}
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.empid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}