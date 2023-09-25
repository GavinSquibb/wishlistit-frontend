import { Button, Card, Flex, Text } from "@mantine/core";
import { updateGiftItem } from "../../axios";

export interface IGiftItemCardProps {
  giftItem: any;
}

export const GiftItemCard = ({ giftItem }: IGiftItemCardProps) => {
  const markPurchased = async () => {
    await updateGiftItem(giftItem.gift_item_id, {
      ...giftItem,
      purchased: true,
    });
    window.location.reload();
  };

  return (
    <Card withBorder radius="md" padding="md" h={170}>
      <Flex direction={"column"} gap={"xs"}>
        <Text size="xl" fw={500}>
          {giftItem.name} {giftItem.purchased && "- PURCHASED"}
        </Text>
        <Text size="sm" c="dimmed">
          £{giftItem.price}
        </Text>
        <Text size="sm" c="dimmed">
          {giftItem.link}
        </Text>
        <Button onClick={markPurchased} disabled={giftItem.purchased}>
          Mark As Purchased
        </Button>
      </Flex>
    </Card>
  );
};
