import { useEffect, useState } from "react";


export function useIsVisible(ref: React.RefObject<any>, threshold: number | undefined) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, 
    threshold?{threshold: threshold} : {}
  );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isIntersecting;
}


/**
 * 判斷元素是否滾動到瀏覽器頂部
 */
export function useIsAtTop(ref: React.RefObject<any>) {
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setIsAtTop(rect.top <= 0); // 檢查元素頂部是否 <= 瀏覽器頂部
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return isAtTop;
}