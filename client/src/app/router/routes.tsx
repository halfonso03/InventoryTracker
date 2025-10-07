import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import Inventory from '../../features/Inventory/Inventory';
import AddItem from '../../features/Inventory/AddItem';
import UpdateItem from '../../features/Inventory/UpdateItem';
import PersonDetails from '../../features/Person/PersonDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Inventory /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'inventory/new', element: <AddItem /> },
      { path: 'inventory/:id', element: <UpdateItem /> },
      { path: 'person/:id', element: <PersonDetails /> },
      //   {
      //     path: '/trips',
      //     element: <TravelList></TravelList>,
      //   { path: '/trips/new', element: <CreateTrip></CreateTrip> },
      //   { path: '/server-error', element: <ServerError /> },

      //   {
      //     path: '*',
      //     element: <Navigate replace to="/not-found" />,
      //   },
    ],
  },
]);
