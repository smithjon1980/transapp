import React from 'react';
import { 
  Plane, Building2, Cake, Music2, Trophy, Utensils
} from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { useBookingStore } from '../store/bookingStore';
import { ServiceType } from '../types/booking';
import ServiceCard from './ServiceCard';
import Button from './ui/Button';

const services = [
  {
    id: 'airport' as ServiceType,
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Luxury transportation to DFW International & Love Field airports. Professional chauffeurs track your flight for seamless service.',
    bgImage: 'https://images.unsplash.com/photo-1597217190944-3d0a1a5e5900?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'birthday' as ServiceType,
    icon: Cake,
    title: 'Birthday Events',
    description: 'Make your Dallas celebration special with luxury transportation to venues like The Adolphus, The Joule, or your chosen location.',
    bgImage: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'concert' as ServiceType,
    icon: Music2,
    title: 'Concert & Events',
    description: 'VIP transport to American Airlines Center, Toyota Music Factory, The Pavilion at Toyota Music Factory, and more.',
    bgImage: 'https://images.unsplash.com/photo-1582648373212-d5bd3f2d789c?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'dinner' as ServiceType,
    icon: Utensils,
    title: 'Fine Dining',
    description: 'Elegant rides to Dallas\' finest: Bullion, Monarch, Nick & Sam\'s, Al Biernat\'s, and other premier restaurants.',
    bgImage: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'hotel' as ServiceType,
    icon: Building2,
    title: 'Hotel Transfers',
    description: 'Premium transfers between DFW\'s luxury hotels: Ritz-Carlton, Four Seasons Las Colinas, Mansion on Turtle Creek.',
    bgImage: 'https://images.unsplash.com/photo-1594741158704-5a784b8e59fb?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 'sports' as ServiceType,
    icon: Trophy,
    title: 'Sporting Events',
    description: 'Luxury transport to AT&T Stadium, Globe Life Field, American Airlines Center & FC Dallas matches.',
    bgImage: 'https://images.unsplash.com/photo-1624264810067-ed31dd3c3502?auto=format&fit=crop&q=80&w=2000',
  },
].sort((a, b) => a.title.localeCompare(b.title));

interface ServiceSelectorProps {
  inModal?: boolean;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ inModal = false }) => {
  const { t } = useLanguage();
  const { setSelectedService } = useBookingStore();

  if (inModal) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div 
            key={service.id}
            className="opacity-0 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              bgImage={service.bgImage}
              onClick={() => setSelectedService(service.id)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative text-center mb-24 sm:mb-32 lg:mb-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-gradient mb-8 sm:mb-10">
            Transportation Is More Than Just A Ride
          </h1>
          <p className="subheading mb-12 sm:mb-16">
            It's An Experience. Reserve The Premium Experience.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              onClick={() => setSelectedService('airport')}
              className="w-full sm:w-auto min-w-[200px]"
            >
              <Plane className="w-4 h-4 mr-2" />
              Book Airport Transfer
            </Button>
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="w-full sm:w-auto min-w-[200px]"
            >
              View All Services
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 dark:text-tan-50 mb-4">
            Our Premium Services
          </h2>
          <p className="text-navy-600 dark:text-tan-200">
            Choose from our selection of luxury transportation services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                bgImage={service.bgImage}
                onClick={() => setSelectedService(service.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;