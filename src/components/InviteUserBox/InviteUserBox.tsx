import { Avatar, Button, Card, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getUsers, updateWishList } from "../../axios";
import { useParams } from "react-router-dom";

export interface IInviteUserBoxProps {
  wishList: any;
}

export const InviteUserBox = ({ wishList }: IInviteUserBoxProps) => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  // get all users
  const getData = async () => {
    const { data } = await getUsers();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddUser = async (userId: string) => {
    if (id) {
      await updateWishList(id, {
        ...wishList,
        invited_users: [...wishList.invited_users, userId],
      });
    }
    window.location.reload();
  };

  const handleRemoveUser = async (userId: string) => {
    if (id) {
      await updateWishList(id, {
        ...wishList,
        invited_users: wishList.invited_users.filter(
          (id: string) => id !== userId
        ),
      });
    }
    window.location.reload();
  };

  return (
    <Card withBorder radius="md" padding="md">
      <Text size="xl" fw={500} mb={"md"}>
        Users
      </Text>
      {/* display all users, with add or delete buttons next to them */}
      <Flex direction={"column"} gap={"md"}>
        {data.map((user: any) => {
          return (
            <Flex justify={"space-between"} key={user.username}>
              <Flex gap={"md"}>
                <Avatar radius={"xl"} color="red">
                  {user.username.match(/\b\w/g).join("")}
                </Avatar>
                <Text mt={8}>{user.username}</Text>
              </Flex>
              {wishList.invited_users.includes(user.id) ? (
                <Button onClick={(e: any) => handleRemoveUser(user.id)}>
                  Remove
                </Button>
              ) : (
                <Button onClick={(e: any) => handleAddUser(user.id)}>
                  Add
                </Button>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Card>
  );
};
