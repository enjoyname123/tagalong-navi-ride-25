
import { Chat, Ride, User } from './types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Arjun Reddy',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.8,
    isVerified: true,
    ridesCompleted: 67,
    dateJoined: '2023-02-15'
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 4.9,
    isVerified: true,
    ridesCompleted: 132,
    dateJoined: '2022-11-30'
  },
  {
    id: 'u3',
    name: 'Raj Kumar',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 4.5,
    isVerified: true,
    ridesCompleted: 43,
    dateJoined: '2023-04-10'
  },
  {
    id: 'u4',
    name: 'Sneha Patel',
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
    rating: 4.7,
    isVerified: false,
    ridesCompleted: 21,
    dateJoined: '2023-08-05'
  },
  {
    id: 'u5',
    name: 'Vikram Singh',
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
    rating: 4.6,
    isVerified: true,
    ridesCompleted: 89,
    dateJoined: '2022-09-22'
  }
];

export const mockRides: Ride[] = [
  {
    id: 'r1',
    driver: mockUsers[0],
    origin: {
      label: 'Banjara Hills',
      lat: 17.4138,
      lng: 78.4335
    },
    destination: {
      label: 'Hitech City',
      lat: 17.4435,
      lng: 78.3772
    },
    departureTime: '2023-10-15T09:30:00',
    vehicleType: 'bike',
    availableSeats: 1,
    fare: 60,
    distance: 8.2,
    duration: 22,
    allowsGender: 'any',
    requiresHelmet: true,
    status: 'upcoming'
  },
  {
    id: 'r2',
    driver: mockUsers[1],
    origin: {
      label: 'Gachibowli',
      lat: 17.4401,
      lng: 78.3489
    },
    destination: {
      label: 'Jubilee Hills',
      lat: 17.4278,
      lng: 78.4170
    },
    departureTime: '2023-10-15T18:00:00',
    vehicleType: 'car',
    availableSeats: 3,
    fare: 120,
    distance: 7.5,
    duration: 25,
    allowsGender: 'any',
    requiresHelmet: false,
    status: 'upcoming'
  },
  {
    id: 'r3',
    driver: mockUsers[2],
    origin: {
      label: 'Ameerpet',
      lat: 17.4374,
      lng: 78.4482
    },
    destination: {
      label: 'Madhapur',
      lat: 17.4478,
      lng: 78.3916
    },
    departureTime: '2023-10-15T10:15:00',
    vehicleType: 'bike',
    availableSeats: 1,
    fare: 50,
    distance: 6.3,
    duration: 18,
    allowsGender: 'male',
    requiresHelmet: true,
    status: 'upcoming'
  },
  {
    id: 'r4',
    driver: mockUsers[3],
    origin: {
      label: 'Kukatpally',
      lat: 17.4849,
      lng: 78.4138
    },
    destination: {
      label: 'Secunderabad',
      lat: 17.4399,
      lng: 78.4983
    },
    departureTime: '2023-10-15T17:00:00',
    vehicleType: 'car',
    availableSeats: 2,
    fare: 150,
    distance: 12.1,
    duration: 35,
    allowsGender: 'female',
    requiresHelmet: false,
    status: 'upcoming'
  },
  {
    id: 'r5',
    driver: mockUsers[4],
    origin: {
      label: 'Dilsukhnagar',
      lat: 17.3684,
      lng: 78.5247
    },
    destination: {
      label: 'LB Nagar',
      lat: 17.3457,
      lng: 78.5522
    },
    departureTime: '2023-10-15T08:45:00',
    vehicleType: 'bike',
    availableSeats: 1,
    fare: 40,
    distance: 4.8,
    duration: 15,
    allowsGender: 'any',
    requiresHelmet: true,
    status: 'upcoming'
  }
];

export const mockChats: Chat[] = [
  {
    id: 'c1',
    participants: [mockUsers[0], mockUsers[1]],
    rideId: 'r1',
    messages: [
      {
        id: 'm1',
        senderId: mockUsers[0].id,
        text: 'Hi, I am heading to Hitech City. Would you like to join?',
        timestamp: '2023-10-14T15:30:00',
        isRead: true
      },
      {
        id: 'm2',
        senderId: mockUsers[1].id,
        text: 'Yes, that would be great. What time are you leaving?',
        timestamp: '2023-10-14T15:32:00',
        isRead: true
      },
      {
        id: 'm3',
        senderId: mockUsers[0].id,
        text: 'I plan to leave at 9:30 AM tomorrow. Is that okay?',
        timestamp: '2023-10-14T15:33:00',
        isRead: true
      },
      {
        id: 'm4',
        senderId: mockUsers[1].id,
        text: 'Perfect. Where should I wait for you?',
        timestamp: '2023-10-14T15:35:00',
        isRead: false
      }
    ],
    lastUpdated: '2023-10-14T15:35:00'
  }
];

export const hyderabadLocations = [
  'Banjara Hills',
  'Jubilee Hills',
  'Hitech City',
  'Gachibowli',
  'Madhapur',
  'Ameerpet',
  'Secunderabad',
  'Kukatpally',
  'Dilsukhnagar',
  'LB Nagar',
  'Uppal',
  'Begumpet',
  'Manikonda',
  'Kondapur',
  'KPHB Colony',
  'Somajiguda',
  'Kothapet',
  'Mehdipatnam',
  'Abids',
  'Charminar'
];
