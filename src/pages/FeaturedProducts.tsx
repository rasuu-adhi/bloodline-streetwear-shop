
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const featuredProducts = products.filter(product => product.featured).slice(0, 6);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (product.sizes.length > 0 && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading featured products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our most popular pieces that define the YoungBlood aesthetic
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group bg-gray-900 border-gray-800 hover:border-primary/50 transition-all duration-300 overflow-hidden hover-scale"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0] || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md text-sm font-semibold">
                      Sale
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
