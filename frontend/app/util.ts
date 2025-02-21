import { useEffect, useRef, useState } from "react";

export function useIsVisible(ref:any, threshold:number) {
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
          setIntersecting(entry.isIntersecting);
      }, {
        threshold:threshold
      } 
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);
    return isIntersecting;
  }