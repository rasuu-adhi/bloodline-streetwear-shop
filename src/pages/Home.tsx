
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
