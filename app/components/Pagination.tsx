import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
};

export default function Pagination({
  currentPage,
  pageSize,
  totalPages,
}: Props) {
  return (
    <nav aria-label="Page navigation" className="flex flex-col items-center">
      <div>
        Showing {(currentPage - 1) * pageSize + 1} to {currentPage * pageSize}{" "}
        of {totalPages * pageSize} results.
      </div>
      <ul className="flex gap-px items-center justify-center text-sm my-0">
        <li className="list-none ps-0">
          <Link
            href={`/${currentPage - 1}`}
            className={clsx(
              `bg-gray-300 no-underline px-3 py-2 rounded-l-md hover:bg-gray-500 hover:text-gray-50 duration-200`,
              !Boolean(currentPage - 1) && "pointer-events-none opacity-30"
            )}
          >
            Previous
          </Link>
        </li>
        <li className={clsx("list-none ps-0", currentPage - 2 < 1 && "hidden")}>
          <Link
            href={`/${currentPage - 2}`}
            className="bg-gray-300  no-underline px-3 py-2 hover:bg-gray-500 hover:text-gray-50 duration-200"
          >
            {currentPage - 2}
          </Link>
        </li>

        <li className={clsx("list-none ps-0", currentPage - 1 < 1 && "hidden")}>
          <Link
            href={`/${currentPage - 1}`}
            className="bg-gray-300  no-underline px-3 py-2 hover:bg-gray-500 hover:text-gray-50 duration-200"
          >
            {currentPage - 1}
          </Link>
        </li>

        <li className="list-none ps-0">
          <div className="bg-gray-500 text-gray-50 no-underline px-3 py-2">
            {currentPage}
          </div>
        </li>

        <li
          className={clsx(
            "list-none ps-0",
            currentPage + 1 > totalPages && "hidden"
          )}
        >
          <Link
            href={`/${currentPage + 1}`}
            className="bg-gray-300  no-underline px-3 py-2 hover:bg-gray-500 hover:text-gray-50 duration-200"
          >
            {currentPage + 1}
          </Link>
        </li>

        <li
          className={clsx(
            "list-none ps-0",
            currentPage + 2 > totalPages && "hidden"
          )}
        >
          <Link
            href={`/${currentPage + 2}`}
            className="bg-gray-300  no-underline px-3 py-2 hover:bg-gray-500 hover:text-gray-50 duration-200"
          >
            {currentPage + 2}
          </Link>
        </li>

        <li className="list-none ps-0">
          <Link
            href="#"
            className={clsx(
              `bg-gray-300 no-underline px-3 py-2 rounded-r-md hover:bg-gray-500 hover:text-gray-50 duration-200`,
              !Boolean(currentPage + 1 <= totalPages) &&
                "pointer-events-none opacity-30"
            )}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
