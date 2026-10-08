import { featuredTechnologyNames, type TeamMember } from './team';

// Use recognizable technologies actually present in the team, without duplicates.
export function selectTeamTechnologies(members: Pick<TeamMember, 'technologies'>[], limit = 8) {
  const keyOf = (name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[\s.-]/g, '');
  const selected = new Map<string, string>();
  const counts = new Map<string, { name: string; count: number }>();
  const eligible = new Map(featuredTechnologyNames.map((name) => [keyOf(name), name]));
  const profiles = members.map((member) => ({
    technologies: [...new Set(member.technologies.map(keyOf))]
      .filter((key) => eligible.has(key))
      .map((key) => eligible.get(key)!),
  }));

  for (const member of profiles) {
    const seen = new Set<string>();
    for (const name of member.technologies) {
      const key = keyOf(name);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const entry = counts.get(key);
      counts.set(key, { name: entry?.name ?? name.trim(), count: (entry?.count ?? 0) + 1 });
    }
  }

  for (let round = 0; round < 2; round++) {
    for (const member of profiles) {
      // A shared primary technology should not hide another member's distinct skills.
      const name = member.technologies.find((name) => !selected.has(keyOf(name)))?.trim();
      if (name && selected.size < limit) selected.set(keyOf(name), counts.get(keyOf(name))!.name);
    }
  }
  for (const [key, entry] of [...counts].sort((a, b) => b[1].count - a[1].count)) {
    if (selected.size >= limit) break;
    selected.set(key, entry.name);
  }
  return [...selected.values()];
}
