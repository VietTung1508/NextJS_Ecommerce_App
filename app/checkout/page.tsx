import getCurrentUser from "../actions/getCurrentUser";

import CheckOut from "./components/CheckOut";

const Page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div >
      <CheckOut currentUser={currentUser!} />
    </div>
  );
};

export default Page;
