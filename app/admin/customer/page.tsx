import AdminUser from "./components/AdminUser";
import { getUsers } from "@/app/actions/getUsers";

const User = async () => {
  const users = await getUsers();
  console.log(users);
  return (
    <div>
      <AdminUser users={users} />
    </div>
  );
};

export default User;
