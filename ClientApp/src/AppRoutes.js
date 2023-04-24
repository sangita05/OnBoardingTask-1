import { Counter } from "./components/Counter";

import CustomerTable from "./Crud App/Customers/CustomerTable";




const AppRoutes = [
  /*{
        index: true,
        element: <Home />
  },*/
  {
    path: '/counter',
    element: <Counter />
  },

  {
    path: '/customer-table',
    element: <CustomerTable />
    }
];

export default AppRoutes;
