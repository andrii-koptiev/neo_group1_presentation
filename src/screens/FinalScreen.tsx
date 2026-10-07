import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Coffee, RotateCcw } from 'lucide-react';
import { content, team } from '../data/team';
import { DevNote } from '../components/DevNote';
import styles from './FinalScreen.module.css';

export function FinalScreen({ restart }: { restart: () => void }) {
  const c = content.final;
  const memberCount = team.length;
  const reducedMotion = useReducedMotion();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [coffeeReady, setCoffeeReady] = useState(false);
  const answer = c.questions[activeQuestion];

  useEffect(() => {
    const selectQuestion = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      if (
        (event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      const number = Number(event.key);
      if (Number.isInteger(number) && number >= 1 && number <= c.questions.length) {
        setActiveQuestion(number - 1);
      }
    };
    window.addEventListener('keydown', selectQuestion);
    return () => window.removeEventListener('keydown', selectQuestion);
  }, [c.questions.length]);

  return (
    <section className={styles.screen}>
      <header className={styles.intro}>
        <div>
          <p className="eyebrow">
            <span className="status-dot" />
            {c.eyebrow}
          </p>
          <h1>{c.title}</h1>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>
        <div className={styles.people} aria-label={`${memberCount} ${c.people}`}>
          <span className="summary-count">{String(memberCount).padStart(2, '0')}.</span>
          <span>{c.people}</span>
        </div>
      </header>

      <div className={styles.content}>
        <nav className={styles.questions} aria-label={c.answersLabel}>
          <p className={styles.questionHint}>{c.hint}</p>
          {c.questions.map((question, index) => (
            <button
              type="button"
              className={styles.question}
              data-team-question
              aria-pressed={activeQuestion === index}
              key={question.label}
              onClick={() => setActiveQuestion(index)}
            >
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.questionText}>{question.label}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ))}
        </nav>

        <div className={styles.answerPanel}>
          <span className={styles.answerLabel}>
            {c.answerLabel} / 0{activeQuestion + 1}
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuestion}
              className={styles.answer}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              aria-live="polite"
            >
              <h2>{answer.title}</h2>
              <p>{answer.answer}</p>
              <div className={styles.tags}>
                {answer.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={styles.questionProgress} aria-hidden="true">
            {c.questions.map((question, index) => (
              <span
                className={index === activeQuestion ? styles.active : ''}
                key={question.label}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.outro}>
        <div className={styles.nextStep}>
          <div>
            <span>{c.current}</span>
            <strong>{c.currentValue}</strong>
          </div>
          <ArrowRight size={20} aria-hidden="true" />
          <div>
            <span>{c.next}</span>
            <strong>{c.nextValue}</strong>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.coffee} mono`}
            type="button"
            aria-label={content.dev.coffeeLabel}
            aria-pressed={coffeeReady}
            onClick={() => setCoffeeReady(!coffeeReady)}
          >
            <Coffee size={15} aria-hidden="true" />
            {content.dev.coffeeCommand}
          </button>
          <button className={styles.restart} type="button" onClick={restart}>
            <RotateCcw size={17} aria-hidden="true" />
            {c.restart}
          </button>
        </div>
      </div>
      <div className={styles.footnote}>
        <DevNote {...content.dev.final} />
        <p role="status">{coffeeReady ? content.dev.coffeeResponse : c.footer}</p>
      </div>
    </section>
  );
}
