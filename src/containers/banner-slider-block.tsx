import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { promotionBanner } from "@framework/static/banner";
import { ROUTES } from "@utils/routes";

interface BannerProps {
  className?: string;
  bannerData: any;
}

const breakpoints = {
  "0": {
    slidesPerView: 1,
  },
  "768": {
    slidesPerView: 1.5,
  },
};

const BannerSliderBlock: React.FC<BannerProps> = ({ className = "mb-0", bannerData }) => {
  return (
    <div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
      <Carousel
        breakpoints={breakpoints}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        navigation={true}
        pagination={false}
        prevActivateId="prevSlide"
        nextActivateId="nextSlide"
        buttonGroupClassName="flex items-center w-full z-10"
        prevButtonClasses="ltr:left-10 rtl:right-0 w-5 h-5 bg-white/80 shadow-md"
        nextButtonClasses="ltr:right-10 rtl:left-0 w-5 h-5 bg-white/80 shadow-md"
        type="circle"
      >
        {(bannerData || promotionBanner).map((banner: any) => (
          <SwiperSlide
            key={`banner--key${banner.id}`}
            className="px-1.5"
          >
            <BannerCard
              banner={banner}
              effectActive={true}
              href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSliderBlock;
