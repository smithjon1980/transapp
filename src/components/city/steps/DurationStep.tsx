import React from 'react';
import { Clock } from 'lucide-react';
import Input from '../../ui/Input';

interface DurationStepProps {
  value: number;
  onChange: (value: number) => void;
  serviceType: 'hourly' | 'fullDay';
}

const DurationStep: React.FC<DurationStepProps> = ({ value, onChange, serviceType }) => {
  if (serviceType === 'fullDay') {
    return (
      <div className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg">
        <p className="text-navy-600 dark:text-tan-200">
          Full day service includes 8 hours of service.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Input
        label="Number of Hours"
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        min={2}
        max={12}
        icon={Clock}
        required
      />
      <p className="text-sm text-navy-500 dark:text-tan-300">
        Minimum booking: 2 hours
        <br />
        Maximum booking: 12 hours
      </p>
    </div>
  );
};

export default DurationStep;