import { useEffect, useRef } from "react";

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

// Declare global MailerLite function
declare global {
  interface Window {
    ml: (action: string, ...args: any[]) => void;
  }
}

export default function MailerLiteForm({ formId, className = "" }: MailerLiteFormProps) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for MailerLite script to load and initialize the form
    const initializeForm = () => {
      if (typeof window.ml !== 'undefined' && formRef.current) {
        try {
          // Tell MailerLite to find and initialize the embedded form
          window.ml('forms.create', formId);
        } catch (error) {
          console.log('MailerLite form initialization:', error);
        }
      }
    };

    // Check if MailerLite is already loaded
    if (typeof window.ml !== 'undefined') {
      initializeForm();
    } else {
      // Wait for MailerLite script to load
      const checkForML = setInterval(() => {
        if (typeof window.ml !== 'undefined') {
          clearInterval(checkForML);
          initializeForm();
        }
      }, 100);
      
      // Clear interval after 10 seconds to prevent indefinite checking
      setTimeout(() => clearInterval(checkForML), 10000);
      
      return () => clearInterval(checkForML);
    }
  }, [formId]);

  return (
    <div 
      ref={formRef}
      className={`ml-embedded ${className}`} 
      data-form={formId}
    />
  );
}