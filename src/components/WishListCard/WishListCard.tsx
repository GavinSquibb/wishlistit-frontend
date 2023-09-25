import { Card, Paper, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export interface IWishListCardProps {
  wishlist: any;
}

export function WishListCard({ wishlist }: IWishListCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      radius="md"
      padding={"md"}
      h={200}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/wishlist/${wishlist.wish_list_id}`)}
    >
      <Text size="xl" fw={500}>
        {wishlist.name}
      </Text>
      <Text size="sm" mt="sm" c="dimmed" h={150}>
        {wishlist.description}
      </Text>
    </Card>
  );
}
