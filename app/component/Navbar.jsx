"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaCartArrowDown } from "react-icons/fa";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, status } = useSession();
  console.log(data, "data");
  console.log(status, "auth status");
  return (
    <nav className="bg-white shadow-md relative z-30">
      <div
        className="container mx-auto flex items-center justify-between px-4 py-3
      bg-white
      "
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          MyBrand
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="block text-gray-600 hover:text-blue-600 focus:outline-none md:hidden"
          aria-label="Toggle Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } font-semibold text-center absolute top-16 left-0 w-full bg-white space-y-4 px-4 py-6 md:static md:flex md:space-x-6 md:space-y-0 md:w-auto md:py-0 items-center justify-center`}
        >
          <li>
            <Link
              href="/"
              className="block text-gray-600 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block text-gray-600 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart <FaCartArrowDown />
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block text-gray-600 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="block text-gray-600 hover:text-blue-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </li>
          {status === "authenticated" &&
            (data?.user?.role === "admin" ||
              data?.user?.role === "super-admin") && (
              <li>
                <Link
                  href="/add-products"
                  className="block text-gray-600 hover:text-blue-600 transition duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Products
                </Link>
              </li>
            )}
              {status === "authenticated" &&
            (data?.user?.role === "admin" ||
              data?.user?.role === "super-admin") && (
              <li>
                <Link
                  href="/add-products"
                  className="block text-gray-600 hover:text-blue-600 transition duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                 Orders
                </Link>
              </li>
            )}
          {status === "authenticated" ? (
            <li>
              <Link
                href="/login"
                className="flex justify-center items-center gap-2 px-4 py-2  bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow-md transition-all"
                onClick={() => signOut()}
              >
                Log Out
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-2  bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow-md transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
