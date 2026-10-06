import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSyncExternalStore, type CSSProperties, type PointerEvent } from 'react';
import { content, team } from '../data/team';
import { selectTeamTechnologies } from '../data/teamTechnologies';
import styles from './TechnologyOrbit.module.css';

const motionPreference = '(prefers-reduced-motion: reduce)';
const orbitLabels: Record<string, string> = {
  'Linux Administration': 'Linux',
  'Product Management': 'Product',
  'iOS SDK': 'iOS',
};
function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia(motionPreference);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export function TechnologyOrbit() {
  const reduced = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(motionPreference).matches,
    () => true,
  );
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 22 });
  const rotateX = useTransform(y, [-8, 8], [17, 3]);
  const rotateY = useTransform(x, [-8, 8], [-19, -5]);
  const technologies = selectTeamTechnologies(team, 12).map(
    (technology) => orbitLabels[technology] ?? technology,
  );

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 16);
  };

  return (
    <div
      className={styles.visual}
      onPointerMove={move}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className={styles.halo} aria-hidden="true" />
      <motion.div
        className={styles.scene}
        style={{ rotateX: reduced ? 10 : rotateX, rotateY: reduced ? -12 : rotateY }}
      >
        <div className={styles.platform} aria-hidden="true" />
        <div className={styles.rings} aria-hidden="true" />
        <motion.div
          className={styles.chip}
          style={{ x: reduced ? 0 : x, y: reduced ? 0 : y, z: 55 }}
          aria-hidden="true"
        >
          <div className={styles.chipBase} />
          <div className={styles.core}>
            <span>{content.visual.ai}</span>
            <span className="mono">{content.visual.human}</span>
          </div>
        </motion.div>
        <motion.ul
          className={styles.technologies}
          aria-label={content.intro.technologiesLabel}
          style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
        >
          {technologies.map((technology, index) => {
            const angle = (index / technologies.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <li
                key={technology}
                className={styles.position}
                style={
                  {
                    '--x': `${50 + Math.cos(angle) * 39}%`,
                    '--y': `${50 + Math.sin(angle) * 39}%`,
                  } as CSSProperties
                }
              >
                <motion.span
                  className={styles.badge}
                  initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : index * 0.045 }}
                  whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  {technology}
                </motion.span>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
      <p className={`${styles.caption} mono`}>{content.intro.technologiesLabel}</p>
    </div>
  );
}
