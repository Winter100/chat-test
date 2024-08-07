import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import RootLayout from './components/common/layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
