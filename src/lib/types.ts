
export type VehicleType = 'bike' | 'car';

export type User = {
  id: string;
  name: string;
  profileImage?: string;
  rating: number;
  isVerified: boolean;
  ridesCompleted: number;
  dateJoined: string;
};

export type Location = {
  label: string;
  lat: number;
  lng: number;
};

export type Ride = {
  id: string;
  driver: User;
  origin: Location;
  destination: Location;
  departureTime: string;
  vehicleType: VehicleType;
  availableSeats: number;
  fare: number;
  distance: number; // in km
  duration: number; // in minutes
  allowsGender?: 'any' | 'male' | 'female';
  requiresHelmet?: boolean;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
};

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
};

export type Chat = {
  id: string;
  participants: User[];
  rideId: string;
  messages: ChatMessage[];
  lastUpdated: string;
};
