import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-wine-50 text-wine-700 rounded-lg">
      {message}
    </div>
  );
};

export default ErrorMessage;