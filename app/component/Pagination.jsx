"use client";

import Link from "next/link";

function Pagination({ currentPage, totalPages }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      <ul className="inline-flex items-center -space-x-px">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <Link
              href={`/?page=${number}&limit=5`}
              className={`px-3 py-2 leading-tight border transition-colors duration-300 ml-5 ${
                number === currentPage
                  ? "text-black  border-red-500"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
