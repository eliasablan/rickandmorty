"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarLinksType } from "./Navbar";

export default function NavbarLink({ enlace }: { enlace: NavbarLinksType }) {
  const pathname = usePathname();

  return (
    <li className={`${pathname === enlace.href && "underline"}`}>
      <Link href={enlace.href}>{enlace.titulo}</Link>
    </li>
  );
}
