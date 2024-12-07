import React from 'react';
import { Gift, Camera, Music, UtensilsCrossed } from 'lucide-react';
import { AdditionalServices } from '../../../types/birthday';
import { cn } from '../../../utils/cn';

interface AdditionalServicesStepProps {
  value: AdditionalServices;
  onChange: (value: AdditionalServices) => void;
}

const AdditionalServicesStep: React.FC<AdditionalServicesStepProps> = ({ value, onChange }) => {
  const services = [
    { id: 'decorations', label: 'Decorations', icon: Gift },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'entertainment', label: 'Entertainment', icon: Music },
    { id: 'catering', label: 'Catering', icon: UtensilsCrossed },
  ];

  const toggleService = (serviceId: keyof AdditionalServices) => {
    onChange({
      ...value,
      [serviceId]: !value[serviceId],
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...value,
      notes: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {services.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => toggleService(id as keyof AdditionalServices)}
            className={cn(
              "flex flex-col items-center p-6 rounded-xl border-2 transition-all",
              "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
              value[id as keyof AdditionalServices]
                ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                : "border-tan-200 dark:border-navy-600"
            )}
          >
            <Icon className={cn(
              "w-8 h-8 mb-2",
              value[id as keyof AdditionalServices]
                ? "text-wine-500"
                : "text-navy-400 dark:text-tan-300"
            )} />
            <span className={cn(
              "font-medium",
              value[id as keyof AdditionalServices]
                ? "text-wine-500"
                : "text-navy-600 dark:text-tan-200"
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Additional Notes
        </label>
        <textarea
          value={value.notes}
          onChange={handleNotesChange}
          placeholder="Any specific requirements or preferences for the selected services?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default AdditionalServicesStep;