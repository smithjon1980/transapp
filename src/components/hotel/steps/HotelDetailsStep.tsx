import React from 'react';
import { Building2, Calendar, Clock, Hash, Phone } from 'lucide-react';
import Input from '../../ui/Input';

interface HotelDetailsStepProps {
  value: {
    pickupHotel: string;
    dropoffHotel: string;
    date: string;
    time: string;
    hotelConfirmation?: string;
    roomNumber?: string;
    conciergeContact?: string;
  };
  onChange: (value: any) => void;
}

const HotelDetailsStep: React.FC<HotelDetailsStepProps> = ({ value, onChange }) => {
  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Pickup Hotel"
        value={value.pickupHotel}
        onChange={handleChange('pickupHotel')}
        placeholder="Enter pickup hotel name"
        icon={Building2}
        required
      />

      <Input
        label="Dropoff Hotel"
        value={value.dropoffHotel}
        onChange={handleChange('dropoffHotel')}
        placeholder="Enter destination hotel name"
        icon={Building2}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Transfer Date"
          type="date"
          value={value.date}
          onChange={handleChange('date')}
          min={new Date().toISOString().split('T')[0]}
          icon={Calendar}
          required
        />

        <Input
          label="Transfer Time"
          type="time"
          value={value.time}
          onChange={handleChange('time')}
          icon={Clock}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Hotel Confirmation #"
          value={value.hotelConfirmation}
          onChange={handleChange('hotelConfirmation')}
          placeholder="Enter confirmation number"
          icon={Hash}
        />

        <Input
          label="Room Number"
          value={value.roomNumber}
          onChange={handleChange('roomNumber')}
          placeholder="Enter room number"
          icon={Hash}
        />
      </div>

      <Input
        label="Concierge Contact"
        value={value.conciergeContact}
        onChange={handleChange('conciergeContact')}
        placeholder="Enter concierge contact details"
        icon={Phone}
      />
    </div>
  );
};

export default HotelDetailsStep;