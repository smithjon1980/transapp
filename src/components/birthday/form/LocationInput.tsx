import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '../../../utils/cn';
import Input from '../../ui/Input';

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: typeof MapPin;
  required?: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChange,
  icon: Icon = MapPin,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <Input
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter location"
        icon={Icon}
        required={required}
      />
      <button
        type="button"
        onClick={() => {/* Implement map selection */}}
        className={cn(
          "text-sm text-wine-500 hover:text-wine-600",
          "dark:text-wine-400 dark:hover:text-wine-300",
          "flex items-center"
        )}
      >
        <MapPin className="w-4 h-4 mr-1" />
        Select on map
      </button>
    </div>
  );
};

export default LocationInput;