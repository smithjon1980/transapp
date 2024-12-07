import React from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import LocationInput from '../LocationInput';
import Button from '../../ui/Button';
import { cn } from '../../../utils/cn';

interface ItineraryStepProps {
  value: Array<{ location: string; notes?: string }>;
  onChange: (value: Array<{ location: string; notes?: string }>) => void;
}

const ItineraryStep: React.FC<ItineraryStepProps> = ({ value, onChange }) => {
  const addStop = () => {
    onChange([...value, { location: '', notes: '' }]);
  };

  const removeStop = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateStop = (index: number, field: 'location' | 'notes') => (newValue: string) => {
    const newStops = [...value];
    newStops[index] = { ...newStops[index], [field]: newValue };
    onChange(newStops);
  };

  return (
    <div className="space-y-6">
      {value.map((stop, index) => (
        <div
          key={index}
          className={cn(
            "p-4 rounded-lg border transition-all",
            "border-tan-200 dark:border-navy-600",
            "bg-white/50 dark:bg-navy-800/50"
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-navy-600 dark:text-tan-200">
                Stop {index + 1}
              </span>
              {value.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStop(index)}
                  className="text-wine-500 hover:text-wine-600 dark:hover:text-wine-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <LocationInput
              value={stop.location}
              onChange={(newValue) => updateStop(index, 'location')(newValue)}
              placeholder="Enter location"
              required
            />

            <LocationInput
              value={stop.notes || ''}
              onChange={(newValue) => updateStop(index, 'notes')(newValue)}
              placeholder="Additional notes (optional)"
              allowAirportCode={false}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addStop}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Stop
      </Button>
    </div>
  );
};

export default ItineraryStep;