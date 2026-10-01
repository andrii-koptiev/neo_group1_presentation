import { useState } from 'react';
import { content, type TeamMember } from '../data/team';

export function Avatar({ member, large = false }: { member: TeamMember; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`avatar avatar--${member.accent} ${large ? 'avatar--large' : ''} ${member.image && !failed && member.imageStyle === 'cutout' ? 'avatar--cutout' : ''}`}
    >
      {member.image && !failed ? (
        <img
          src={member.image}
          alt={member.imageAlt ?? member.name}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="avatar-art" aria-hidden="true">
          <div className="avatar-orbit" />
          <div className="avatar-orbit avatar-orbit--two" />
          <div className="avatar-body" />
          <div className="avatar-head" />
          <div className="avatar-light" />
          <span className="avatar-initial">{member.name.slice(0, 1)}</span>
        </div>
      )}
      <span className="avatar-cross avatar-cross--top" aria-hidden="true">
        +
      </span>
      <span className="avatar-cross avatar-cross--bottom" aria-hidden="true">
        +
      </span>
      <div className="avatar-caption mono" aria-hidden="true">
        <span>{member.id.toUpperCase()}_</span>
        <span>{content.visual.avatarLabel}</span>
      </div>
    </div>
  );
}
