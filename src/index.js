import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Img } from "./Img";
import { getSingleImgData } from './network';

import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/img",
    element: <Img></Img>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>);