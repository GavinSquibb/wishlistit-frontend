import { Container, Flex, Loader, SimpleGrid, Text } from "@mantine/core";
import { WishListCard } from "../WishListCard/WishListCard";
import { getWishLists } from "../../axios";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const { data } = await getWishLists();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data.length) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Flex direction="column" gap="lg" mt="lg">
        <Text size="xl" fw={700}>
          {`${data.length} Total List${data.length > 1 ? "s" : ""}`}
        </Text>
        <SimpleGrid cols={2}>
          {data.map((wishlist) => (
            <WishListCard key={wishlist.id} wishlist={wishlist} />
          ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
}
