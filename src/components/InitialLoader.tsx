import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { content } from '../data/team';
import styles from './InitialLoader.module.css';

export function InitialLoader({ loaded, onEnter }: { loaded: number; onEnter: () => void }) {
  const steps = content.intro.loading.length;
  return (
    <section className={`initial-loader ${styles.loader}`}>
      <div className={styles.art} aria-hidden="true">
        <div className={styles.aura} />
        <div className={styles.ground} />
        <div className={styles.assembly}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`${styles.layer} ${index === 2 ? styles.topLayer : ''}`}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.18, ease: 'easeOut' }}
              style={{ z: index * 30 }}
            >
              {index === 2 && (
                <span>
                  t<span>_</span>
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <div className={styles.connection} />
      </div>
      <div className={styles.copy}>
        <p className="eyebrow">
          <span className="status-dot" />
          {content.intro.bootLabel}
        </p>
        <h1 aria-label={content.brand}>
          {content.brand.split('_')[0]}
          <span className={styles.gradient}>_{content.brand.split('_')[1]}</span>
          <span className="title-dot">.</span>
        </h1>
        <p className={`${styles.command} mono`}>$ {content.intro.bootCommand}</p>
        <motion.p
          className={`${styles.status} mono`}
          role="status"
          key={loaded}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {content.intro.loading[loaded]}
          <span className="blink">_</span>
        </motion.p>
        <div
          className={styles.track}
          role="progressbar"
          aria-label={content.intro.initializing}
          aria-valuemin={0}
          aria-valuemax={steps}
          aria-valuenow={loaded}
        >
          <motion.div
            className={styles.fill}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: content.intro.bootDurationMs / 1000, ease: 'linear' }}
          />
        </div>
        <div className={styles.modules} aria-hidden="true">
          {content.intro.bootModules.map((label, index) => (
            <div key={label} className={`${styles.module} ${index <= loaded ? styles.active : ''}`}>
              <span className={styles.moduleDot} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <button className="secondary-button" onClick={onEnter}>
          {content.intro.enter}
          <ArrowRight size={17} />
        </button>
        <p className={styles.hint}>{content.intro.bootHint}</p>
      </div>
    </section>
  );
}
