import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import HomePage from '../pages/HomePage/HomePage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

export default routes;
