import { ArrowDown, Check, Code2, Sparkles } from 'lucide-react';
import { content, team } from '../data/team';
export function TeamSummaryScreen() {
  const c = content.summary;
  return (
    <section className="summary-screen">
      <p className="eyebrow">{c.eyebrow}</p>
      <h1>{c.title}</h1>
      <div className="summary-layout">
        <div className="summary-people">
          <span className="summary-count">
            {String(team.length).padStart(2, '0')}
            <span className="title-dot">.</span>
          </span>
          <h2>{c.developers}</h2>
          <p>{c.countCaption}</p>
          <div className="summary-initials">
            {team.map((member) => (
              <span className={`accent-${member.accent}`} key={member.id}>
                {member.name.slice(0, 1)}
              </span>
            ))}
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
