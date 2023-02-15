import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateBill = () => {
  const [user, setUser] = useState({
    invoice_no: "",
    paid_to: "",
    creation_date: "",
  });

  const { invoice_no, paid_to, creation_date } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/users", user);
    window.location = "/";
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5" style={{ marginTop: "100px" }}>
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter invoice number"
              name="invoice_no"
              value={invoice_no}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mt-3"
              placeholder="Enter Company Name"
              name="paid_to"
              value={paid_to}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg mt-3"
              placeholder="Enter Creation Date"
              name="creation_date"
              value={creation_date}
              onChange={onInputChange}
            />
          </div>

          <button className="btn btn-primary btn-block mt-3">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBill;
