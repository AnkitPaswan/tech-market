import Categories from "../components/categories/Categories"
import FeaturedProduct from "../components/featuredProducts.tsx/FeaturedProduct"
import FeaturesSection from "../components/featuresSection/FeaturesSection"
import HeroSection from "../components/heroSection/HeroSection"
import PromotionBanner from "../components/promotionBanner/PromotionBanner"

const HomePage = () => {
  return (
    <>      
    <HeroSection />
    <FeaturesSection />
    <FeaturedProduct />
    <PromotionBanner />
    <Categories />
    </>
  )
}

export default HomePage
