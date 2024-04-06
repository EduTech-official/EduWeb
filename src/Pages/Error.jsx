import { useRouteError } from "react-router-dom";

import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  // redirect to the home page after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect to the next page
      window.location.href = "/";
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="error-page" className="m-5 text-white">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
