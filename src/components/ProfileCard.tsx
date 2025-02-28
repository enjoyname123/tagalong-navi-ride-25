
import { Shield, Bike, Car, Award, Calendar } from 'lucide-react';
import { User } from '@/lib/types';

type ProfileCardProps = {
  user: User;
  isDetailed?: boolean;
};

const ProfileCard = ({ user, isDetailed = false }: ProfileCardProps) => {
  const { name, profileImage, rating, isVerified, ridesCompleted, dateJoined } = user;
  
  const joinDate = new Date(dateJoined);
  const formattedJoinDate = joinDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="glass-card rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-lg p-6">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-tagalong-purple/10 border-2 border-white shadow-md">
            {profileImage ? (
              <img src={profileImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-light text-tagalong-purple">
                {name.charAt(0)}
              </div>
            )}
          </div>
          {isVerified && (
            <div className="absolute -right-1 bottom-0 bg-tagalong-purple text-white p-1 rounded-full">
              <Shield className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className="flex items-center justify-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-gray-600 text-sm">{rating}</span>
          </div>
          
          {isVerified && (
            <div className="inline-flex items-center mt-2 px-2 py-1 bg-tagalong-purple/10 text-tagalong-purple text-xs font-medium rounded-full">
              <Shield className="w-3 h-3 mr-1" /> Verified User
            </div>
          )}
        </div>
        
        {isDetailed && (
          <div className="w-full grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white/50 rounded-xl p-3 text-center">
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-tagalong-purple/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-tagalong-purple" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">Rides Completed</div>
                <div className="font-semibold">{ridesCompleted}</div>
              </div>
            </div>
            
            <div className="bg-white/50 rounded-xl p-3 text-center">
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-tagalong-purple/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-tagalong-purple" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">Member Since</div>
                <div className="font-semibold">{formattedJoinDate}</div>
              </div>
            </div>
            
            <div className="bg-white/50 rounded-xl p-3 text-center">
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-tagalong-purple/10 flex items-center justify-center">
                  <Bike className="w-4 h-4 text-tagalong-purple" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">Bike Rides</div>
                <div className="font-semibold">{Math.floor(ridesCompleted * 0.7)}</div>
              </div>
            </div>
            
            <div className="bg-white/50 rounded-xl p-3 text-center">
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-tagalong-purple/10 flex items-center justify-center">
                  <Car className="w-4 h-4 text-tagalong-purple" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">Car Rides</div>
                <div className="font-semibold">{Math.floor(ridesCompleted * 0.3)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
