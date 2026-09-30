import { GraduationCap, RotateCcw, Sparkles } from 'lucide-react';
import { content } from '../data/team';
export function FinalScreen({ restart }: { restart: () => void }) {
  const c = content.final;
  return (
    <section className="final-screen">
      <p className="eyebrow">
        <span className="status-dot" />
        {c.eyebrow}
      </p>
      <h1>{c.title}</h1>
      <p className="screen-subtitle">{c.subtitle}</p>
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
      <p className="final-manifesto">{c.footer}</p>
      <button className="secondary-button" onClick={restart}>
        <RotateCcw size={17} />
        {c.restart}
      </button>
    </section>
  );
}
