
import { revalidatePath } from "next/cache";
import { AuthGetCurrentUserServer, cookiesClient } from "../../utils/amplify-utils";
import { Flex, Text, Button } from '@radix-ui/themes';

import Logout from "../../components/Logout";
import { redirect } from "next/navigation";

async function App() {
  const user = await AuthGetCurrentUserServer();
  console.log("\n\n\n"+user + "\n\n\n");
  if (!user) {
    return redirect("/login");
  }
  const { data: todos } = await cookiesClient.models.Todo.list();

  async function addTodo(data: FormData) {
    "use server";
    const title = data.get("title") as string;
    await cookiesClient.models.Todo.create({
      content: title,
      done: false,
      priority: "medium",
    });
    revalidatePath("/");
  }

  return (
    <>
      <h1>Hello, Amplify 👋</h1>
      {user && <Logout />}
      <form action={addTodo}>
        <input type="text" name="title" />
        <Button type="submit">Add Todo</Button>
      </form>

      <ul>
        {todos ? todos.map((todo) => <li key={todo.id}>{todo.content}</li>) : <div>No todos yet</div>}
      </ul>
    </>
  );
}

export default App;