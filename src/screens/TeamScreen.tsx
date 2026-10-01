import { ArrowDownRight } from 'lucide-react';
import { content, team } from '../data/team';
import { MemberCard } from '../components/MemberCard';
export function TeamScreen({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <section className={`team-screen ${team.length > 4 ? 'team-screen--many' : ''}`}>
      <div className="screen-heading">
        <div>
          <p className="eyebrow mono">$ {content.dev.team.command}</p>
          <h1>{content.overview.title}</h1>
          <p className="screen-subtitle">{content.overview.subtitle}</p>
        </div>
        <span className="team-count mono">
          <span className="status-dot" />
          {String(team.length).padStart(2, '0')} {content.overview.people}
          <ArrowDownRight size={25} />
        </span>
      </div>
      <div className="member-grid" style={{ '--member-count': team.length } as React.CSSProperties}>
        {team.map((member, index) => (
          <MemberCard
            key={member.id}
            member={member}
            index={index}
            onOpen={() => onSelect(index)}
          />
        ))}
      </div>
      <div className="team-note">
        <span>
          <span className="tiny-cross">+</span>
          {content.dev.team.response}
        </span>
        <span className="mono">{content.sample}</span>
      </div>
    </section>
  );
}
