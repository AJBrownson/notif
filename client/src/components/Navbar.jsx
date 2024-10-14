import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaPeopleGroup } from "react-icons/fa6";
import { BiCalendarEvent } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

import Modal from "./Modal";
import { useUser } from "../context/UserContext"; 

export default function Navbar() {
  const { user, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  
    // Ensure the user is logged in
    if (!user || !user._id) {
      alert("User not logged in");
      return;
    }
  
    axios.post("http://localhost:5000/api/events/create", {
      eventName, 
      eventDesc, 
      eventTime, 
      eventDate,
      user: user._id
    })
    .then((res) => {
      if (res.status === 201) {
        alert("Event created successfully!");
        setIsModalOpen(false);
        setEventName("");
        setEventDesc("");
        setEventDate("");
        setEventTime("");
      }
    })
    .catch((error) => {
      alert("An error occurred");
      console.error(error);
    });
  };
  




  // const handleLogout = () => {
  //   // Clear user state
  //   setUser(null);

  //   // Optionally clear any tokens or user data stored in localStorage/sessionStorage
  //   localStorage.removeItem('token');

  //   // Redirect to login or home page
  //   navigate('/login'); // Use navigate instead of router.push
  // };

  
  return (
    <main className="bg-[#0a0a0a] text-white p-4 md:px-10 border-b-[1px] border-slate-800 fixed w-full">
      <nav className="font-geistMono flex justify-between items-center">
        <Link to="/">
          <h1 className="font-bold font-geistSans text-sm">Notif</h1>
        </Link>
        <ul className="flex space-x-6 lg:space-x-10">
          <Link
            to="/home"
            className="flex space-x-2 items-center border border-slate-600 hover:border-blue-800 hover:bg-slate-700 py-1 px-2 rounded-md  text-sm"
          >
            <FaPeopleGroup />
            <li className="hidden lg:block text-gray-200">Event</li>
          </Link>
          <button
            onClick={handleOpenModal}
            className="flex space-x-2 items-center border border-slate-600 hover:border-blue-800 hover:bg-slate-700 py-1 px-2 rounded-md  text-sm"
          >
            <BiCalendarEvent />
            <li className="hidden lg:block text-gray-200">Create</li>
          </button>
        </ul>

        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-bold text-sm flex items-center space-x-2"
        >
          <MdLogout />
          <span>Signout</span>
        </button>
      </nav>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="border border-slate-700 rounded w-full py-2 px-3 bg-[#0a0a0a]"
              placeholder="Enter event name"
            />
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Description</label>
            <textarea
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
              className="border rounded  border-slate-700 w-full py-2 px-3 bg-[#0a0a0a]"
              rows="4"
              placeholder="Enter event description"
            ></textarea>
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="border border-slate-700 rounded w-full py-2 px-3 bg-[#0a0a0a]"
            />
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Time</label>
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="border border-slate-700 rounded w-full py-2 px-3 bg-[#0a0a0a]"
            />
          </div>

          <button className="bg-[#ededed] text-[#141414] font-bold rounded-full px-4 py-2 hover:bg-[#fff] transition w-full">
            Create Event
          </button>
        </form>
      </Modal>
    </main>
  );
}
