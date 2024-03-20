"use client";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "../Button";
import clsx from "clsx";
import NewSletter from "./NewSletter";
import { Banner } from "@prisma/client";
import { url } from "inspector";
import Link from "next/link";

interface HeroSlideItemProps {
  banner: Banner;
  active?: boolean;
}

interface HeroSlideProps {
  banners: Banner[];
}

const HeroSlide: React.FC<HeroSlideProps> = ({ banners }) => {
  SwiperCore.use([Autoplay]);
  return (
    <div className="relative mb-32">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem banner={banner} active={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <NewSletter />
    </div>
  );
};

const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ banner, active }) => {
  const { title, backgroundImage, descritions, poster } = banner;

  const bg = backgroundImage;

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={` w-full bg-center bg-cover object-cover relative py-36 before:content-[' '] before:absolute before:top-0 before:left-0 before:h-full  before:w-full before:bg-black before:opacity-30 text-white`}
    >
      <div
        className={clsx(
          `w-full flex items-center max-w-screen-xl mx-auto flex-row-reverse `
        )}
      >
        <div className="flex flex-col items-start gap-8 w-full lg:w-1/2 lg:pl-12 z-40">
          <h2 className={clsx(`text-6xl font-bold`, active && "animate-drop")}>
            {title}
          </h2>
          <h3
            className={clsx(
              `text-lg font-semibold leading-7 `,
              active && "animate-drop"
            )}
          >
            {descritions}
          </h3>
          <Link href={`/${banner.productId}`}>
            <Button danger type="button" animate={active ? true : false}>
              Buy Now !
            </Button>
          </Link>
        </div>
        <div className="w-1/2 justify-center hidden lg:flex z-40 ">
          <img
            src={poster}
            className={clsx(
              `w-1/2 rounded-lg object-cover`,
              active && " animate-show "
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
