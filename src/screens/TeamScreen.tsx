import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Code2 } from 'lucide-react';
import { content, team, type TeamMember } from '../data/team';
import { MemberCard } from '../components/MemberCard';
import styles from './TeamScreen.module.css';

export function TeamScreen({ onSelect }: { onSelect: (index: number) => void }) {
  const [preview, setPreview] = useState<TeamMember | null>(null);
  const memberCount = team.length;
  const gridRef = useRef<HTMLUListElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const c = content.overview;
  const dev = content.dev.team;
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const update = () => setScrollable(grid.scrollHeight > grid.clientHeight + 1);
    const observer = new ResizeObserver(update);
    observer.observe(grid);
    update();
    return () => observer.disconnect();
  }, [memberCount]);
  return (
    <section className={`team-screen ${styles.screen}`}>
      <div className={styles.heading}>
        <div>
          <p className="eyebrow mono">$ {dev.command}</p>
          <h1>{c.title}</h1>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>
        <span className={styles.count}>
          <strong>{String(memberCount).padStart(2, '0')}</strong> {c.people}
        </span>
      </div>

      <ul
        ref={gridRef}
        className={`member-grid ${styles.grid}`}
        aria-label={c.rosterLabel}
        aria-describedby={scrollable ? 'team-scroll-hint' : undefined}
        tabIndex={0}
      >
        {team.map((member, index) => (
          <li className={styles.cell} key={member.id}>
            <MemberCard
              member={member}
              index={index}
              onOpen={() => onSelect(index)}
              onPreview={setPreview}
            />
          </li>
        ))}
      </ul>

      <div className={styles.note}>
        <div>
          <Code2 aria-hidden="true" size={18} />
          <span className={`${styles.command} mono`}>
            $ {preview ? `${dev.previewCommand}${preview.id}` : dev.command}
          </span>
          <span className={styles.response}>{preview ? dev.previewResponse : dev.response}</span>
        </div>
        <span className={styles.shared} id={scrollable ? 'team-scroll-hint' : undefined}>
          {scrollable ? (
            <>
              <ArrowDown size={16} aria-hidden="true" />
              {c.scrollHint}
            </>
          ) : (
            <>
              {memberCount} {c.note}
            </>
          )}
        </span>
      </div>
    </section>
  );
}
