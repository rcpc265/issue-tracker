"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import AuthButton from "./AuthButton";

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
    <nav className="border-b px-5 py-3 h-14">
      <Container>
        <Flex gap="6" justify="between" align="center">
          <ul>
            <Flex gap="6" align="center">
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
            </Flex>
          </ul>
          <Box>
            <AuthButton />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};
export default NavBar;
