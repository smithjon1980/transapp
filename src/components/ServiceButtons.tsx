import React from 'react';
import { Car, MapPin, Stethoscope } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useLanguage } from '../utils/LanguageContext';

interface ServiceButtonsProps {
  onServiceSelect: (serviceType: string) => void;
  selectedService: string | null;
}

const services = [
  {
    id: 'airportTransfer',
    icon: Car,
    bgImage: 'https://images.unsplash.com/photo-1588258219511-64eb629cb833?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'cityTransfer',
    icon: MapPin,
    bgImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'medicalTransport',
    icon: Stethoscope,
    bgImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800&h=600',
  },
];

const ServiceButtons: React.FC<ServiceButtonsProps> = ({
  onServiceSelect,
  selectedService,
}) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          title={t(`service.${service.id}`)}
          description={t(`service.${service.id}.description`)}
          isSelected={selectedService === service.id}
          onClick={() => onServiceSelect(service.id)}
          bgImage={service.bgImage}
        />
      ))}
    </div>
  );
};

export default ServiceButtons;