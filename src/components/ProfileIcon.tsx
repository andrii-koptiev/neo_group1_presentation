import {
  ArrowRight,
  Code2,
  HeartHandshake,
  Sparkles,
  Target,
  UserRound,
  Zap,
  type LucideProps,
} from 'lucide-react';
import type { profileSections } from '../data/team';

const icons = {
  person: UserRound,
  code: Code2,
  spark: Sparkles,
  target: Target,
  bolt: Zap,
  heart: HeartHandshake,
  arrow: ArrowRight,
};

export function ProfileIcon({
  icon,
  ...props
}: LucideProps & { icon: (typeof profileSections)[number]['icon'] }) {
  const Icon = icons[icon];
  return <Icon {...props} aria-hidden="true" />;
}
