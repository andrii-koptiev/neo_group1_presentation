import { motion } from 'framer-motion';
import { FileJson } from 'lucide-react';
import { content, type TeamMember } from '../data/team';
export function CodeAccent({ member }: { member: TeamMember }) {
  return (
    <motion.div
      className="code-accent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
    >
      <div className="code-title mono">
        <FileJson size={14} />
        {content.profile.codeFile}
        <span className="status-dot" />
      </div>
      <pre>
        <code>
          <span className="code-punctuation">{'{\n'}</span>
          {[
            ['name', member.name],
            ['role', member.role],
            ['currentUpgrade', content.profile.upgrade],
            ['status', content.profile.status],
          ].map(([key, value], i) => (
            <span key={key}>
              {'  '}
              <span className="code-key">{JSON.stringify(key)}</span>:{' '}
              <span className="code-value">{JSON.stringify(value)}</span>
              {i < 3 ? ',' : ''}
              {'\n'}
            </span>
          ))}
          <span className="code-punctuation">{'}'}</span>
        </code>
      </pre>
    </motion.div>
  );
}
