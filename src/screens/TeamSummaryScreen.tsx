import { ArrowDown, Check, Code2, Sparkles } from 'lucide-react';
import { content, getTeamRoster, team } from '../data/team';
import { DevNote } from '../components/DevNote';
export function TeamSummaryScreen() {
  const c = content.summary;
  const roster = getTeamRoster();
  return (
    <section className="summary-screen">
      <p className="eyebrow">{c.eyebrow}</p>
      <h1>{c.title}</h1>
      <DevNote {...content.dev.summary} />
      <div className="summary-layout">
        <div className="summary-people">
          <span className="summary-count">
            {String(roster.total).padStart(2, '0')}
            <span className="title-dot">.</span>
          </span>
          <h2>{c.people}</h2>
          <p>{c.countCaption}</p>
          <div className="summary-initials">
            {team.map((member) => (
              <span className={`accent-${member.accent}`} key={member.id}>
                {member.name.slice(0, 1)}
              </span>
            ))}
            {roster.pending.length > 0 && (
              <span aria-label={`${roster.pending.length} — ${content.overview.pending}`}>
                +{roster.pending.length}
              </span>
            )}
          </div>
        </div>
        <div className="summary-values">
          <div>
            <h2 className="mono">{c.different}</h2>
            {c.differences.map((value) => (
              <p key={value}>
                <span className="value-dash">/</span>
                {value}
              </p>
            ))}
          </div>
          <div>
            <h2 className="mono">{c.shared}</h2>
            {c.common.map((value) => (
              <p key={value}>
                <Check size={17} />
                {value}
              </p>
            ))}
          </div>
        </div>
        <div className="upgrade-panel">
          <div className="upgrade-stage">
            <Code2 size={22} />
            <span className="eyebrow">{c.current}</span>
            <h2>{c.currentValue}</h2>
          </div>
          <div className="upgrade-connector">
            <span />
            <ArrowDown size={25} />
            <span />
          </div>
          <div className="upgrade-stage upgrade-stage--next">
            <Sparkles size={24} />
            <span className="eyebrow">{c.upgrading}</span>
            <h2>{c.nextValue}</h2>
            <div className="upgrade-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
