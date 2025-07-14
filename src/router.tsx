import { createBrowserRouter } from "react-router-dom";

import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { Auth } from "./pages/sign-in";
import { AuthLayout } from "./pages/layouts/auth";
import { SignUp } from "./pages/sign-up";
import { ConfirmOtp } from "./pages/confirm-otp";
import { AppLayout } from "./pages/layouts/app";
import { appLoader } from "./pages/layouts/loader";
import { ErrorPage } from "./pages/404";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <CreateRoom />
      },
      {
        path: '/room/:roomCode',
        element: <Room />
      },
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/create-account',
        element: <SignUp />
      },
      {
        path: '/confirm',
        element: <ConfirmOtp />
      },
    ]
  }
])