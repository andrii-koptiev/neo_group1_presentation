import { content, profileSections, type TeamMember } from '../data/team';
import { Expand } from 'lucide-react';
import { ProfileIcon } from './ProfileIcon';

export function ProfileSection({
  member,
  index,
  onExpand,
}: {
  member: TeamMember;
  index: number;
  onExpand: (index: number) => void;
}) {
  const section = profileSections[index];
  return (
    <section
      className="profile-answer"
      data-section={section.key}
      aria-labelledby={`${member.id}-${section.key}`}
    >
      <div className="answer-code mono" aria-hidden="true">
        <span className="answer-number">{String(index + 1).padStart(2, '0')} //</span>
        {section.code}
      </div>
      <ProfileIcon icon={section.icon} className="answer-watermark" />
      <div className="answer-heading">
        <span className="answer-icon">
          <ProfileIcon icon={section.icon} />
        </span>
        <h2 id={`${member.id}-${section.key}`} className="answer-title">
          {section.title}
        </h2>
      </div>
      <p className="answer-copy">{member[section.key]}</p>
      <button
        className="answer-expand"
        aria-label={`${content.profile.expandSection} «${section.title}»`}
        aria-haspopup="dialog"
        onClick={() => onExpand(index)}
      >
        <Expand size={16} aria-hidden="true" />
      </button>
    </section>
  );
}
