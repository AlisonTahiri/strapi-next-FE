import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <div className="bg-gray-200 fixed w-full">
      <nav className="flex justify-between p-4 max-w-4xl mx-auto items-center">
        <Link href="/">LOGO</Link>

        <ul className="flex gap-2">
          <li className="cursor-pointer p-2 hover:bg-gray-300">Technology</li>
          <li className="cursor-pointer p-2  hover:bg-gray-300">Sports</li>
        </ul>
      </nav>
    </div>
  );
}
