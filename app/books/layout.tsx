import { getAuthors } from "../actions/getAuthors";
import getCategories from "../actions/getCategories";
import DetailPageBanner from "../components/DetailPageBanner";
import Sidebar from "./component/Sidebar";
import SidebarModal from "./component/SidebarModal";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const categories = await getCategories();
  const authors = await getAuthors();

  const authorsDecoded = authors.map((author) => {
    return { name: author.author };
  });

  return (
    <>
      <DetailPageBanner />
      <div className="flex gap-10 mx-auto max-w-screen-lg w-full">
        <SidebarModal categories={categories} authorsDecoded={authorsDecoded}/>
        <Sidebar categories={categories} authorsDecoded={authorsDecoded}/>
        {children}
      </div>
    </>
  );
}
