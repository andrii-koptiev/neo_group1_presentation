import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { content, type TeamMember } from '../data/team';
import { Avatar } from './Avatar';
import { selectTeamTechnologies } from '../data/teamTechnologies';
import styles from './MemberCard.module.css';

export function MemberCard({
  member,
  index,
  onOpen,
  onPreview,
}: {
  member: TeamMember;
  index: number;
  onOpen: () => void;
  onPreview: (member: TeamMember | null) => void;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      className={`member-card accent-${member.accent} ${styles.card}`}
      onClick={onOpen}
      onFocus={() => onPreview(member)}
      onBlur={() => onPreview(null)}
      onPointerEnter={() => onPreview(member)}
      onPointerLeave={() => onPreview(null)}
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType === 'touch') return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      }}
      aria-label={`${content.intro.enter} з ${member.name}`}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      whileTap={reducedMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.top} aria-hidden="true">
        <span className={`${styles.number} mono`}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.open}>
          <ArrowUpRight size={19} />
        </span>
      </div>
      <div className={styles.portrait}>
        <Avatar member={member} />
      </div>
      <div className={styles.copy}>
        <h2>{member.name}</h2>
        <p className={styles.role}>{member.role}</p>
        <span className={styles.location}>
          <MapPin size={14} />
          {member.location}
        </span>
      </div>
      <div className={styles.bottom}>
        <div className={`${styles.technologies} mono`}>
          {selectTeamTechnologies([member], 2).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
