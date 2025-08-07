// src/hooks/useMailerLiteScript.ts
import { useState, useEffect } from "react";

console.log("SCRIPT: useMailerLiteScript hook file is being read.");

let isScriptLoaded = false;
let isScriptAppended = false;

export const useMailerLiteScript = () => {
  const [loaded, setLoaded] = useState(isScriptLoaded);

  useEffect(() => {
    console.log("HOOK: useEffect is running.");

    if (isScriptLoaded) {
      console.log("HOOK: Script is already loaded, exiting effect.");
      return;
    }

    if (isScriptAppended) {
      console.log("HOOK: Script has been appended but not yet loaded.");
      return;
    }

    console.log("HOOK: Creating and appending script for the first time.");
    isScriptAppended = true;

    const script = document.createElement("script");
    script.src = "https://assets.mailerlite.com/js/universal.js";
    script.async = true;

    script.onload = () => {
      console.log(
        "HOOK: SUCCESS! Script has officially loaded (onload event fired).",
      );
      isScriptLoaded = true;
      setLoaded(true);
    };

    script.onerror = () => {
      console.error("HOOK: ERROR! The MailerLite script failed to load.");
    };

    document.body.appendChild(script);

    window.ml =
      window.ml ||
      function () {
        (window.ml.q = window.ml.q || []).push(arguments);
      };
    window.ml("account", "1711800");
  }, []); // Runs only once for the app lifetime

  return loaded;
};
