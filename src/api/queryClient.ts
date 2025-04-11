import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      experimental_prefetchInRender: true,
    },
  },
});

export default queryClient;
