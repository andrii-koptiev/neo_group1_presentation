import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';
import { content } from '../data/team';
import type { Slide } from '../hooks/usePresentationNavigation';
import { NavigationControls } from './NavigationControls';
import { ProgressIndicator } from './ProgressIndicator';
interface Props {
  children: ReactNode;
  slide: Slide;
  index: number;
  total: number;
  direction: number;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
}
export function PresentationShell({
  children,
  slide,
  index,
  total,
  direction,
  next,
  previous,
  goTo,
}: Props) {
  const reducedMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  useEffect(() => {
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);
  const focusHeading = () => {
    const heading = mainRef.current?.querySelector<HTMLElement>('h1, h2');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setFullscreenError(true);
    }
  };
  return (
    <div className="presentation-shell">
      <a href="#presentation" className="skip-link">
        {content.nav.skip}
      </a>
      <div className="ambient ambient--cyan" />
      <div className="ambient ambient--purple" />
      <div className="background-grid" />
      <header className="shell-header">
        <button className="brand" onClick={() => goTo(0)} aria-label={content.nav.intro}>
          <span className="brand-symbol" aria-hidden="true">
            t<span>_</span>
          </span>
          <span className="mono">
            {content.brand}
            <span className="brand-version"> / 01</span>
          </span>
        </button>
        <div className="institution">
          <span>{content.institution}</span>
          <span className="mono">{content.program}</span>
        </div>
        <button
          className="fullscreen-button"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? content.nav.exitFullscreen : content.nav.fullscreen}
        >
          {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </header>
      {fullscreenError && (
        <div className="fullscreen-error" role="status">
          {content.nav.fullscreenError}
        </div>
      )}
      <main id="presentation" ref={mainRef}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            className="slide"
            key={index}
            custom={direction}
            variants={{
              initial: (d: number) => ({
                opacity: 0,
                y: reducedMotion ? 0 : d * 18,
              }),
              enter: { opacity: 1, y: 0 },
              exit: (d: number) => ({
                opacity: 0,
                y: reducedMotion ? 0 : d * -12,
              }),
            }}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
            onAnimationComplete={focusHeading}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="shell-footer">
        <div className="footer-left">
          <ProgressIndicator index={index} total={total} />
          <span className="keyboard-hint mono">
            <kbd>←</kbd>
            <kbd>→</kbd> {content.nav.keyboard}
          </span>
        </div>
        {slide.type !== 'intro' && (
          <NavigationControls next={next} previous={previous} index={index} total={total} />
        )}
      </footer>
    </div>
  );
}
