
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

const HomeHero = () => {
  return (
    <div className="relative w-full">
      {/* Hero background */}
      <div className="absolute inset-0 bg-gradient-to-r from-tagalong-purple-dark/80 to-tagalong-purple/60 z-10"></div>
      
      <div className="relative h-[600px] overflow-hidden">
        <img 
          src="/lovable-uploads/3d403af9-3f7a-4133-8074-62b14798b7c8.png" 
          alt="Person using ride-sharing app with taxi in background" 
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
                size="lg"
                className="bg-white text-tagalong-purple hover:bg-white/90 rounded-full tagalong-button"
              >
                <Link to="/offer-ride">
                  Offer a Ride <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-1 gap-6">
              <div className="flex items-center text-white">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Users className="w-5 h-5" />
                </div>
                <span>Only for Hyderabad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
