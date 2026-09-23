import { Suspense, lazy } from "react";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";

import BasicComp from "./components/BasicComp";
import Error from "./Pages/Error";
import RedirectToResources from "./components/RedirectToResources";
import RedirectToLeaderboard from "./components/RedirectToLeaderboard";

// Route level code splitting. Each page is fetched only when it is visited, so
// heavy dependencies (three.js on /contact, chakra on /form) no longer ship
// with the landing page bundle.
const Home = lazy(() => import("./Pages/Home"));
const Events = lazy(() => import("./Pages/Events"));
const Team = lazy(() => import("./Pages/Team"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const Gallery2 = lazy(() => import("./Pages/Gallery2"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const Thanks = lazy(() => import("./Pages/Thanks"));
const PrePlacement = lazy(() => import("./Pages/PrePlacement"));
const FunFair = lazy(() => import("./Pages/FunFair"));
const MainForm = lazy(() => import("./components/Form/MainForm"));

const PageFallback = () => (
  <div
    className="flex min-h-[60vh] items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <span className="sr-only">Loading page</span>
    <span
      aria-hidden="true"
      className="h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white/90 motion-reduce:animate-none"
    />
  </div>
);

// The navbar and background video live in the layout, not in each page, so a
// route change no longer remounts them. This is what turns navigation into a
// client side transition instead of a full document reload.
const RootLayout = () => (
  <>
    <BasicComp />
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/events", element: <Events /> },
      { path: "/aboutus", element: <AboutUs /> },
      { path: "/team", element: <Team /> },
      { path: "/gallery2", element: <Gallery2 /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/Thanks", element: <Thanks /> },
      { path: "/form", element: <MainForm /> },
      { path: "/preplacement", element: <PrePlacement /> },
      { path: "/funfair", element: <FunFair /> },
      { path: "/resources", element: <RedirectToResources /> },
      { path: "/leaderboard", element: <RedirectToLeaderboard /> },
    ],
  },
]);

function App() {
  return (
    <div className="mx-4 minlg:mx-6 minsm:mx-1">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
