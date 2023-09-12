import {
  Avatar,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Header,
  Image,
} from "@mantine/core";
import logo from "../../assets/wishlistit-logo.png";

export function AppHeader() {
  return (
    <Header height={60}>
      <Container fluid>
        <Flex justify={"space-between"}>
          <Group spacing={30}>
            <Image maw={200} src={logo} alt="wishlistit-logo" />
            <Button variant="subtle">Wish Lists</Button>
            <Button variant="subtle">Create Wish List</Button>
          </Group>
          <Avatar color="blue" radius={"xl"} top={5}>
            GS
          </Avatar>
        </Flex>
      </Container>
    </Header>
  );
}
