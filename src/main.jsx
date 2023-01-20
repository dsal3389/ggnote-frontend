import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ListNotes from "./routes/list";
import Note, { loader as NoteLoader } from "./routes/note";
import App from "./App";
import "./index.css";
import CreateNote from "./routes/create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ListNotes />,
      },
      {
        path: "/new",
        element: <CreateNote />,
      },
      {
        path: "/:noteId",
        element: <Note />,
        loader: NoteLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
