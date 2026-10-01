import { useState } from 'react';
import { Coffee, GraduationCap, RotateCcw, Sparkles } from 'lucide-react';
import { content } from '../data/team';
import { DevNote } from '../components/DevNote';
export function FinalScreen({ restart }: { restart: () => void }) {
  const c = content.final;
  const [coffeeReady, setCoffeeReady] = useState(false);
  return (
    <section className="final-screen">
      <p className="eyebrow">
        <span className="status-dot" />
        {c.eyebrow}
      </p>
      <h1>{c.title}</h1>
      <p className="screen-subtitle">{c.subtitle}</p>
      <DevNote {...content.dev.final} />
      <div className="release-panel">
        <div className="release-header mono">
          <span>
            {content.brand} / {content.visual.release}
          </span>
          <Sparkles size={19} />
        </div>
        <div className="release-row">
          <span>{c.current}</span>
          <strong>{c.currentValue}</strong>
        </div>
        <div className="release-row release-row--active">
          <span>{c.installing}</span>
          <strong>
            {c.installingValue}
            <span className="blink">_</span>
          </strong>
        </div>
        <div className="install-track" aria-label={c.progress}>
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className={i < 18 ? 'installed' : ''} />
          ))}
        </div>
        <div className="release-next">
          <GraduationCap size={26} />
          <div>
            <span className="mono">{c.next}</span>
            <strong>{c.nextValue}</strong>
          </div>
          <span className="release-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
      <div className="coffee-break">
        <button
          className="coffee-button mono"
          aria-label={content.dev.coffeeLabel}
          aria-pressed={coffeeReady}
          onClick={() => setCoffeeReady(!coffeeReady)}
        >
          <Coffee size={15} aria-hidden="true" />
          {content.dev.coffeeCommand}
        </button>
        <p className="final-manifesto" role="status">
          {coffeeReady ? content.dev.coffeeResponse : c.footer}
        </p>
      </div>
      <button className="secondary-button" onClick={restart}>
        <RotateCcw size={17} />
        {c.restart}
      </button>
    </section>
  );
}
