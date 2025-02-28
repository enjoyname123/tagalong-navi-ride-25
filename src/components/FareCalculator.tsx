
import { useState, useEffect } from 'react';
import { Calculator, Bike, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VehicleType } from '@/lib/types';

type FareCalculatorProps = {
  distance: number;
  onFareCalculated?: (fare: number) => void;
};

const FareCalculator = ({ distance, onFareCalculated }: FareCalculatorProps) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>('bike');
  const [fare, setFare] = useState(0);
  
  // Base rates
  const bikeRatePerKm = 7;
  const carRatePerKm = 14;
  // Minimum fares
  const bikeMinFare = 30;
  const carMinFare = 60;
  
  useEffect(() => {
    calculateFare();
  }, [distance, vehicleType]);
  
  const calculateFare = () => {
    let calculatedFare = 0;
    
    if (vehicleType === 'bike') {
      calculatedFare = Math.max(bikeMinFare, Math.round(distance * bikeRatePerKm));
    } else {
      calculatedFare = Math.max(carMinFare, Math.round(distance * carRatePerKm));
    }
    
    setFare(calculatedFare);
    if (onFareCalculated) {
      onFareCalculated(calculatedFare);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 transition-transform duration-300 hover:shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-tagalong-purple">
          <Calculator className="w-5 h-5" />
          <h3 className="font-semibold">Fare Calculator</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Distance</div>
            <div className="font-medium">{distance.toFixed(1)} km</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Estimated Fare</div>
            <div className="font-semibold text-tagalong-purple">₹{fare}</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500 mb-2">Vehicle Type</div>
          <div className="flex gap-3">
            <Button
              variant={vehicleType === 'bike' ? 'default' : 'outline'}
              className={`flex-1 rounded-full ${
                vehicleType === 'bike' 
                  ? 'bg-tagalong-purple hover:bg-tagalong-purple-dark text-white'
                  : 'border-gray-200 text-gray-600 hover:border-tagalong-purple hover:text-tagalong-purple'
              }`}
              onClick={() => setVehicleType('bike')}
            >
              <Bike className="w-4 h-4 mr-2" /> Bike
            </Button>
            <Button
              variant={vehicleType === 'car' ? 'default' : 'outline'}
              className={`flex-1 rounded-full ${
                vehicleType === 'car' 
                  ? 'bg-tagalong-teal hover:bg-tagalong-teal-light text-white'
                  : 'border-gray-200 text-gray-600 hover:border-tagalong-teal hover:text-tagalong-teal'
              }`}
              onClick={() => setVehicleType('car')}
            >
              <Car className="w-4 h-4 mr-2" /> Car
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <p className="mb-1">Fare breakdown:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Base fare: ₹{vehicleType === 'bike' ? bikeMinFare : carMinFare}</li>
            <li>Per km rate: ₹{vehicleType === 'bike' ? bikeRatePerKm : carRatePerKm}/km</li>
            <li>Taxes & fees included</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FareCalculator;
