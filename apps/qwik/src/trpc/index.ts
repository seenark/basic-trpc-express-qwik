import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { TAppRouter } from "trpc-router";

export const client = createTRPCProxyClient<TAppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});
