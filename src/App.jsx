import "./App.css";
import React, { useState } from "react";
import UserForm from "./components/UserForm";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
var url = "https://backend-admin-c2lx.onrender.com/";

function App() {
  const [admin, setAdmin] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [buttonText, setButtonTextx] = useState("Admin Page->");
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (admin === true) {
      setAdmin(false);
      setButtonTextx("Admin Page->");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}api/v1/getbookings`);
      console.log(data.message);
      setBookings(data.message);
      setAdmin(true);
      setButtonTextx("<-Booking Page");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const lowkey = (x) => {
    setAdmin(false);
    setButtonTextx(x);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="poop">
        <SyncLoader color="black" loading={loading} margin={5} />
      </div>
      <div>
        <h1>Hotel Room Management</h1>
      </div>
      <div>
        <button onClick={fetchBookings} id="toggle">
          {buttonText}
        </button>
      </div>
      <div>
        {admin === false ? (
          <UserForm />
        ) : (
          <Admin Bookings={bookings} purple={lowkey} />
        )}
      </div>
    </div>
  );
}

export default App;
