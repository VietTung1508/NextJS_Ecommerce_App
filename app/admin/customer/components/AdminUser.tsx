"use client";

import "./AdminUser.scss";
import { User } from "@prisma/client";
import Datatable from "../../components/Datatable/Datatable";
import { useState } from "react";

interface AdminUserProps {
  users: User[];
}

const AdminUser: React.FC<AdminUserProps> = ({ users }) => {
  const [update, setUpdate] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Username", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
  ];

  return (
    <div className="userPage">
      <div className="action">
        <div className="header">
          <h2 className="title">Users</h2>
          <h3 className="desc">
            Received from database we have <span>{users.length} </span>
            users
          </h3>
        </div>
      </div>
      <Datatable
        update={update}
        setUpdate={setUpdate}
        noAction
        columns={columns}
        rows={users}
      />
    </div>
  );
};

export default AdminUser;
