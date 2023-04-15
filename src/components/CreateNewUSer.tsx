import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import useUserActions from "../hooks/useUserActions";

const CreateNewUser = () => {
  const { addUser } = useUserActions();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as unknown as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    addUser({ name, email, github });
    form.reset();
  };
  return (
    <Card style={{ marginTop: "16px" }}>
      <Title>Create new user</Title>
      <form onSubmit={handleSubmit}>
        <Text>Name</Text>
        <TextInput name='name' placeholder="name" />
        <Text>Email</Text>
        <TextInput name='email' placeholder="email" />
        <Text>Github</Text>
        <TextInput name='github' placeholder="github user" />
        <div>
          <Button type='submit' style={{ marginBottom: "16px" }}>
            Create
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateNewUser;
