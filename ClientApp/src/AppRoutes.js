import { Counter } from "./components/Counter";
import { Home } from "./components/Home";

import CustomerTable from "./Crud App/Customers/CustomerTable";
import ProductTable from "./Crud App/Products/ProductTable";
import SaleTable from "./Crud App/Sales/SaleTable";
import StoreTable from "./Crud App/Stores/StoreTable";
/*import SaleTable from "./Crud App/Sales/SaleTable";
*/

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },

  {
    path: '/counter',
    element: <Counter />
  },

  {
    path: '/customer-table',
    element: <CustomerTable />
  },

  {
    path: '/product-table',
    element: <ProductTable />
  },

  {
    path: '/store-table',
    element: <StoreTable />
  },

  {
      path: '/sale-table',
      element: <SaleTable />
  }
];

export default AppRoutes;
