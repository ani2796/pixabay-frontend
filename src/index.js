import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/HomePage';
import './css/index.css';
import ImgPage from "./pages/ImgPage";
import { getSingleImgData } from './network/imgData';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/img/:imgId",
    element: <ImgPage></ImgPage>,
    loader: getSingleImgData,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>);