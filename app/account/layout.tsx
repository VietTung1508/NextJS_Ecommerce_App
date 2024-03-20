import DetailPageBanner from "../components/DetailPageBanner";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DetailPageBanner />
      <div>{children}</div>
    </>
  );
}
