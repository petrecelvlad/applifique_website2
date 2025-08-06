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
    // Wait for MailerLite script to load and scan for embedded forms
    const initializeForm = () => {
      if (typeof window.ml !== 'undefined' && formRef.current) {
        try {
          // MailerLite automatically scans for embedded forms, we just need to trigger a rescan
          window.ml('account', '1711800');
        } catch (error) {
          console.log('MailerLite form initialization:', error);
        }
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(() => {
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
        
        setTimeout(() => clearInterval(checkForML), 10000);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [formId]);

  return (
    <div 
      ref={formRef}
      className={`ml-embedded ${className}`} 
      data-form={formId}
    />
  );
}