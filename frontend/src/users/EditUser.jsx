
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditUser() {
  const { empid } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/employees/${empid}`);
        setUser(result.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    loadUser();
  }, [empid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/employees/${empid}`, user);
      navigate("/");
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  return (
    <div className="container">
      <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2 className="text-center m-4">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            className="form-control"
            value={user.empname}
            onChange={(e) => setUser({ ...user, empname: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            value={user.empsalary}
            onChange={(e) => setUser({ ...user, empsalary: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={user.empage}
            onChange={(e) => setUser({ ...user, empage: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            value={user.empcity}
            onChange={(e) => setUser({ ...user, empcity: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
    </div>
    </div>
  );
}
