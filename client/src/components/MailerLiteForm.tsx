// src/components/MailerLiteForm.tsx
import { useEffect } from "react";
import { useMailerLiteScript } from "../hooks/useMailerLiteScript";

declare global {
  interface Window {
    ml: (action: string, ...args: any[]) => void;
  }
}

interface MailerLiteFormProps {
  formId: string;
  className?: string;
}

export default function MailerLiteForm({
  formId,
  className = "",
}: MailerLiteFormProps) {
  const isScriptReady = useMailerLiteScript();

  useEffect(() => {
    // Only proceed if the main script is fully loaded and ready.
    if (isScriptReady && typeof window.ml !== "undefined") {
      // THE FIX: This is the most reliable way to tell the *existing*
      // MailerLite script to find and render a form that was just added to the page.
      // We are directly telling it to render a form with our specific ID.
      window.ml("forms.render", {
        formId: formId,
      });
    }
  }, [isScriptReady, formId]); // This runs whenever the component mounts OR the script becomes ready.

  return <div className={`ml-embedded ${className}`} data-form={formId} />;
}
