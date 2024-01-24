"use client";
import { Flex } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

export const NavLinks = () => {
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
    <ul>
      <Flex gap="4" align="center">
        <li>
          <Link href="/">
            <AiFillBug className="text-2xl hover:scale-110 transition-transform" />
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
      </Flex>
    </ul>
  );
};
