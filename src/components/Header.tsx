
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Men', href: '/products?category=men' },
    { name: 'Women', href: '/products?category=women' },
    { name: 'Accessories', href: '/products?category=accessories' },
  ];

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold text-white text-glow">
            Young<span className="text-primary">Blood</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-300 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm">{user.email}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white text-left"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary hover:bg-primary-dark text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-gray-800 pt-3 mt-3">
                  <div className="px-3 py-2 text-sm text-gray-400">
                    Signed in as {user.email}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-800 pt-3 mt-3 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
