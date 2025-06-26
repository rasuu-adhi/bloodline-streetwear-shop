
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    {
      name: 'Men',
      href: '/products?category=men',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop',
      description: 'Bold streetwear for the modern man'
    },
    {
      name: 'Women',
      href: '/products?category=women',
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=400&fit=crop',
      description: 'Fierce fashion for fearless women'
    },
    {
      name: 'Accessories',
      href: '/products?category=accessories',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=400&fit=crop',
      description: 'Complete your streetwear look'
    }
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find your style across our curated collections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover-scale"
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {category.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
