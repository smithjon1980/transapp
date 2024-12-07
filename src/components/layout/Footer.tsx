import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '../../utils/cn';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const contactInfo = [
    { icon: Phone, text: '1-800-PREMIUM', href: 'tel:1-800-773-6486' },
    { icon: Mail, text: 'bookings@premiumtransport.com', href: 'mailto:bookings@premiumtransport.com' },
    { icon: MapPin, text: '123 Luxury Lane, Beverly Hills, CA 90210', href: '#' },
  ];

  return (
    <footer className="relative mt-24">
      {/* Decorative Top Border */}
      <div className="absolute top-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-wine-500/50 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full bg-wine-500 ring-4 ring-tan-50 dark:ring-navy-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-navy-900 dark:text-tan-50">
              Premium Transport
            </h3>
            <p className="text-sm text-navy-600 dark:text-tan-200">
              Experience luxury transportation services tailored to your needs. Available 24/7 for your comfort and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-navy-900 dark:text-tan-50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Fleet', 'Testimonials', 'FAQs'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={cn(
                      "text-sm text-navy-600 dark:text-tan-200",
                      "hover:text-wine-500 dark:hover:text-wine-400",
                      "transition-colors duration-200"
                    )}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold text-navy-900 dark:text-tan-50 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="flex items-start space-x-3 group"
                  >
                    <item.icon className="w-5 h-5 text-navy-400 dark:text-tan-300 group-hover:text-wine-500 dark:group-hover:text-wine-400" />
                    <span className="text-sm text-navy-600 dark:text-tan-200 group-hover:text-wine-500 dark:group-hover:text-wine-400">
                      {item.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-navy-900 dark:text-tan-50 mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-lg transition-colors duration-200",
                    "bg-tan-100 dark:bg-navy-700",
                    "hover:bg-wine-500 dark:hover:bg-wine-500",
                    "text-navy-600 dark:text-tan-200",
                    "hover:text-white dark:hover:text-white"
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-tan-200/50 dark:border-navy-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-navy-500 dark:text-tan-300">
              © {currentYear} Premium Transport. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className={cn(
                    "text-sm text-navy-500 dark:text-tan-300",
                    "hover:text-wine-500 dark:hover:text-wine-400",
                    "transition-colors duration-200"
                  )}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;