
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold border border-primary/30">
                New Collection
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Wear Your
              <span className="block text-primary text-glow">Vibe.</span>
              <span className="block">Own Your</span>
              <span className="block text-primary text-glow">Youth.</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Discover streetwear that speaks your language. Bold, fearless, and unapologetically you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                  Shop Collection
                </Button>
              </Link>
              <Link to="/products?featured=true">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                  View Featured
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Featured Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop"
                alt="Young person in streetwear"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-800"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-primary/20 rounded-full filter blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full filter blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
