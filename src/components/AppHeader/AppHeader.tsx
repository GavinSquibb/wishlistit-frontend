import {
  Avatar,
  Button,
  Container,
  Flex,
  Group,
  Header,
  Image,
} from "@mantine/core";
import logo from "../../assets/wishlistit-logo.png";
import { useNavigate } from "react-router-dom";

export function AppHeader() {
  const navigate = useNavigate();

  return (
    <Header height={60}>
      <Container fluid>
        <Flex justify={"space-between"}>
          <Group spacing={30}>
            <Image maw={200} src={logo} alt="wishlistit-logo" />
            <Button variant="subtle" onClick={() => navigate("/")}>
              Wish Lists
            </Button>
            <Button variant="subtle" onClick={() => navigate("/create")}>
              Create Wish List
            </Button>
          </Group>
          <Avatar color="red" radius={"xl"} top={5}>
            {localStorage.username.match(/\b\w/g).join("")}
          </Avatar>
        </Flex>
      </Container>
    </Header>
  );
}
