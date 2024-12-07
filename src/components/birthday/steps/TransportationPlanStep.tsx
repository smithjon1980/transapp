import React from 'react';
import { MapPin, Plus, Trash2, Car } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { TransportationPlan, VehiclePreference } from '../../../types/birthday';
import { cn } from '../../../utils/cn';

interface TransportationPlanStepProps {
  value: TransportationPlan;
  onChange: (value: TransportationPlan) => void;
}

const vehicleOptions: Array<{ type: VehiclePreference['type']; label: string; capacity: string }> = [
  { type: 'luxury-sedan', label: 'Luxury Sedan', capacity: 'Up to 4 passengers' },
  { type: 'suv', label: 'Luxury SUV', capacity: 'Up to 6 passengers' },
  { type: 'van', label: 'Luxury Van', capacity: 'Up to 12 passengers' },
  { type: 'limo', label: 'Limousine', capacity: 'Up to 8 passengers' },
  { type: 'party-bus', label: 'Party Bus', capacity: 'Up to 20 passengers' },
];

const TransportationPlanStep: React.FC<TransportationPlanStepProps> = ({ value, onChange }) => {
  const addStop = () => {
    onChange({
      ...value,
      additionalStops: [
        ...value.additionalStops,
        { address: '', plannedArrival: '', plannedDeparture: '', purpose: '' }
      ],
    });
  };

  const removeStop = (index: number) => {
    onChange({
      ...value,
      additionalStops: value.additionalStops.filter((_, i) => i !== index),
    });
  };

  const updateStop = (index: number, field: string, newValue: string) => {
    const newStops = [...value.additionalStops];
    newStops[index] = { ...newStops[index], [field]: newValue };
    onChange({ ...value, additionalStops: newStops });
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Select Vehicle Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicleOptions.map((option) => (
            <button
              key={option.type}
              type="button"
              onClick={() => onChange({
                ...value,
                vehiclePreference: {
                  ...value.vehiclePreference,
                  type: option.type,
                },
              })}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.vehiclePreference.type === option.type
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <div className="flex items-start">
                <Car className={cn(
                  "w-5 h-5 mt-1 mr-3",
                  value.vehiclePreference.type === option.type
                    ? "text-wine-500"
                    : "text-navy-400 dark:text-tan-300"
                )} />
                <div>
                  <p className="font-medium text-navy-900 dark:text-tan-50">
                    {option.label}
                  </p>
                  <p className="text-sm text-navy-500 dark:text-tan-300">
                    {option.capacity}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Locations */}
      <Input
        label="Pickup Location"
        value={value.pickupLocation}
        onChange={(e) => onChange({ ...value, pickupLocation: e.target.value })}
        placeholder="Enter pickup address"
        icon={MapPin}
        required
      />

      <Input
        label="Main Venue"
        value={value.mainVenueAddress}
        onChange={(e) => onChange({ ...value, mainVenueAddress: e.target.value })}
        placeholder="Enter main venue address"
        icon={MapPin}
        required
      />

      {/* Additional Stops */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
            Additional Stops
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addStop}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Stop
          </Button>
        </div>

        {value.additionalStops.map((stop, index) => (
          <div
            key={index}
            className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Stop {index + 1}</span>
              <button
                type="button"
                onClick={() => removeStop(index)}
                className="text-wine-500 hover:text-wine-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Input
              label="Address"
              value={stop.address}
              onChange={(e) => updateStop(index, 'address', e.target.value)}
              placeholder="Enter address"
              icon={MapPin}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Arrival Time"
                type="time"
                value={stop.plannedArrival}
                onChange={(e) => updateStop(index, 'plannedArrival', e.target.value)}
                required
              />
              <Input
                label="Departure Time"
                type="time"
                value={stop.plannedDeparture}
                onChange={(e) => updateStop(index, 'plannedDeparture', e.target.value)}
                required
              />
            </div>

            <Input
              label="Purpose"
              value={stop.purpose}
              onChange={(e) => updateStop(index, 'purpose', e.target.value)}
              placeholder="e.g., Photo session, Pick up guests"
              required
            />
          </div>
        ))}
      </div>

      <Input
        label="Return Location"
        value={value.returnLocation}
        onChange={(e) => onChange({ ...value, returnLocation: e.target.value })}
        placeholder="Enter return address"
        icon={MapPin}
        required
      />
    </div>
  );
};

export default TransportationPlanStep;