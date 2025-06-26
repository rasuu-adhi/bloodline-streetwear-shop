
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Urban Shadow Hoodie',
    description: 'Premium heavyweight hoodie with minimalist design. Perfect for street culture enthusiasts.',
    price: 89.99,
    originalPrice: 119.99,
    category: 'men',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal', 'Navy'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600'
    ],
    stock: 45,
    featured: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: '2',
    name: 'Rebel Graphic Tee',
    description: 'Bold statement tee with exclusive YoungBlood artwork. Express your rebellious side.',
    price: 34.99,
    category: 'men',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Red'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      'https://images.unsplash.com/photo-1583743814966-8936f37f86e2?w=600'
    ],
    stock: 78,
    featured: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Street Queen Crop Top',
    description: 'Edgy crop top for the modern streetwear queen. Comfortable fit with attitude.',
    price: 42.99,
    originalPrice: 54.99,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Red', 'White'],
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600',
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600'
    ],
    stock: 32,
    featured: false,
    rating: 4.9,
    reviews: 156
  },
  {
    id: '4',
    name: 'Attitude Snapback',
    description: 'Classic snapback with embroidered YoungBlood logo. Perfect finishing touch.',
    price: 24.99,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Red', 'Navy'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=600'
    ],
    stock: 67,
    featured: true,
    rating: 4.7,
    reviews: 203
  },
  {
    id: '5',
    name: 'Night Rider Jacket',
    description: 'Premium bomber jacket with street-inspired design. Your armor for the urban jungle.',
    price: 149.99,
    originalPrice: 199.99,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Olive'],
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600',
      'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=600'
    ],
    stock: 23,
    featured: true,
    rating: 4.9,
    reviews: 78
  },
  {
    id: '6',
    name: 'Fierce Biker Shorts',
    description: 'High-waisted biker shorts for the fearless. Comfort meets street style.',
    price: 28.99,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    images: [
      'https://images.unsplash.com/photo-1506629905583-b0bc2a18368e?w=600',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600'
    ],
    stock: 91,
    featured: false,
    rating: 4.5,
    reviews: 145
  }
];
