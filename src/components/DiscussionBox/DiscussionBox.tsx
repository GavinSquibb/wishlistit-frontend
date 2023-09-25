import { Avatar, Card, Flex, ScrollArea, Text, TextInput } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export interface IDiscussionBoxProps {
  id: string;
}

export const DiscussionBox = ({ id }: IDiscussionBoxProps) => {
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  // get socket url from wishlist id
  const socketUrl = useMemo(() => {
    return `ws://localhost:8000/ws/chat/${id}/`;
  }, [id]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const username = localStorage.getItem("username");

  const onSendMessage = (e: any) => {
    e.preventDefault();
    const jsonData = JSON.stringify({
      message: message,
      username: username,
    });
    sendMessage(jsonData);
  };

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev: any) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting...",
    [ReadyState.OPEN]: "Connected!",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed, please refresh",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <Card withBorder radius={"md"} padding={"xl"} h={400}>
      <ScrollArea h={320} px={"sm"}>
        <Flex gap={"sm"} direction={"column"}>
          <Text size={"sm"}>{connectionStatus}</Text>
          {messageHistory &&
            messageHistory.map((message: any, idx: any) => {
              const text = JSON.parse(message.data);

              return (
                <Flex
                  gap={"sm"}
                  justify={
                    text.username === username ? "flex-end" : "flex-start"
                  }
                >
                  <Avatar radius={"xl"} color="red">
                    {text.username ? text.username.match(/\b\w/g).join("") : ""}
                  </Avatar>
                  <Card
                    withBorder
                    radius={"md"}
                    padding={"sm"}
                    w={"fit-content"}
                  >
                    <Text size={"sm"} key={idx}>
                      {text ? `${text.message}` : null}
                    </Text>
                  </Card>
                </Flex>
              );
            })}
        </Flex>
      </ScrollArea>
      <form onSubmit={onSendMessage}>
        <TextInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
      </form>
    </Card>
  );
};
