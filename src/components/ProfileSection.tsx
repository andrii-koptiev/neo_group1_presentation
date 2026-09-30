import { profileSections, type TeamMember } from '../data/team';

export function ProfileSection({ member, index }: { member: TeamMember; index: number }) {
  const section = profileSections[index];
  return (
    <section className="profile-answer" aria-labelledby={`${member.id}-${section.key}`}>
      <div className="answer-heading">
        <span className="answer-number mono" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 id={`${member.id}-${section.key}`} className="answer-title">
          {section.title}
        </h2>
      </div>
      <p className="answer-copy">{member[section.key]}</p>
    </section>
  );
}
