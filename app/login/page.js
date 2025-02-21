"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const signUpUser = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signUpUser?.error) {
        setErrorMessage(signUpUser?.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen "
      style={{
        backgroundImage: "url(https://source.unsplash.com/1600x900/?city)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto border-4 border-white mb-4"
        />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login Please........</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center bg-white rounded-full p-3 shadow-md">
              <span className="text-gray-500 mr-2">👤</span>
              <input
              value={email}
                type="text"
                placeholder="Username"
                className="w-full bg-transparent focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center bg-white rounded-full p-3 shadow-md">
              <span className="text-gray-500 mr-2">🔒</span>
              <input
              value={password}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300 shadow-md mb-4"
          >
            Login
          </button>
        </form>
        <button 
        onClick={() => signIn("google")}
        className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300">
          <FaGoogle className="w-5 h-5 mr-2 text-orange-300" />
          Sign in with Google
        </button>
        <a
          href="#"
          className="text-sm text-gray-600 hover:underline mt-4 inline-block"
        >
          Forgot Username / Password?
        </a>
      </div>
    </div>
  );
}
