"use client";

import "./dashboard.scss";
import Widget from "../Widget/Widget";
import { Order, User } from "@prisma/client";
import Featured from "../Featured/Featured";
import Chart from "../Chart/Chart";

interface DashboardProps {
  orders?: Order[];
  products: Number;
  users: User[];
}

const Dashboard: React.FC<DashboardProps> = ({ orders, products, users }) => {
  return (
    <div className="admin-dashboard">
      <div className="widgets">
        <Widget type="user" users={users} />
        <Widget type="product" products={products} />
        <Widget type="order" orders={orders && orders} />
        <Widget type="profit" orders={orders && orders} />
      </div>
      <div className="charts">
        <Featured />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
