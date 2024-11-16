import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './components/common/layout/RootLayout';

import ChatRoom from './pages/ChatRoom';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>홈</div>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/chat',
        element: <ChatRoom />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
