import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { Toaster } from 'sonner';

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}