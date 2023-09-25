import { Container, Flex, Loader, SimpleGrid, Text } from "@mantine/core";
import { WishListCard } from "../WishListCard/WishListCard";
import { getWishLists } from "../../axios";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await getWishLists();
      if (response.data) {
        setData(response.data);
      } else {
        // Handle the case where data is undefined or falsy
        console.error("Data is undefined or empty");
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error fetching data:", error);
    }
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
