import Dashboard from "./components/Dashboard/Dashboard";
import { getOrders } from "@/app/actions/getOrders";
import { getUsers } from "@/app/actions/getUsers";
import { getProductsNumber } from "../actions/getProductsNumber";

const AdminDashboard = async () => {
  const orders = await getOrders();
  const products = await getProductsNumber();
  const users = await getUsers();
  return (
    <div>
      <Dashboard orders={orders} products={products} users={users} />
    </div>
  );
};

export default AdminDashboard;
