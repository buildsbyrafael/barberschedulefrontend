import { createBrowserRouter } from "react-router";
import { LandingPage } from "../components/LandingPage";
import { BookingPage } from "../components/BookingPage";
import { LoginPage } from "../components/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/booking",
    Component: BookingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);