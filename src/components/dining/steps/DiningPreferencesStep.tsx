import React from 'react';
import { GlassWine, ChefHat, Utensils } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface DiningPreferencesStepProps {
  value: {
    tablePreference?: string;
    dietaryRestrictions: string[];
    wineService: boolean;
    sommelierService: boolean;
    chefTable: boolean;
    notes?: string;
  };
  onChange: (value: any) => void;
}

const tablePreferences = [
  { value: 'window', label: 'Window Seat' },
  { value: 'private', label: 'Private Area' },
  { value: 'patio', label: 'Patio/Outdoor' },
  { value: 'any', label: 'No Preference' },
];

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut Allergy',
  'Shellfish Allergy',
  'Kosher',
  'Halal',
];

const DiningPreferencesStep: React.FC<DiningPreferencesStepProps> = ({ value, onChange }) => {
  const toggleDietaryRestriction = (restriction: string) => {
    const newRestrictions = value.dietaryRestrictions.includes(restriction)
      ? value.dietaryRestrictions.filter(r => r !== restriction)
      : [...value.dietaryRestrictions, restriction];
    
    onChange({
      ...value,
      dietaryRestrictions: newRestrictions,
    });
  };

  const toggleService = (service: 'wineService' | 'sommelierService' | 'chefTable') => {
    onChange({
      ...value,
      [service]: !value[service],
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Table Preference
        </label>
        <div className="grid grid-cols-2 gap-4">
          {tablePreferences.map((pref) => (
            <button
              key={pref.value}
              type="button"
              onClick={() => onChange({ ...value, tablePreference: pref.value })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.tablePreference === pref.value
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <span className={cn(
                "font-medium",
                value.tablePreference === pref.value
                  ? "text-wine-500"
                  : "text-navy-600 dark:text-tan-200"
              )}>
                {pref.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Dietary Restrictions
        </label>
        <div className="grid grid-cols-2 gap-4">
          {dietaryOptions.map((restriction) => (
            <button
              key={restriction}
              type="button"
              onClick={() => toggleDietaryRestriction(restriction)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.dietaryRestrictions.includes(restriction)
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <span className={cn(
                "font-medium",
                value.dietaryRestrictions.includes(restriction)
                  ? "text-wine-500"
                  : "text-navy-600 dark:text-tan-200"
              )}>
                {restriction}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Additional Services
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => toggleService('wineService')}
            className={cn(
              "p-4 rounded-xl border-2 transition-all",
              "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
              value.wineService
                ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                : "border-tan-200 dark:border-navy-600"
            )}
          >
            <div className="flex flex-col items-center">
              <GlassWine className={cn(
                "w-6 h-6 mb-2",
                value.wineService
                  ? "text-wine-500"
                  : "text-navy-400 dark:text-tan-300"
              )} />
              <span className={cn(
                "text-sm font-medium text-center",
                value.wineService
                  ? "text-wine-500"
                  : "text-navy-600 dark:text-tan-200"
              )}>
                Wine Service
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => toggleService('sommelierService')}
            className={cn(
              "p-4 rounded-xl border-2 transition-all",
              "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
              value.sommelierService
                ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                : "border-tan-200 dark:border-navy-600"
            )}
          >
            <div className="flex flex-col items-center">
              <GlassWine className={cn(
                "w-6 h-6 mb-2",
                value.sommelierService
                  ? "text-wine-500"
                  : "text-navy-400 dark:text-tan-300"
              )} />
              <span className={cn(
                "text-sm font-medium text-center",
                value.sommelierService
                  ? "text-wine-500"
                  : "text-navy-600 dark:text-tan-200"
              )}>
                Sommelier Service
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => toggleService('chefTable')}
            className={cn(
              "p-4 rounded-xl border-2 transition-all",
              "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
              value.chefTable
                ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                : "border-tan-200 dark:border-navy-600"
            )}
          >
            <div className="flex flex-col items-center">
              <ChefHat className={cn(
                "w-6 h-6 mb-2",
                value.chefTable
                  ? "text-wine-500"
                  : "text-navy-400 dark:text-tan-300"
              )} />
              <span className={cn(
                "text-sm font-medium text-center",
                value.chefTable
                  ? "text-wine-500"
                  : "text-navy-600 dark:text-tan-200"
              )}>
                Chef's Table
              </span>
            </div>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Additional Notes
        </label>
        <textarea
          value={value.notes}
          onChange={(e) => onChange({ ...value, notes: e.target.value })}
          placeholder="Any additional preferences or requests?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default DiningPreferencesStep;