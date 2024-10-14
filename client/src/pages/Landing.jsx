import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold">Welcome to Notif</h1>
        <p className="text-lg mt-5">
          A simple notification app built with React and Firebase
        </p>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-center mt-5">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5">
              Sign Up
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
