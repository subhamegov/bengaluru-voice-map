import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { globalStopSpeech } from "@/hooks/use-speech";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    // Stop any active speech on navigation
    globalStopSpeech();
  }, [pathname, navType]);

  return null;
};
