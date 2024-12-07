import React from 'react';
import { Users, Star, Music } from 'lucide-react';
import Input from '../../ui/Input';
import { cn } from '../../../utils/cn';

interface GroupDetailsStepProps {
  value: {
    totalPassengers: number;
    hasVIP: boolean;
    vipServices: {
      priorityEntry: boolean;
      backstageAccess: boolean;
      meetAndGreet: boolean;
    };
    specialRequests?: string;
  };
  onChange: (value: any) => void;
}

const vipServices = [
  { id: 'priorityEntry', label: 'Priority Entry', icon: Star },
  { id: 'backstageAccess', label: 'Backstage Access', icon: Music },
  { id: 'meetAndGreet', label: 'Meet & Greet', icon: Users },
];

const GroupDetailsStep: React.FC<GroupDetailsStepProps> = ({ value, onChange }) => {
  const toggleVIP = () => {
    onChange({
      ...value,
      hasVIP: !value.hasVIP,
      vipServices: value.hasVIP ? {
        priorityEntry: false,
        backstageAccess: false,
        meetAndGreet: false,
      } : value.vipServices,
    });
  };

  const toggleService = (serviceId: keyof typeof value.vipServices) => {
    onChange({
      ...value,
      vipServices: {
        ...value.vipServices,
        [serviceId]: !value.vipServices[serviceId],
      },
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Total Passengers"
        type="number"
        value={value.totalPassengers}
        onChange={(e) => onChange({
          ...value,
          totalPassengers: parseInt(e.target.value),
        })}
        min={1}
        max={20}
        icon={Users}
        required
      />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasVIP"
            checked={value.hasVIP}
            onChange={toggleVIP}
            className="rounded border-tan-200 text-wine-500 focus:ring-wine-500"
          />
          <label
            htmlFor="hasVIP"
            className="text-sm font-medium text-navy-900 dark:text-tan-50"
          >
            VIP Services Required
          </label>
        </div>

        {value.hasVIP && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {vipServices.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id as keyof typeof value.vipServices)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all",
                  "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                  value.vipServices[service.id as keyof typeof value.vipServices]
                    ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                    : "border-tan-200 dark:border-navy-600"
                )}
              >
                <div className="flex flex-col items-center">
                  <service.icon className={cn(
                    "w-6 h-6 mb-2",
                    value.vipServices[service.id as keyof typeof value.vipServices]
                      ? "text-wine-500"
                      : "text-navy-400 dark:text-tan-300"
                  )} />
                  <span className={cn(
                    "text-sm font-medium text-center",
                    value.vipServices[service.id as keyof typeof value.vipServices]
                      ? "text-wine-500"
                      : "text-navy-600 dark:text-tan-200"
                  )}>
                    {service.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Requests
        </label>
        <textarea
          value={value.specialRequests}
          onChange={(e) => onChange({
            ...value,
            specialRequests: e.target.value,
          })}
          placeholder="Any special requirements or preferences?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default GroupDetailsStep;