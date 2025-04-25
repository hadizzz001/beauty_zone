import { useEffect, useState } from "react";
import VIPBox from "./VIPBox";

const PointsWatcher = () => {
  const [points, setPoints] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("userPoints") || "0");
    }
    return 0;
  });

  const [showVIP, setShowVIP] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = parseInt(localStorage.getItem("userPoints") || "0");

      if (current !== points) {
        console.log("userPoints updated:", current);
        setPoints(current);

        if (current > 100) {
          setShowVIP(true);
          localStorage.setItem("userPoints", "0");
        }
      }
    }, 500); // Poll every 0.5s

    return () => clearInterval(interval);
  }, [points]);

  const handleClose = () => {
    setShowVIP(false);
  };

  return showVIP ? <VIPBox onClose={handleClose} /> : null;
};

export default PointsWatcher;
