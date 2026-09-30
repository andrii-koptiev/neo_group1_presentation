import { content } from '../data/team';
export function ProgressIndicator({ index, total }: { index: number; total: number }) {
  return (
    <div className="progress-indicator" aria-label={`${content.nav.slide} ${index + 1} / ${total}`}>
      <span className="mono">
        <strong>{String(index + 1).padStart(2, '0')}</strong>
        <span className="muted"> / {String(total).padStart(2, '0')}</span>
      </span>
      <div className="progress-track">
        <span style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
    </div>
  );
}
