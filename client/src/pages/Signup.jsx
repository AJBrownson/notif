import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/signup", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        if (err.response.data.error === "User already exists") {
          setError("User already exists");
        } else {
          setError(err.response.data.error);
        }
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white px-10">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[400px] border p-4 rounded-lg flex-col items-center justify-center space-y-5"
      >
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
        <div className="flex flex-col space-y-2">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="bg-slate-500 text-white py-2 px-4 rounded-lg"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-slate-500 text-white py-2 px-4 rounded-lg"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-slate-500 text-white py-2 px-4 rounded-lg"
          />
        </div>

        <div className="flex">
          <button type="submit" className="w-full border py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <div className="mt-3 text-center text-xs">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </main>
  );
}
