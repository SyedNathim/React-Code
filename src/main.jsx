import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'swiper/css';

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// fonts and icons
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import '././assets/css/style.min.css';


import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './home/Home.jsx';
import Blog from './blog/Blog.jsx';
import Login from './components/Login.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Shop from './shop/Shop.jsx';
import Signup from './components/Signup.jsx';

import './App.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "/", element: <Home/> },
      {
        path: "/blog",
        element:<PrivateRoute> <Blog/></PrivateRoute>
      },
      {
        path: "shop",
        element: <PrivateRoute> <Shop/></PrivateRoute> 
      },
    ],
  
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "sign-up",
    element: <Signup/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 
     <AuthProvider>
        <RouterProvider router={router} />
     </AuthProvider>
  
)
