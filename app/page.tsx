import { getBanners } from "./actions/getBanners";
import getCurrentUser from "./actions/getCurrentUser";
import { getProductsByCategory } from "./actions/getProductsByCategory";
import BookSlideList from "./components/Book/BookSlideList";
import HeroSlide from "./components/Home/HeroSlide";

export default async function Home() {
  const mangas = await getProductsByCategory("Manga");
  const fictions = await getProductsByCategory("Fiction");
  const newArrivals = await getProductsByCategory("New Arrival");
  const banners = await getBanners(true);
  return (
    <div>
      <HeroSlide banners={banners} />
      <BookSlideList
        link="New Arrival"
        title="NEW ARRIVALS"
        books={newArrivals}
      />
      <div className="group overflow-hidden">
        <img
          className="mx-auto max-w-screen-lg object-cover cursor-pointer hover:scale-110 transition translate"
          src="/images/advertise.jpg"
        />
      </div>
      <BookSlideList
        link="New Arrival"
        title="TIKTOK MADE ME BUY IT"
        oneLine
        books={fictions}
      />
      <BookSlideList link="Manga" title="MANGA" oneLine books={mangas} />
    </div>
  );
}
