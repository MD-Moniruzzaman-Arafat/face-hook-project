import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import PrivateRoute from './private/PrivateRoute';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },

      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export default routes;
