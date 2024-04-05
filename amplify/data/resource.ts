import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({
  // Who can access the "Todo" table?
  // - Authenticated users can perform CRUDL operations
  Todo: a.model({
      content: a.string(),
      done: a.boolean(),
      priority: a.enum(['low', 'medium', 'high'])
    })
    .authorization([a.allow.owner(), a.allow.public().to(['read'])]),

  Topics: a.model({
    name: a.string(),
    content: a.string(),
    chaptersID: a.string(),
    topic_no: a.integer()
  })
  .authorization([a.allow.public()]),

  Chapters: a.model({
    name: a.string(),
    subjectsID: a.string()
  })
  .authorization([a.allow.public()]),

  Subjects: a.model({
    user_id: a.string(),
    name: a.string(),
    description: a.string(),
    created_at: a.datetime()
  })
  .authorization([a.allow.public()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 7,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
