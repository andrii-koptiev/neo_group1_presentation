import { useCallback, useEffect, useMemo, useState } from 'react';
import { team } from '../data/team';

export type Slide =
  { type: 'intro' | 'team' | 'team-summary' | 'final' } | { type: 'member'; memberIndex: number };
export function usePresentationNavigation() {
  const slides = useMemo<Slide[]>(
    () => [
      { type: 'intro' },
      { type: 'team' },
      ...team.map((_, memberIndex): Slide => ({ type: 'member', memberIndex })),
      { type: 'team-summary' },
      { type: 'final' },
    ],
    [],
  );
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const goTo = useCallback(
    (target: number) => {
      setIndex((current) => {
        setDirection(target >= current ? 1 : -1);
        return Math.max(0, Math.min(slides.length - 1, target));
      });
    },
    [slides.length],
  );
  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => Math.min(i + 1, slides.length - 1));
  }, [slides.length]);
  const previous = useCallback(() => {
    setDirection(-1);
    setIndex((i) => Math.max(0, i - 1));
  }, []);
  const openMember = (memberIndex: number) => goTo(2 + memberIndex);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        target.closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      if (event.code === 'Space' && target.closest('button, a, [role="button"]')) return;
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          next();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previous();
          break;
        case 'Escape':
          if (slides[index].type === 'member') {
            event.preventDefault();
            goTo(1);
          }
          break;
        case 'Home':
          event.preventDefault();
          goTo(0);
          break;
        case 'End':
          event.preventDefault();
          goTo(slides.length - 1);
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goTo, index, next, previous, slides]);
  return {
    slide: slides[index],
    index,
    total: slides.length,
    direction,
    next,
    previous,
    goTo,
    openMember,
  };
}
