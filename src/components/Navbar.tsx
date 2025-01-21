import Link from "next/link";
import React from "react";
import NavbarLink from "./NavbarLinks";

export type NavbarLinksType = {
  titulo: string;
  href: string;
};

const enlaces: NavbarLinksType[] = [
  {
    titulo: "Ubicaciones",
    href: "/ubicaciones",
  },
  {
    titulo: "Episodios",
    href: "/episodios",
  },
];

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Enlaces en pantallas pequeñas */}
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {enlaces.map((enlace, idx) => (
              <NavbarLink key={idx} enlace={enlace} />
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Rick y Morty
        </Link>
      </div>
      {/* Enlaces en pantallas grandes */}
      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {enlaces.map((enlace, idx) => (
            <NavbarLink key={idx} enlace={enlace} />
          ))}
        </ul>
      </div>
    </div>
  );
}
