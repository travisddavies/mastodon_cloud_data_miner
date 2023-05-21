import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import S1 from './pages/S1';
import S2 from './pages/S2';
import S3 from './pages/S3';
import Quiz from './pages/Quiz';
import DashboardAppPage from './pages/DashboardAppPage';
import SimpleLayout from './layouts/simple';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 's1', element: <S1 /> },
        { path: 's2', element: <S2 /> },
        { path: 's3', element: <S3 /> },
        { path: 'quiz', element: <Quiz /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
