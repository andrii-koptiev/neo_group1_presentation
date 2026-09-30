import { ArrowLeft, ArrowRight } from 'lucide-react';
import { content } from '../data/team';
export function NavigationControls({
  next,
  previous,
  index,
  total,
}: {
  next: () => void;
  previous: () => void;
  index: number;
  total: number;
}) {
  return (
    <div className="navigation-controls">
      <button
        className="nav-arrow"
        onClick={previous}
        disabled={index === 0}
        aria-label={content.nav.previous}
      >
        <ArrowLeft size={20} />
      </button>
      <button
        className="nav-next"
        onClick={next}
        disabled={index === total - 1}
        aria-label={content.nav.next}
      >
        <span>{content.nav.next}</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
