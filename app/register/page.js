"use client";

import { redirect } from "next/dist/server/api-utils";

export default function RegisterForm() {
  const handleSubmit = async (formData) => {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      role: "user",
    };
    console.log("Form Data:", data);
    // Add your logic to send data to the server
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    redirect("/login");
  };

  return (
    <main>
      <section>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
            action={handleSubmit}
            className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg"
          >
            <h1 className="text-2xl font-bold text-center text-gray-700">
              Register
            </h1>
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
