import { createBrowserRouter } from 'react-router-dom';
import { GardenEdit, Main } from '@/pages';
import Layout from './Layout';
import { PATH } from './constants';
import MyGardenEdit from '@/pages/Create/MyGardenEdit';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: PATH.MAIN,
        element: <Main />,
      },
      {
        path: PATH.ERROR,
        element: <div>에러</div>,
      },
      {
        path: PATH.MAP.CREATE_GARDEN,
        element: <GardenEdit />,
      },
      {
        path: PATH.MAP.CREATE_MY_GARDEN,
        element: <MyGardenEdit />,
      },
    ],
  },
]);

export default router;
