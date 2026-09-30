import { ArrowRight } from 'lucide-react';
import { content } from '../data/team';

export function InitialLoader({ loaded, onEnter }: { loaded: number; onEnter: () => void }) {
  const steps = content.intro.loading.length;
  return (
    <section className="initial-loader">
      <p className="eyebrow">
        <span className="status-dot" />
        {content.intro.bootLabel}
      </p>
      <h1 aria-label={content.brand}>
        {content.brand}
        <span className="title-dot">.</span>
      </h1>
      <p className="loader-status mono" role="status">
        {content.intro.loading[loaded]}
        <span className="blink">_</span>
      </p>
      <div
        className="loader-track"
        role="progressbar"
        aria-label={content.intro.initializing}
        aria-valuemin={0}
        aria-valuemax={steps}
        aria-valuenow={loaded}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className={i < (loaded / steps) * 20 ? 'filled' : ''} />
        ))}
      </div>
      <button className="secondary-button" onClick={onEnter}>
        {content.intro.enter}
        <ArrowRight size={17} />
      </button>
      <p className="loader-hint">{content.intro.bootHint}</p>
    </section>
  );
}
