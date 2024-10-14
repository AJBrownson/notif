import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaPeopleGroup } from "react-icons/fa6";
import { BiCalendarEvent } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

import Modal from "./Modal";
import { useUser } from "../context/UserContext"; 

export default function Navbar() {
  const { user, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <main className="bg-[#0a0a0a] text-white p-4 md:px-10 border-b-[1px] border-slate-800 fixed w-full">
      <nav className="font-geistMono flex justify-between items-center">
        <Link to="/">
          <h1 className="font-bold font-geistSans text-sm">Notif</h1>
        </Link>
        <ul className="flex space-x-6 lg:space-x-10">
          <Link
            to="/home"
            className="flex space-x-2 items-center border border-slate-600 hover:border-blue-800 hover:bg-slate-700 py-1 px-2 rounded-md text-sm"
          >
            <FaPeopleGroup />
            <li className="hidden lg:block text-gray-200">Event</li>
          </Link>
          <button
            onClick={handleOpenModal}
            className="flex space-x-2 items-center border border-slate-600 hover:border-blue-800 hover:bg-slate-700 py-1 px-2 rounded-md text-sm"
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
