
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Package, Users, ShoppingCart, Plus, Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'users' | 'orders'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: 'men' as 'men' | 'women' | 'accessories',
    stock: '',
    featured: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Fetch profiles (users)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles(role)
        `)
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      setProducts(productsData?.map(item => ({
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
      })) || []);
      
      setUsers(profilesData || []);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          original_price: newProduct.original_price ? parseFloat(newProduct.original_price) : null,
          category: newProduct.category,
          stock: parseInt(newProduct.stock),
          featured: newProduct.featured,
          sizes: [],
          colors: [],
          images: []
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product created successfully"
      });

      setNewProduct({
        name: '',
        description: '',
        price: '',
        original_price: '',
        category: 'men',
        stock: '',
        featured: false
      });

      fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User role updated successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back, {user?.email}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { key: 'dashboard', label: 'Overview', icon: Package },
            { key: 'products', label: 'Products', icon: Package },
            { key: 'users', label: 'Users', icon: Users },
            { key: 'orders', label: 'Orders', icon: ShoppingCart }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === key
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{products.length}</p>
                  <p className="text-gray-400">Total Products</p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                  <p className="text-gray-400">Total Users</p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{orders.length}</p>
                  <p className="text-gray-400">Total Orders</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Product
              </h2>
              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-white">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="original_price" className="text-white">Original Price (Optional)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    value={newProduct.original_price}
                    onChange={(e) => setNewProduct({...newProduct, original_price: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value: 'men' | 'women' | 'accessories') => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock" className="text-white">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  <Label htmlFor="featured" className="text-white">Featured Product</Label>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="bg-primary hover:bg-primary-dark text-white">
                    Create Product
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Products List</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Category</th>
                      <th className="text-left py-2">Price</th>
                      <th className="text-left py-2">Stock</th>
                      <th className="text-left py-2">Featured</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-800">
                        <td className="py-2">{product.name}</td>
                        <td className="py-2 capitalize">{product.category}</td>
                        <td className="py-2">${product.price}</td>
                        <td className="py-2">{product.stock}</td>
                        <td className="py-2">{product.featured ? 'Yes' : 'No'}</td>
                        <td className="py-2">
                          <Button
                            onClick={() => handleDeleteProduct(product.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <Card className="bg-gray-900 border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Users Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Role</th>
                    <th className="text-left py-2">Created</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-800">
                      <td className="py-2">{user.full_name || 'N/A'}</td>
                      <td className="py-2 capitalize">{user.user_roles?.[0]?.role || 'user'}</td>
                      <td className="py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="py-2">
                        <Select
                          value={user.user_roles?.[0]?.role || 'user'}
                          onValueChange={(value: 'admin' | 'user') => handleUpdateUserRole(user.id, value)}
                        >
                          <SelectTrigger className="w-24 bg-gray-800 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <Card className="bg-gray-900 border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Orders Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Customer</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-800">
                      <td className="py-2 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                      <td className="py-2">{order.profiles?.full_name || 'N/A'}</td>
                      <td className="py-2">${order.total}</td>
                      <td className="py-2 capitalize">{order.status}</td>
                      <td className="py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
