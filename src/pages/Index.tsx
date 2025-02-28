
import AppHeader from '@/components/AppHeader';
import HomeHero from '@/components/HomeHero';
import RideCard from '@/components/RideCard';
import ProfileCard from '@/components/ProfileCard';
import { mockRides, mockUsers } from '@/lib/mockData';
import { ArrowRight, Shield, MapPin, MessageCircle, Bike, Car, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const featuredRides = mockRides.slice(0, 3);
  const featuredUsers = mockUsers.slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      <AppHeader />
      
      <main className="pt-16">
        <HomeHero />
        
        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-b from-white to-tagalong-gray/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-tagalong-purple/10 text-tagalong-purple text-sm font-medium rounded-full mb-3">
                Easy & Simple
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How TagAlong Works</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Our platform makes ride-sharing simple, safe, and affordable for everyone in Hyderabad.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`glass-card rounded-2xl p-6 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '100ms' }}>
                <div className="w-12 h-12 rounded-full bg-tagalong-purple/10 flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-tagalong-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Find Your Match</h3>
                <p className="text-gray-600 mb-4">
                  Enter your destination and find riders heading the same way. Filter by bike or car, time, and preferences.
                </p>
                <Link to="/find-ride" className="inline-flex items-center text-tagalong-purple font-medium hover:underline">
                  Find a Ride <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className={`glass-card rounded-2xl p-6 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '200ms' }}>
                <div className="w-12 h-12 rounded-full bg-tagalong-purple/10 flex items-center justify-center mb-6">
                  <MessageCircle className="w-6 h-6 text-tagalong-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect & Coordinate</h3>
                <p className="text-gray-600 mb-4">
                  Use our in-app chat to coordinate pickup details. Safe, direct communication without sharing personal contacts.
                </p>
                <Link to="/chat" className="inline-flex items-center text-tagalong-purple font-medium hover:underline">
                  See How It Works <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className={`glass-card rounded-2xl p-6 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '300ms' }}>
                <div className="w-12 h-12 rounded-full bg-tagalong-purple/10 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-tagalong-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ride with Confidence</h3>
                <p className="text-gray-600 mb-4">
                  All users are verified and rated. Check profiles, view ride history, and travel with peace of mind.
                </p>
                <Link to="/profile" className="inline-flex items-center text-tagalong-purple font-medium hover:underline">
                  User Verification <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Available Rides Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <span className="inline-block px-3 py-1 bg-tagalong-purple/10 text-tagalong-purple text-sm font-medium rounded-full mb-3">
                  Available Today
                </span>
                <h2 className="text-3xl font-bold text-gray-900">Featured Rides</h2>
              </div>
              <Button 
                asChild
                variant="outline"
                className="border-tagalong-purple text-tagalong-purple hover:bg-tagalong-purple/5 rounded-full tagalong-button"
              >
                <Link to="/find-ride" className="flex items-center gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRides.map((ride) => (
                <div 
                  key={ride.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${featuredRides.indexOf(ride) * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <RideCard ride={ride} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Bike vs Car Section */}
        <section className="py-20 bg-tagalong-purple/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-tagalong-purple/10 text-tagalong-purple text-sm font-medium rounded-full mb-3">
                Choose Your Ride
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Bike or Car? Your Choice</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                TagAlong prioritizes bike rides for quick city travel, but also offers car options for longer distances or groups.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className={`glass-card rounded-2xl p-8 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-tagalong-purple/10 rounded-full">
                      <Bike className="w-8 h-8 text-tagalong-purple" />
                    </div>
                    <h3 className="text-2xl font-bold">Bike Rides</h3>
                  </div>
                  <Badge className="bg-tagalong-purple">Popular</Badge>
                </div>
                
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-tagalong-purple/10 rounded-full mt-0.5">
                      <svg className="w-4 h-4 text-tagalong-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Quick City Navigation</div>
                      <div className="text-sm text-gray-600">Beat traffic jams during rush hour</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-tagalong-purple/10 rounded-full mt-0.5">
                      <svg className="w-4 h-4 text-tagalong-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Budget-Friendly</div>
                      <div className="text-sm text-gray-600">Lower fares than cars or taxis</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-tagalong-purple/10 rounded-full mt-0.5">
                      <svg className="w-4 h-4 text-tagalong-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Eco-Friendly</div>
                      <div className="text-sm text-gray-600">Lower carbon footprint</div>
                    </div>
                  </li>
                </ul>
                
                <div className="text-gray-500 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" /> Average pickup time: 5-10 minutes
                  </div>
                  <div>Recommended for rides under 10km</div>
                </div>
              </div>
              
              <div className={`glass-card rounded-2xl p-8 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-tagalong-teal/10 rounded-full">
                      <Car className="w-8 h-8 text-tagalong-teal" />
                    </div>
                    <h3 className="text-2xl font-bold">Car Rides</h3>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-tagalong-teal/10 rounded-full mt-0.5">
                      <svg className="w-4 h-4 text-tagalong-teal" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Comfort for Longer Distances</div>
                      <div className="text-sm text-gray-600">Ideal for trips across the city</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-tagalong-teal/10 rounded-full mt-0.5">
                      <svg className="w-4 h-4 text-tagalong-teal" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Multiple Passengers</div>
                      <div className="text-sm text-gray-600">Share rides with groups of friends</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-tagalong-teal/10 rounded-full mt-0.5">
                      <svg className="w-4 h-4 text-tagalong-teal" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Climate Controlled</div>
                      <div className="text-sm text-gray-600">Comfortable in any weather</div>
                    </div>
                  </li>
                </ul>
                
                <div className="text-gray-500 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" /> Average pickup time: 10-15 minutes
                  </div>
                  <div>Ideal for longer distances or groups</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-tagalong-purple/10 text-tagalong-purple text-sm font-medium rounded-full mb-3">
                Our Community
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet Our Riders</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Join a growing community of Hyderabad commuters who are making travel better, together.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredUsers.map((user) => (
                <div 
                  key={user.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${featuredUsers.indexOf(user) * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <ProfileCard user={user} />
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button
                asChild
                className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full px-8 py-6 tagalong-button h-auto"
              >
                <Link to="/find-ride">
                  Start Your Journey Today
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4.5C16 5.88071 14.8807 7 13.5 7C12.1193 7 11 5.88071 11 4.5C11 3.11929 12.1193 2 13.5 2C14.8807 2 16 3.11929 16 4.5Z" fill="#9b87f5"/>
                  <path d="M9 6L9 19M9 19H7M9 19H12M14 16L17 22L22 15" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L3 9L6 12" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tagalong-purple to-tagalong-teal">
                  TagAlong
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing daily commutes in Hyderabad by connecting everyday commuters.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-tagalong-purple transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} TagAlong. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
