import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import "./globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// ChakraProvider injects a global CSS reset at runtime that sets
// `body { background: white }` and stamps `chakra-ui-light` on the body. Because
// it is injected after every stylesheet, it silently beat the dark background in
// App.css and index.css, so any page taller than the viewport showed white below
// the fold. Pinning Chakra's own global styles to the site palette fixes it at
// the source instead of fighting it with !important.
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      // The colour lives on html, and body stays transparent on purpose. The
      // site backdrop sits at z-index -1, and per CSS paint order a block
      // descendant's background (body) paints ON TOP of negative z-index
      // layers. An opaque body therefore hid the backdrop completely.
      html: {
        bg: "#05070d",
        color: "#f5f5f4",
      },
      body: {
        bg: "transparent",
        color: "#f5f5f4",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
