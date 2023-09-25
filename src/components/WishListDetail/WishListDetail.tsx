import { useState, useEffect } from "react";
import { getGiftItems, getWishListDetail } from "../../axios";
import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Flex,
  Grid,
  Loader,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { DiscussionBox } from "../DiscussionBox/DiscussionBox";
import { format } from "date-fns";
import { GiftItemCreateBox } from "../GiftItemCreateBox/GiftItemCreateBox";
import { GiftItemCard } from "../GiftItemCard/GiftItemCard";
import { InviteUserBox } from "../InviteUserBox/InviteUserBox";

export const WishListDetail = () => {
  const [data, setData] = useState<any>(undefined);
  const [giftItems, setGiftItems] = useState<any>([]);
  const { id } = useParams();

  const getData = async () => {
    const { data } = await getWishListDetail(id ? id : "");
    setData(data);
  };

  const getGiftItemsData = async () => {
    const { data } = await getGiftItems(id ? id : "");
    setGiftItems(data);
  };

  useEffect(() => {
    if (id) {
      getData();
      getGiftItemsData();
    }
  }, [id]);

  if (!data) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  const formattedDate = format(new Date(data.date), "dd/MM/yyyy");

  return (
    <Container size="xl">
      <Flex direction="column" gap="lg" mt="lg">
        <Flex justify={"space-between"}>
          <Text size="xl" fw={700}>
            {data.name}
          </Text>
          <Text size="sm" mt="sm" c="dimmed">
            {formattedDate}
          </Text>
        </Flex>
        <Text size="sm" mt="sm" c="dimmed">
          {data.description}
        </Text>
        <Grid>
          <Grid.Col span={8}>
            <SimpleGrid cols={2}>
              {giftItems.map((item: any) => {
                return <GiftItemCard key={item.gift_item_id} giftItem={item} />;
              })}
              <GiftItemCreateBox />
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={4}>
            <InviteUserBox wishList={data}></InviteUserBox>
          </Grid.Col>
        </Grid>
        {/* if id exists, then render discussion box */}
        {id && <DiscussionBox id={id} />}
      </Flex>
    </Container>
  );
};
