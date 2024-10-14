import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";

import {useUser} from "../context/UserContext";
import axios from "axios";

export default function Home() {
  const { user, loading, } = useUser();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/all-events"); // Adjust the endpoint as needed
        setEvents(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch events");
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <section className="bg-black min-h-screen text-[#ededed] pt-20 px-5 lg:px-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center lg:text-start">👋 Welcome, {user ? user.username : "User"}</h1>
        <p  className="text-xl font-bold text-center my-5 lg:my-10">Events happening near you</p>

        <div className="flex gap-5 flex-wrap ">
          {/* <div className="bg-[#0a0a0a] border border-[#1d1d1d] rounded-lg p-4 shadow-md md:w-[400px]">
            <p className="text-[#d2d6de] font-bold">Created by {user ? user.username : "User"}</p>
            <h2 className="text-[#ededed] font-bold text-xl mt-5">
              Lorem Festival
            </h2>
            <p className="text-[#879d93] mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatum dolor nihil laborum adipisci repellat repudiandae
              veniam tempora expedita eveniet quam!
            </p>

            <span className="flex justify-between items-center font-bold mt-5">
              <p className="text-[#a1a1a1]">Mon 29th July, 2024</p>
              <p className="text-[#a1a1a1]">10:00PM</p>
            </span>

            <div className="flex items-center mt-5">
              <button className="bg-[#ededed] text-[#141414] font-bold rounded-full px-4 py-2 hover:bg-[#fff] transition w-full">
                Notify Me
              </button>
            </div>
          </div> */}

{error && <p className="text-red-500">{error}</p>}
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="flex gap-5 flex-wrap">
            {events.map((event) => (
              <div key={event.id} className="bg-[#0a0a0a] border border-[#1d1d1d] rounded-lg p-4 shadow-md md:w-[400px]">
                <p className="text-[#d2d6de] font-bold">Created by {user && event.user.username ? (event.user.username === user.username ? "You" : event.user.username) : "Unknown"}</p>
                <h2 className="text-[#ededed] font-bold text-xl mt-5">{event.eventName}</h2>
                <p className="text-[#879d93] mt-3">{event.eventDesc}</p>

                <span className="flex justify-between items-center font-bold mt-5">
                  <p className="text-[#a1a1a1]">{new Date(event.eventDate).toLocaleDateString()}</p>
                  <p className="text-[#a1a1a1]">{new Date(event.eventTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </span>

                <div className="flex items-center mt-5">
                  <button className="bg-[#ededed] text-[#141414] font-bold rounded-full px-4 py-2 hover:bg-[#fff] transition w-full">
                    Notify Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  );
}
