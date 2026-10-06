import { MotionConfig } from 'framer-motion';
import { preload } from 'react-dom';
import { team } from './data/team';
import { usePresentationNavigation } from './hooks/usePresentationNavigation';
import { PresentationShell } from './components/PresentationShell';
import { IntroScreen } from './screens/IntroScreen';
import { TeamScreen } from './screens/TeamScreen';
import { MemberScreen } from './screens/MemberScreen';
import { FinalScreen } from './screens/FinalScreen';
export default function App() {
  // Fetch portraits during the intro so they are cached before the team is shown.
  for (const member of team) {
    if (member.image) preload(member.image, { as: 'image', fetchPriority: 'low' });
  }
  const nav = usePresentationNavigation();
  const slide = nav.slide;
  return (
    <MotionConfig reducedMotion="user">
      <PresentationShell {...nav}>
        {slide.type === 'intro' && <IntroScreen onEnter={nav.next} />}
        {slide.type === 'team' && <TeamScreen onSelect={nav.openMember} />}
        {slide.type === 'member' && (
          <MemberScreen memberIndex={slide.memberIndex} onOverview={() => nav.goTo(1)} />
        )}
        {slide.type === 'final' && <FinalScreen restart={() => nav.goTo(0)} />}
      </PresentationShell>
    </MotionConfig>
  );
}
