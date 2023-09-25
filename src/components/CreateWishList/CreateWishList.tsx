import {
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createWishList } from "../../axios";

export function CreateWishList() {
  const form = useForm({
    initialValues: {
      wishlistname: "",
      description: "",
    },
    validate: {
      wishlistname: (val) => (val.length < 1 ? "Must have a name" : null),
      description: (val) => (val.length < 1 ? "Must have a description" : null),
    },
  });

  const handleFormSubmit = async () => {
    await createWishList({
      name: form.values.wishlistname,
      description: form.values.description,
      giftItems: [],
      creator: 1,
    });
  };

  return (
    <Container size={"sm"} mt={"md"}>
      <Text size="xl" fw={700}>
        Create Wish List
      </Text>
      <form onSubmit={handleFormSubmit}>
        <Stack>
          <TextInput
            label="Wish List Name"
            placeholder="New Wish List"
            value={form.values.wishlistname}
            onChange={(event) =>
              form.setFieldValue("wishlistname", event.currentTarget.value)
            }
            radius="md"
          />
          <Textarea
            label="Description"
            placeholder="Wish List Description"
            value={form.values.description}
            onChange={(event) =>
              form.setFieldValue("description", event.currentTarget.value)
            }
            radius={"md"}
            minRows={5}
          />
          <Button type="submit">Create</Button>
        </Stack>
      </form>
    </Container>
  );
}
