import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      let transformedProducts: Product[] = [];
      if (data && data.length > 0) {
        transformedProducts = (data || []).map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          price: Number(item.price),
          originalPrice: item.original_price ? Number(item.original_price) : undefined,
          category: item.category as 'men' | 'women' | 'accessories',
          sizes: item.sizes || [],
          colors: item.colors || [],
          images: item.images || [],
          stock: item.stock || 0,
          featured: item.featured || false,
          rating: Number(item.rating) || 0,
          reviews: item.reviews || 0
        }));
      }
      setProducts(transformedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProducts([]); // No fallback
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};
