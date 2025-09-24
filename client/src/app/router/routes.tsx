import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import Home from '../../pages/Home';
import Inventory from '../../features/Inventory/Inventory';
import AddItem from '../../features/Inventory/AddItem';
import UpdateItem from '../../features/Inventory/UpdateItem';
import PersonDetails from '../../features/Person/PersonDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'inventory/add', element: <AddItem /> },
      { path: 'inventory/:id', element: <UpdateItem /> },
      { path: 'person/:id', element: <PersonDetails /> },
      //   {
      //     path: '/trips',
      //     element: <TravelList></TravelList>,
      //   },
      //   { path: '/trips/:id', element: <EditTrip></EditTrip> },
      //   { path: '/trips/new', element: <CreateTrip></CreateTrip> },
      //   { path: '/travellers', element: <Travellers /> },
      //   { path: '/calendar', element: <Calendar /> },
      //   { path: '/reports', element: <Reports /> },
      //   { path: '/not-found', element: <NotFound /> },
      //   { path: '/server-error', element: <ServerError /> },

      //   {
      //     path: '*',
      //     element: <Navigate replace to="/not-found" />,
      //   },
    ],
  },
]);
