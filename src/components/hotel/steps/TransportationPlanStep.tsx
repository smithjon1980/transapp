import React from 'react';
import { MapPin, Plus, Trash2, Car } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { cn } from '../../../utils/cn';

interface TransportationPlanStepProps {
  value: {
    vehicleType: string;
    passengerCount: number;
    luggageCount: number;
    additionalStops: Array<{
      location: string;
      time: string;
      purpose: string;
    }>;
  };
  onChange: (value: any) => void;
}

const vehicleOptions = [
  { value: 'luxury-sedan', label: 'Luxury Sedan', capacity: 'Up to 3 passengers' },
  { value: 'suv', label: 'Luxury SUV', capacity: 'Up to 6 passengers' },
  { value: 'van', label: 'Executive Van', capacity: 'Up to 12 passengers' },
  { value: 'limo', label: 'Limousine', capacity: 'Up to 8 passengers' },
];

const TransportationPlanStep: React.FC<TransportationPlanStepProps> = ({ value, onChange }) => {
  const addStop = () => {
    onChange({
      ...value,
      additionalStops: [
        ...value.additionalStops,
        { location: '', time: '', purpose: '' }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vehicleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({
                ...value,
                vehicleType: option.value,
              })}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.vehicleType === option.value
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <div className="flex items-start">
                <Car className={cn(
                  "w-5 h-5 mt-1 mr-3",
                  value.vehicleType === option.value
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

      {/* Passenger and Luggage Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Number of Passengers"
          type="number"
          value={value.passengerCount}
          onChange={(e) => onChange({
            ...value,
            passengerCount: parseInt(e.target.value),
          })}
          min={1}
          max={12}
          required
        />

        <Input
          label="Pieces of Luggage"
          type="number"
          value={value.luggageCount}
          onChange={(e) => onChange({
            ...value,
            luggageCount: parseInt(e.target.value),
          })}
          min={0}
          max={20}
          required
        />
      </div>

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
              label="Location"
              value={stop.location}
              onChange={(e) => updateStop(index, 'location', e.target.value)}
              placeholder="Enter stop location"
              icon={MapPin}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Time"
                type="time"
                value={stop.time}
                onChange={(e) => updateStop(index, 'time', e.target.value)}
                required
              />

              <Input
                label="Purpose"
                value={stop.purpose}
                onChange={(e) => updateStop(index, 'purpose', e.target.value)}
                placeholder="e.g., Shopping, Dining"
                required
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportationPlanStep;