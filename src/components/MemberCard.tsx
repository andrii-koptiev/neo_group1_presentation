import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { content, type TeamMember } from '../data/team';
import { Avatar } from './Avatar';

export function MemberCard({
  member,
  index,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      className={`member-card accent-${member.accent}`}
      onClick={onOpen}
      aria-label={`${content.intro.enter} з ${member.name}`}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="card-top mono">
        <span>{String(index + 1).padStart(2, '0')} /</span>
        <span className="card-role">{member.role}</span>
        <ArrowUpRight size={19} />
      </div>
      <Avatar member={member} />
      <div className="card-copy">
        <h2>{member.name}</h2>
        <span className="card-location">
          <MapPin size={14} />
          {member.location}
        </span>
        <p>{member.intro}</p>
      </div>
      <div className="card-bottom mono">
        <span>{content.overview.cardAction}</span>
        <ArrowUpRight size={18} />
      </div>
    </motion.button>
  );
}
