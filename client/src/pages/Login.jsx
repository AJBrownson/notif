import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        email,
        password,
      });

      if (res.status === 200) {
        setSuccess("Login successful!");
        // Call the login function from context
        await login(res.data.token, res.data.userId);
        setTimeout(() => {
          navigate("/home");
        }, 100);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          "Login failed. Try again.";
        setError(errorMessage);
      } else {
        setError("An error occurred. Try again.");
      }
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white px-10">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[400px] border p-4 rounded-lg flex-col items-center justify-center space-y-5"
      >
        <h1 className="text-3xl font-bold mb-5">Login</h1>
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
            type="text"
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
            Login
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mt-2 text-center">{success}</p>
        )}
        <div className="mt-3 text-center text-xs">
          <p>Don't have an account?</p>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </main>
  );
}
