import { RefObject, useEffect, useState } from "react";

// export function useIsVisible(ref:RefObject<any[]>, threshold:number) {
//     const [isIntersecting, setIntersecting] = useState(false);
  
//     useEffect(() => {
//       const observer = new IntersectionObserver(([entry]) => {
//           setIntersecting(entry.isIntersecting);
//       }, {
//         threshold:threshold
//       } 
//       );
//       observer.observe(ref.current);
//       return () => {
//         observer.disconnect();
//       };
//     }, [ref]);
//     return isIntersecting;
//   }


export function useIsVisible(ref: React.RefObject<any>, threshold: number) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, {
      threshold: threshold
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isIntersecting;
}