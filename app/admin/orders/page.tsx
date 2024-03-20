import { getOrders } from "@/app/actions/getOrders";
import AdminOrder from "./components/AdminOrder";

const Orders = async () => {
  const orders = await getOrders();
  return (
    <div>
      <AdminOrder orders={orders} />
    </div>
  );
};

export default Orders;
