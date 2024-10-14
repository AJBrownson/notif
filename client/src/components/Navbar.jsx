import { useState } from "react";
import { Link } from "react-router-dom";

import { FaPeopleGroup } from "react-icons/fa6";
import { BiCalendarEvent } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

import Modal from "./Modal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

        <button className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white font-bold text-sm">
          Signout
        </button>
      </nav>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form>
          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Name</label>
            <input
              type="text"
              className="border border-slate-700 rounded w-full py-2 px-3 bg-[#0a0a0a]"
              placeholder="Enter event name"
            />
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Description</label>
            <textarea
              className="border rounded  border-slate-700 w-full py-2 px-3 bg-[#0a0a0a]"
              rows="4"
              placeholder="Enter event description"
            ></textarea>
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Date</label>
            <input
              type="date"
              className="border border-slate-700 rounded w-full py-2 px-3 bg-[#0a0a0a]"
            />
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label className="block text-[#d2d6de]">Time</label>
            <input
              type="time"
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
