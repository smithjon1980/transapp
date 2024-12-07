import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface DateTimeStepProps {
  formData: any;
  onSubmit: (data: any) => void;
}

const DateTimeStep: React.FC<DateTimeStepProps> = ({ formData, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    onSubmit({
      date: form.date.value,
      time: form.time.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Date"
          id="date"
          name="date"
          type="date"
          icon={Calendar}
          required
          defaultValue={formData.date}
          min={new Date().toISOString().split('T')[0]}
        />

        <Input
          label="Time"
          id="time"
          name="time"
          type="time"
          icon={Clock}
          required
          defaultValue={formData.time}
        />
      </div>

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
};

export default DateTimeStep;