import { Container, Flex } from "@radix-ui/themes";
import AuthButton from "./AuthButton";
import { NavLinks } from "./NavLinks";

const NavBar = () => (
  <nav className="border-b px-8 py-3 h-14">
    <Container>
      <Flex gap="6" justify="between" align="center">
        <NavLinks />
        <AuthButton />
      </Flex>
    </Container>
  </nav>
);

export default NavBar;
