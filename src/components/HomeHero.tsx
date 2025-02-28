
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

const HomeHero = () => {
  return (
    <div className="relative w-full">
      {/* Hero background */}
      <div className="absolute inset-0 bg-gradient-to-r from-tagalong-purple-dark/80 to-tagalong-purple/60 z-10"></div>
      
      <div className="relative h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556122071-e404cb6f31c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="People ridesharing" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Hero content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Share Rides, Save Money, Make Connections
            </h1>
            <p className="text-xl text-white/90 mb-8">
              TagAlong connects you with people heading the same way. Share the journey, split the costs, and reduce your carbon footprint.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-tagalong-purple hover:bg-white/90 rounded-full tagalong-button"
              >
                <Link to="/find-ride">
                  Find a Ride <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 rounded-full tagalong-button"
              >
                <Link to="/offer-ride">
                  Offer a Ride <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center text-white">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>300+ cities covered</span>
              </div>
              <div className="flex items-center text-white">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Users className="w-5 h-5" />
                </div>
                <span>1M+ happy users</span>
              </div>
              <div className="flex items-center text-white">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <span>50K+ daily rides</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
