import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitBranch, Lightbulb } from 'lucide-react';
import { content, team } from '../data/team';
import type { Slide } from '../hooks/usePresentationNavigation';
import styles from './SideNotes.module.css';

export function SideNotes({ slide, index }: { slide: Slide; index: number }) {
  const reducedMotion = useReducedMotion();
  const [idea, setIdea] = useState(index);
  const c = content.sideNotes;
  const context = c.screens[slide.type];
  const member = slide.type === 'member' ? team[slide.memberIndex] : undefined;
  const thought = c.thoughts[idea % c.thoughts.length];

  return (
    <aside className={`side-notes ${styles.notes}`} aria-label={c.label}>
      <motion.div
        className={`${styles.rail} ${styles.left}`}
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.35 }}
      >
        <GitBranch className={styles.branchIcon} size={25} aria-hidden="true" />
        <p className={`${styles.label} mono`}>{c.branchLabel}</p>
        <span className={styles.context}>{member?.name ?? context.label}</span>
        <code className={`${styles.command} mono`}>
          <span aria-hidden="true">$ </span>
          {context.command}
          {member?.id}
        </code>
        <p className={styles.caption}>{context.note}</p>
        <div className={styles.track} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </motion.div>

      <div className={`${styles.rail} ${styles.right}`}>
        <span className={`${styles.compactLoop} mono`} aria-hidden="true">
          {c.compactLoop}
        </span>
        <p className={`${styles.label} mono`}>{c.loopLabel}</p>
        <div className={styles.loop} aria-hidden="true">
          <span className={styles.bracket}>{'{'}</span>
          {c.loop.map((step) => (
            <code className="mono" key={step}>
              <span>{step}</span>();
            </code>
          ))}
          <span className={styles.bracket}>{'}'}</span>
        </div>
        <button
          className={`${styles.ideaButton} mono`}
          type="button"
          onClick={() => setIdea((current) => current + 1)}
          aria-label={c.ideaAction}
        >
          <Lightbulb size={15} aria-hidden="true" />
          <code>{c.ideaCommand}</code>
        </button>
        <div className={styles.thought} aria-live="polite" aria-atomic="true">
          <motion.p
            key={idea}
            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            {thought}
          </motion.p>
        </div>
      </div>
    </aside>
  );
}
