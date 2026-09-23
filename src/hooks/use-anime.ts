import anime, { type AnimeParams } from "animejs";
import { useEffect, type RefObject } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useScrollAnimation<T extends HTMLElement>(
  ref: RefObject<T | null>,
  getAnimation: (element: T) => AnimeParams,
  threshold = 0.25,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      anime.set(element, { opacity: 1, translateX: 0, translateY: 0, scale: 1 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        anime(getAnimation(element));
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      anime.remove(element);
    };
  }, [ref, getAnimation, threshold]);
}

export function animateHover(target: Element, enter: boolean, extra?: Element | null) {
  if (prefersReducedMotion()) return;
  anime.remove([target, extra].filter(Boolean) as Element[]);
  anime({
    targets: target,
    translateY: enter ? -6 : 0,
    scale: enter ? 1.02 : 1,
    duration: 260,
    easing: "easeOutQuad",
  });
  if (extra) {
    anime({
      targets: extra,
      rotate: enter ? [0, -7, 7, 0] : 0,
      scale: enter ? [1, 1.14, 1] : 1,
      duration: 420,
      easing: "easeInOutQuad",
    });
  }
}