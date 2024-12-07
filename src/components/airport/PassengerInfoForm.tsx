import React from 'react';
import { PassengerInfo } from '../../types/airport';
import Input from '../ui/Input';
import { User, Users } from 'lucide-react';

interface PassengerInfoFormProps {
  value: PassengerInfo;
  onChange: (value: PassengerInfo) => void;
}

const PassengerInfoForm: React.FC<PassengerInfoFormProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof PassengerInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = field === 'total' ? parseInt(e.target.value) : e.target.value;
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className="space-y-4">
      <Input
        label="Passenger Name"
        value={value.name}
        onChange={handleChange('name')}
        placeholder="Enter passenger name"
        icon={User}
        required
      />

      <Input
        label="Total Passengers"
        type="number"
        value={value.total}
        onChange={handleChange('total')}
        min={1}
        max={8}
        icon={Users}
        required
      />
    </div>
  );
};

export default PassengerInfoForm;