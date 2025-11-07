import { useEffect, useState } from "react";

export function useIntersection(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}
