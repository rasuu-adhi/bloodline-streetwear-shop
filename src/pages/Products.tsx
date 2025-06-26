
import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Filter, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const categoryFilter = searchParams.get('category') || '';
  const priceSort = searchParams.get('sort') || '';

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Sort by price
    if (priceSort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (priceSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, categoryFilter, priceSort]);

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

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500 text-xl">Error loading products: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            All Products
          </h1>
          <p className="text-gray-400">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <Button
                  variant="ghost"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="text-white"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {['', 'men', 'women', 'accessories'].map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={categoryFilter === category}
                          onChange={() => updateFilter('category', category)}
                          className="accent-primary"
                        />
                        <span className="ml-2 text-gray-300 capitalize">
                          {category || 'All'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Sort By</h4>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'Default' },
                      { value: 'price-asc', label: 'Price: Low to High' },
                      { value: 'price-desc', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Rating' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="sort"
                          checked={priceSort === option.value}
                          onChange={() => updateFilter('sort', option.value)}
                          className="accent-primary"
                        />
                        <span className="ml-2 text-gray-300">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group bg-gray-900 border-gray-800 hover:border-primary/50 transition-all duration-300 overflow-hidden hover-scale"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
                          Sale
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mb-3">
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
                        <span className="text-xl font-bold text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
