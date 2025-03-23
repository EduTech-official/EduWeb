import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";

import "./App.css";
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Team from "./Pages/Team";
import AboutUs from "./Pages/AboutUs";
import Gallery2 from "./Pages/Gallery2";
import ContactPage from "./Pages/ContactPage";
import Thanks from "./Pages/Thanks";
import PrePlacement from "./Pages/PrePlacement";

import Error from "./Pages/Error";
import RedirectToResources from "./components/RedirectToResources";
// import RedirectToLeaderboard from "./components/RedirectToLeaderboard";


import TeamCards from "./components/TeamCards";
import BasicComp from "./components/BasicComp";
import MainForm from './components/Form/MainForm';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Home />,
      element: <AboutUs />,
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
    {
      path: "/form",
      element: <MainForm />,
    },
    {
      path: "/preplacement",
      element: <PrePlacement />,
    },
    {
    path: "/resources",
    element: <RedirectToResources />,
  },
  //   {
  //   path: "/leaderboard",
  //   element: <RedirectToLeaderboard />,
  // },
  ]);
  // const [count, setCount] = useState(0);

  return (
    <div className="minlg:mx-6 mx-4 minsm:mx-1 overflow-hidden">
      <BasicComp />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
