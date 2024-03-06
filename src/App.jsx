import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";

import "./App.css";
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Team from "./Pages/Team";
import AboutUs from "./Pages/AboutUs";
import Gallery from "./Pages/Gallery";
import Gallery2 from "./Pages/Gallery2";
import ContactPage from "./Pages/ContactPage";
import Thanks from "./Pages/Thanks";

import Error from "./Pages/Error";

import TeamCards from "./components/TeamCards";
import BasicComp from "./components/BasicComp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/events",
      element: <Events />,
    },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path: "/team",
      element: <Team />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
      path: "/gallery2",
      element: <Gallery2 />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/Thanks",
      element: <Thanks />,
    },
  ]);
  // const [count, setCount] = useState(0);

  return (
    <div className="minlg:mx-6 mx-4 minsm:mx-1 overflow-x-hidden">
      <BasicComp />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
