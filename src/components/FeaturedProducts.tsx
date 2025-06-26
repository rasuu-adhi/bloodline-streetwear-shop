import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import React, { Suspense } from 'react';

const ProductCard = React.lazy(() => import('./ProductCard'));

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (product.sizes.length > 0 && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Cannot add to cart",
        description: "Please check product options.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-black" role="region" aria-label="Featured Products Loading">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center text-white">Loading featured products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-black" role="region" aria-label="Featured Products">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-2 md:mb-4">
            Featured Products
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            Handpicked essentials that define modern streetwear
          </p>
        </div>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </Suspense>
        <div className="text-center mt-8 md:mt-12">
          <Link to="/products">
            <button
              type="button"
              className="border border-white text-white hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="View All Products"
            >
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
