import { useEffect, useRef, useState } from 'react';

export default function useParallax(speed = 0.25) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = null;

    const measure = () => {
      const el = ref.current;
      if (el) setOffset(el.getBoundingClientRect().top * -speed);
      frame = null;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return { ref, offset };
}
