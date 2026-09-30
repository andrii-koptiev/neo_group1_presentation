import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { content } from '../data/team';
import { InitialLoader } from '../components/InitialLoader';

export function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const reduced = useReducedMotion();
  const steps = content.intro.loading.length;
  const [loaded, setLoaded] = useState(reduced ? steps : 0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (reduced) {
      setLoaded(steps);
      return;
    }
    const timers = Array.from({ length: steps }, (_, i) =>
      window.setTimeout(() => setLoaded(i + 1), (content.intro.bootDurationMs / steps) * (i + 1)),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [reduced, steps]);
  useEffect(() => {
    if (loaded === steps) titleRef.current?.focus({ preventScroll: true });
  }, [loaded, steps]);

  if (loaded < steps) return <InitialLoader loaded={loaded} onEnter={onEnter} />;
  return (
    <section className="intro-screen">
      <div className="intro-copy">
        <p className="eyebrow">
          <span className="status-dot" />
          {content.intro.eyebrow}
        </p>
        <h1 ref={titleRef} tabIndex={-1} className="intro-title" aria-label={content.brand}>
          {content.brand.split('_')[0]}
          <span className="title-underscore">_</span>
          <span className="intro-os">{content.brand.split('_')[1]}</span>
          <span className="title-dot">.</span>
        </h1>
        <p className="intro-subtitle">{content.intro.subtitle}</p>
        <button className="primary-button" onClick={onEnter}>
          {content.intro.enter}
          <ArrowRight size={21} />
        </button>
      </div>
      <div className="intro-visual" aria-hidden="true">
        <div className="orbital orbital-one" />
        <div className="orbital orbital-two" />
        <div className="orbital orbital-three" />
        <div className="core-glow" />
        <div className="core">
          <span>{content.visual.ai}</span>
          <span className="mono">{content.visual.human}</span>
        </div>
        <span className="orbital-label orbital-label--two mono">{content.intro.tag}</span>
        <div className="orbit-dot orbit-dot--one" />
        <div className="orbit-dot orbit-dot--two" />
      </div>
    </section>
  );
}
