import React from "react";
import ReactDOM from "react-dom/client";



import App from "./App.jsx";
import "./index.css";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
