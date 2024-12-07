export interface ValidationError {
  field: string;
  message: string;
}

export const validateBookingForm = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Required fields validation
  const requiredFields = {
    name: 'Full Name',
    email: 'Email',
    date: 'Date',
    time: 'Time',
    pickupLocation: 'Pickup Location',
    dropoffLocation: 'Dropoff Location',
  };

  Object.entries(requiredFields).forEach(([field, label]) => {
    if (!data[field]?.trim()) {
      errors.push({
        field,
        message: `${label} is required`,
      });
    }
  });

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }

  // Date validation
  if (data.date) {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.push({
        field: 'date',
        message: 'Please select a future date',
      });
    }
  }

  // Flight number format validation (if provided)
  if (data.flightNumber && !/^[A-Z0-9]{2,8}$/.test(data.flightNumber.toUpperCase())) {
    errors.push({
      field: 'flightNumber',
      message: 'Please enter a valid flight number',
    });
  }

  return errors;
};