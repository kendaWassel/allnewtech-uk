'use client';
import { useEffect } from 'react';

const ErrorLogger = () => {
  useEffect(() => {
    window.onerror = function(msg, src, line) {
      console.log('Error:', msg, src, line);
    };
  }, []);

  return null;
};

export default ErrorLogger;