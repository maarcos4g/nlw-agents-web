import { createBrowserRouter } from "react-router-dom";

import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Auth } from "./pages/sign-in";
import { AuthLayout } from "./pages/layouts/auth";
import { SignUp } from "./pages/sign-up";
import { ConfirmOtp } from "./pages/confirm-otp";
import { AppLayout } from "./pages/layouts/app";
import { appLoader } from "./pages/layouts/loader";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    loader: appLoader,
    children: [
      {
        path: '/',
        element: <CreateRoom />
      },
      {
        path: '/room/:roomId',
        element: <Room />
      },
      {
        path: '/room/:roomId/audio',
        element: <RecordRoomAudio />
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