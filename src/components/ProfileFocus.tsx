import { useEffect, useRef, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { content, profileSections, type TeamMember } from '../data/team';
import { ProfileIcon } from './ProfileIcon';
import './ProfileFocus.css';

export function ProfileFocus({
  member,
  index,
  onChange,
  onClose,
}: {
  member: TeamMember;
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reducedMotion = useReducedMotion();
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current!;
    const returnFocus = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      returnFocus?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const activeIndex = index ?? 0;
  const section = profileSections[activeIndex];
  const change = (target: number) =>
    onChange(Math.max(0, Math.min(profileSections.length - 1, target)));
  const handleKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    // Keep shortcuts and keyboard focus inside the modal.
    event.stopPropagation();
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Tab') {
      const controls = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'ArrowRight':
        event.preventDefault();
        change(activeIndex + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        change(activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        change(0);
        break;
      case 'End':
        event.preventDefault();
        change(profileSections.length - 1);
        break;
      case ' ':
        if (!(event.target as HTMLElement).closest('button')) {
          event.preventDefault();
          change(activeIndex + 1);
        }
        break;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`profile-focus accent-${member.accent}`}
      aria-labelledby="profile-focus-title"
      aria-describedby="profile-focus-answer"
      onKeyDown={handleKey}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      {isOpen && (
        <div className="focus-panel">
          <header className="focus-header">
            <span className="focus-member">
              {member.name}
              <span className="title-dot">.</span>
            </span>
            <button
              className="focus-close"
              aria-label={content.profile.closeSection}
              onClick={onClose}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </header>
          <div className="focus-content">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.18 }}
              >
                <div className="focus-section-label mono">
                  <ProfileIcon icon={section.icon} size={22} />
                  {String(activeIndex + 1).padStart(2, '0')} // {content.profile.sectionLabel}
                </div>
                <h2 id="profile-focus-title">{section.title}</h2>
                <p className="focus-question">{section.question}</p>
                <p id="profile-focus-answer" className="focus-answer">
                  {member[section.key]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <footer className="focus-footer">
            <span className="focus-hint mono">{content.profile.focusHint}</span>
            <div className="focus-navigation">
              <button
                aria-label={content.profile.previousSection}
                disabled={activeIndex === 0}
                onClick={() => change(activeIndex - 1)}
              >
                <ArrowLeft size={21} aria-hidden="true" />
              </button>
              <span className="mono" aria-live="polite">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(profileSections.length).padStart(2, '0')}
              </span>
              <button
                aria-label={content.profile.nextSection}
                disabled={activeIndex === profileSections.length - 1}
                onClick={() => change(activeIndex + 1)}
              >
                <ArrowRight size={21} aria-hidden="true" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </dialog>
  );
}
