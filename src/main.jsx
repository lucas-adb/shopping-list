import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ListPage from './pages/ListPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/mylist",
    element: <ListPage />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
