import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: any;
  onAddToCart: (product: any, e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <motion.div
    className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300 hover-scale"
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    role="article"
    aria-label={product.name}
  >
    <Link to={`/product/${product.id}`} tabIndex={0} aria-label={`View details for ${product.name}`}>
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          width={400}
          height={256}
        />
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
            Sale
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
    <div className="p-6">
      <Link to={`/product/${product.id}`} tabIndex={0} aria-label={`View details for ${product.name}`}>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
      </Link>
      <div className="flex items-center mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
              aria-hidden="true"
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
        onClick={(e) => onAddToCart(product, e)}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold"
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingBag className="h-4 w-4 mr-2" aria-hidden="true" />
        Add to Cart
      </Button>
    </div>
  </motion.div>
);

export default ProductCard;
