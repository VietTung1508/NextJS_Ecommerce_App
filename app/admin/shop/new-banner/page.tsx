import { getProductsByCategory } from "@/app/actions/getProductsByCategory";
import BannerForm from "./component/BannerForm";

const NewBanner = async () => {
  const newArrivalLists = await getProductsByCategory("New Arrival");

  return (
    <div className="px-3">
      <h2 className="text-center mb-5 text-2xl font-semibold">New Banner</h2>
      <div className="w-full h-full flex justify-center items-center">
        <BannerForm books={newArrivalLists} />
      </div>
    </div>
  );
};

export default NewBanner;
