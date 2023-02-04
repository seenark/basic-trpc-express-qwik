import { publicProcedure, router } from ".";
import { z } from "zod";

type TChatMessage = {
  user: string;
  message: string;
};

const messages: TChatMessage[] = [
  { user: "user1", message: "Hello" },
  { user: "user2", message: "Hi" },
];

export const appRouter = router({
  hello: publicProcedure.query(() => {
    console.log("hello paht called");
    return "hello world 2";
  }),
  chat: publicProcedure
    .input(
      z.object({
        from: z.number(),
        to: z.number(),
      })
    )
    .query(({ input }) => messages.slice(input.from, input.to - input.from)),
  addMessage: publicProcedure
    .input(
      z.object({
        user: z.string(),
        message: z.string(),
      })
    )
    .mutation(({ input }) => {
      messages.push({
        user: input.user,
        message: input.message,
      });
      return input;
    }),
});

export type TAppRouter = typeof appRouter;
