import { ArrowLeft, MapPin } from 'lucide-react';
import { content, profileSections, team } from '../data/team';
import { Avatar } from '../components/Avatar';
import { CodeAccent } from '../components/CodeAccent';
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
    <section className={`member-screen member-screen--snapshot accent-${member.accent}`}>
      <div className="member-top">
        <button className="text-button" onClick={onOverview}>
          <ArrowLeft size={15} />
          {content.profile.overview}
          <kbd>esc</kbd>
        </button>
        <span className="mono muted">
          {content.profile.label} / {String(memberIndex + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="profile-layout">
        <div className="profile-identity">
          <Avatar member={member} large />
          <div className="identity-caption">
            <h1 aria-label={member.name}>
              {member.name}
              <span className="title-dot">.</span>
            </h1>
            <p className="identity-role">{member.role}</p>
            <p className="identity-location">
              <MapPin size={15} />
              {member.location}
            </p>
          </div>
          <CodeAccent member={member} />
        </div>
        <div className="profile-content profile-snapshot">
          {profileSections.map((section, index) => (
            <ProfileSection key={section.key} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
