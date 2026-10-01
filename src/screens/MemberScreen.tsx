import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { content, team } from '../data/team';
import { Avatar } from '../components/Avatar';
import { ProfileSection } from '../components/ProfileSection';

export function MemberScreen({
  memberIndex,
  onOverview,
}: {
  memberIndex: number;
  onOverview: () => void;
}) {
  const member = team[memberIndex];

  return (
    <section className={`member-screen member-card-page accent-${member.accent}`}>
      <div className="member-top">
        <button className="text-button" onClick={onOverview}>
          <ArrowLeft size={15} />
          {content.profile.overview}
          <kbd>esc</kbd>
        </button>
        <span className="mono muted">
          <span className="profile-branch">
            {content.dev.profileBranch}
            {member.id}
          </span>
          {' / '}
          {String(memberIndex + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="member-hero">
        <div className="member-hero-copy">
          <p className="member-command mono">$ {content.dev.profileCommand}</p>
          <h1 aria-label={member.name}>
            {member.name}
            <span className="title-dot">.</span>
          </h1>
          <p className="member-role">{member.role}</p>
          <p className="member-location">
            <MapPin size={15} />
            {member.location}
          </p>
          <div className="member-tags" aria-label={content.profile.technologiesLabel}>
            {member.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
        <div className="profile-identity">
          <Avatar member={member} large />
        </div>
      </div>

      <div className="member-journey" aria-label="Професійний шлях">
        <div>
          <span className="mono">ДО NEOVERSITY</span>
          <strong>{member.role}</strong>
        </div>
        <span className="journey-line">
          <ArrowRight size={14} />
        </span>
        <div>
          <span className="mono">ЗАРАЗ</span>
          <strong>Neoversity · AI / ML</strong>
        </div>
        <span className="journey-line">
          <ArrowRight size={14} />
        </span>
        <div>
          <span className="mono">ДАЛІ</span>
          <strong>AI / ML</strong>
        </div>
      </div>

      <div className="member-card-content">
        <div className="member-story">
          <ProfileSection member={member} index={0} />
          <ProfileSection member={member} index={1} />
        </div>
        <div className="member-details">
          {[2, 3, 4, 5].map((index) => (
            <ProfileSection key={index} member={member} index={index} />
          ))}
        </div>
        <div className="member-future">
          <ProfileSection member={member} index={6} />
          <ArrowRight className="member-future-arrow" size={30} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
