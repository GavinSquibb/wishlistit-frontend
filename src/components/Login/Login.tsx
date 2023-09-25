import React from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/wishlistit-logo.png";

export function AuthenticationForm(props: PaperProps) {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      username: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      username: (val) =>
        val.length <= 2 ? "Username should be longer than 2 characters" : null,
      password: (val) =>
        val.length <= 2
          ? "Password should include at least 2 characters"
          : null,
    },
  });

  return (
    <Center p={250}>
      <Paper radius="xl" p="xl" withBorder w={450} {...props}>
        <Center>
          <Stack>
            <Image maw={260} src={logo} alt="wishlistit-logo" />
            <Center>
              <Text size="lg" weight={500}>
                Welcome to WishListIt
              </Text>
            </Center>
          </Stack>
        </Center>

        <Divider my="lg" />

        <form
          onSubmit={form.onSubmit(async () => {
            const { data } = await axios.post(
              "http://localhost:8000/token/",
              {
                username: form.values.username,
                password: form.values.password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            localStorage.clear();
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data["access"]}`;
            navigate("/");
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Username"
              placeholder="Username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              error={
                form.errors.username &&
                "Username should include at least 2 characters"
              }
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 2 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            />
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
