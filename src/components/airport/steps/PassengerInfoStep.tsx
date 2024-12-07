import React from 'react';
import { User, Users } from 'lucide-react';
import Input from '../../ui/Input';

interface PassengerInfoStepProps {
  value: {
    total: number;
    name: string;
  };
  onChange: (value: any) => void;
}

const PassengerInfoStep: React.FC<PassengerInfoStepProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      [field]: field === 'total' ? parseInt(e.target.value) : e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Number of Passengers"
        type="number"
        value={value.total}
        onChange={handleChange('total')}
        min={1}
        max={8}
        icon={Users}
        required
      />

      <Input
        label="Lead Passenger Name"
        value={value.name}
        onChange={handleChange('name')}
        placeholder="Enter passenger name"
        icon={User}
        required
      />
    </div>
  );
};

export default PassengerInfoStep;