import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  command: string;
  response: string;
}

export function DevNote({ command, response }: Props) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="dev-note">
      <div className="dev-command mono">
        <span className="dev-prompt" aria-hidden="true">
          $
        </span>
        <code>{command}</code>
      </div>
      <motion.p
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.15 }}
      >
        <span aria-hidden="true">↳ </span>
        {response}
      </motion.p>
    </div>
  );
}
