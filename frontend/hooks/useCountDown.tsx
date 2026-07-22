import { useEffect, useState } from "react";

export default function useCountDown(time: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = +new Date(time) - +new Date();

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    setIsMounted(true);
    return () => clearInterval(interval);
  }, [time]);

  return { timeLeft, isMounted };
}
