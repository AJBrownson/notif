import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Modal = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const modalRef = useRef();
  
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
        onClose(); // Close the modal on successful submission
        // Clear state variables
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-[#1a1a1a] rounded-lg shadow-lg p-6 w-11/12 md:w-1/3"
      >
        <button
          onClick={onClose}
          className="text-red-500 hover:text-gray-800 absolute top-10 right-10"
        >
          &times;
        </button>
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
              className="border rounded border-slate-700 w-full py-2 px-3 bg-[#0a0a0a]"
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
      </div>
    </div>
  );
};

export default Modal;
