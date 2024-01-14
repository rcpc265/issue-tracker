"use client";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavBar = () => {
  const path = usePathname();
  const routes = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Issues",
      path: "/issues",
    },
  ];
  return (
    <nav>
      <ul
        className="flex space-x-6 border-b px-5 h-14 items-center
      "
      >
        <li>
          <Link href="/">
            <AiFillBug className="text-lg" />
          </Link>
        </li>
        {routes.map((route) => (
          <li
            key={route.path}
            className={clsx(
              "transition-all px-2 py-1 hover:underline underline-offset-4 rounded",
              path === route.path
                ? "text-white bg-zinc-950"
                : "hover:text-white hover:bg-zinc-950"
            )}
          >
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
