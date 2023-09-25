import { Button, Card, Flex, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createGiftItem } from "../../axios";
import { useParams } from "react-router-dom";

export const GiftItemCreateBox = () => {
  const { id } = useParams();

  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      link: "",
    },
    validate: {
      name: (val) => (val.length < 1 ? "Must have a name" : null),
    },
  });

  const handleFormSubmit = async () => {
    await createGiftItem({
      name: form.values.name,
      price: form.values.price,
      link: form.values.link,
      wish_list: id,
    });

    // reload to keep most up to date data
    window.location.reload();
  };

  return (
    <Card withBorder radius="md" padding="md" h={300}>
      <form onSubmit={handleFormSubmit}>
        <Flex direction={"column"} gap={"xs"}>
          <TextInput
            label="Item Name"
            placeholder="Item Name"
            value={form.values.name}
            onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
            radius={"md"}
          />
          <TextInput
            label="Item Price"
            placeholder="Item Price"
            value={form.values.price}
            onChange={(e) => form.setFieldValue("price", e.currentTarget.value)}
            radius={"md"}
          />
          <TextInput
            label="Item Link"
            placeholder="Item Link"
            value={form.values.link}
            onChange={(e) => form.setFieldValue("link", e.currentTarget.value)}
            radius={"md"}
          />
          <Button type="submit">Create</Button>
        </Flex>
      </form>
    </Card>
  );
};
