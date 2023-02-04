import { component$, useSignal, useStore, useTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import { Link } from "@builder.io/qwik-city";
import { client } from "~/trpc";

type TChatMessage = {
  user: string;
  message: string;
};

export default component$(() => {
  const text = useSignal("");
  const chatMsg = useStore<{ msgs: TChatMessage[] }>({
    msgs: [],
  });
  const newMsg = useStore<{ user: string; msg: string }>({ user: "", msg: "" });

  useTask$(async () => {
    const hello = await client.hello.query();
    console.log("hello from trpc", hello);
    text.value = hello;

    const msgs = await client.chat.query({ from: 0, to: 10 });
    chatMsg.msgs = msgs;
  });

  const addMsg = $(async () => {
    const res = await client.addMessage.mutate({
      user: newMsg.user,
      message: newMsg.msg,
    });
    console.log("add msg res", res);
  });

  return (
    <div>
      text: {text.value}
      <div>{JSON.stringify(chatMsg.msgs)}</div>
      <hr />
      <div>
        <label>
          user:{" "}
          <input
            value={newMsg.user}
            onChange$={(e) => (newMsg.user = e.target.value)}
          />
        </label>
        <label>
          message:{" "}
          <input
            value={newMsg.msg}
            onChange$={(e) => (newMsg.msg = e.target.value)}
          />
        </label>
        <button onClick$={addMsg}>add</button>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
