import Link from "next/link";

interface SidebarBoxProps {
  title: string;
  items: { name: string }[];
}

const SidebarBox: React.FC<SidebarBoxProps> = ({ title, items }) => {
  return (
    <div className="flex flex-col gap-4 mb-4 ">
      <div className="w-full border-b-2 border-gray-100 ">
        <Link href={"/books"}>
          <div className="inline-flex justify-center items-center font-semibold cursor-pointer text-white px-3 bg-auth-btn">
            {title}
          </div>
        </Link>
      </div>
      <div className="border-2 border-auth-btn flex flex-col gap-3 py-4 px-3 overflow-y-auto max-h-80">
        {items.map((item, i) => (
          <a key={i} className="cursor-pointer " href={`/books/${item.name}`}>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SidebarBox;
