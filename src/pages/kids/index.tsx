import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
import Instagram from "@components/common/instagram";
import BannerSliderBlock from "@containers/banner-slider-block";
import ExclusiveBlock from "@containers/exclusive-block";
import Subscription from "@components/common/subscription";
import { homeThreeBanner as banner, kidsPromotionBanner, menPromotionBanner } from "@framework/static/banner";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";
import WhatsToday from "@containers/whatsToday";
import TrendingProductFeedWithTabs from "@components/product/feeds/trending-product-feed-with-tabs";
import FeatureBlock from "@containers/feature-block";
import SubscriptionWithBg from "@components/common/subscription-with-bg";
import TestimonialCarousel from "@containers/testimonial-carousel";
import RequestCallback from "@components/common/request-callback";
// import Testimonials from "@components/common/testimonials";

export default function Home() {
  return (
    <>
      <BannerSliderBlock bannerData={kidsPromotionBanner} />
      {/* <WhatsToday /> */}
      <Divider />
      {/* <FeatureBlock />
      <BannerBlock data={masonryBanner} showTitleOnHover={true} /> */}
      {/* <Container>
        <ProductsFlashSaleBlock date={"2025-12-01T01:02:03"} />
      </Container> */}
      <Container>
        {/* <CategoryBlock
          sectionHeading="text-shop-by-category"
          type="rounded"
        />
        <ProductsFeatured
          sectionHeading="text-featured-products"
          limit={5}
        /> */}
        {/* <FeaturedCategories
          sectionHeading="text-featured-categories"
          limit={5}
        /> */}
        <TrendingProductFeedWithTabs categorySlug="clothing/kids" />
        {/* <Testimonials /> */}

        {/* <BannerCard
          key={`banner--key${banner[0].id}`}
          banner={banner[0]}
          href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        /> */}
        {/* <BannerCard
          key={`banner--key${banner[1].id}`}
          banner={banner[1]}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        /> */}
        {/* <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
        /> */}
        {/* <ExclusiveBlock /> */}
        {/* <NewArrivalsProductFeed /> */}
        {/* <Instagram /> */}
        <Subscription className="px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16" />
        {/* <TestimonialCarousel sectionHeading="text-testimonial" /> */}
        {/* <SubscriptionWithBg /> */}
        <RequestCallback />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "forms", "menu", "footer"])),
    },
  };
};
