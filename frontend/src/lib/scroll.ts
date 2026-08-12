interface LenisLike {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: Record<string, unknown>,
  ) => void;
}

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

export function scrollToTop() {
  if (typeof window === "undefined") return;

  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}
