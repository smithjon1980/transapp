import React from 'react';
import { 
  PartyPopper, Camera, Music, GlassWater, Sparkles, Flag
} from 'lucide-react';
import { PartyExtras } from '../../../types/birthday';
import { cn } from '../../../utils/cn';

interface PartyExtrasStepProps {
  value: PartyExtras;
  onChange: (value: PartyExtras) => void;
}

const PartyExtrasStep: React.FC<PartyExtrasStepProps> = ({ value, onChange }) => {
  const extras = [
    { id: 'vehicleDecoration', label: 'Vehicle Decoration', icon: PartyPopper },
    { id: 'redCarpetService', label: 'Red Carpet Service', icon: Sparkles },
    { id: 'welcomeSigns', label: 'Welcome Signs', icon: Flag },
    { id: 'champagneService', label: 'Champagne Service', icon: GlassWater },
    { id: 'customMusic', label: 'Custom Music', icon: Music },
    { id: 'photoStop', label: 'Photo Stop', icon: Camera },
  ];

  const toggleExtra = (extraId: keyof PartyExtras) => {
    if (typeof value[extraId] === 'boolean') {
      onChange({
        ...value,
        [extraId]: !value[extraId],
      });
    }
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
        {extras.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => toggleExtra(id as keyof PartyExtras)}
            className={cn(
              "flex flex-col items-center p-6 rounded-xl border-2 transition-all",
              "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
              value[id as keyof PartyExtras]
                ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                : "border-tan-200 dark:border-navy-600"
            )}
          >
            <Icon className={cn(
              "w-8 h-8 mb-2",
              value[id as keyof PartyExtras]
                ? "text-wine-500"
                : "text-navy-400 dark:text-tan-300"
            )} />
            <span className={cn(
              "font-medium text-center",
              value[id as keyof PartyExtras]
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
          placeholder="Any specific requirements for the selected services?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default PartyExtrasStep;