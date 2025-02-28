
import { ArrowRight, Bike, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-white to-tagalong-gray overflow-hidden min-h-[90vh] flex items-center">
      <div 
        className={`absolute inset-0 bg-hero-pattern opacity-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : ''}`}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 opacity-0 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-20'}`}>
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-tagalong-purple/10 text-tagalong-purple text-sm font-medium rounded-full">
                Hyderabad's Commute Solution
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Share rides, 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tagalong-purple to-tagalong-teal"> save costs </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                Connect with everyday commuters going your way. Split costs, reduce traffic, and make your daily journey better.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full px-6 py-6 tagalong-button h-auto"
              >
                <Link to="/find-ride" className="flex items-center gap-2">
                  <Bike className="w-5 h-5" />
                  <span>Find a Ride</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-tagalong-purple text-tagalong-purple hover:bg-tagalong-purple/5 rounded-full px-6 py-6 tagalong-button h-auto"
              >
                <Link to="/offer-ride" className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  <span>Offer a Ride</span>
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-tagalong-purple/20">
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-tagalong-purple/20">
                  <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-tagalong-purple/20">
                  <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-tagalong-purple text-white flex items-center justify-center text-xs font-medium">
                  1k+
                </div>
              </div>
              <div className="text-gray-600">
                <span className="text-tagalong-purple font-semibold">1,000+</span> happy riders in Hyderabad
              </div>
            </div>
          </div>
          
          <div className={`relative opacity-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-20'}`}>
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-lg aspect-square">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-tagalong-purple/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-tagalong-teal/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-tagalong-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="glass-card rounded-3xl shadow-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                      alt="People sharing rides with map view" 
                      className="w-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute -right-5 -bottom-5 glass-card p-4 rounded-2xl shadow-lg animate-float">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-tagalong-purple/10 rounded-full">
                        <Bike className="w-6 h-6 text-tagalong-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Bike rides</div>
                        <div className="text-xs text-gray-500">Quick & affordable</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -left-5 top-10 glass-card p-4 rounded-2xl shadow-lg animate-float animation-delay-2000">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <span className="inline-block w-8 h-8 rounded-full bg-tagalong-purple/20 border-2 border-white">
                          <span className="flex items-center justify-center h-full text-xs text-tagalong-purple">4.9</span>
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Safe rides</div>
                        <div className="text-xs text-gray-500">Verified users</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
