export function formatDelta(delta) {
  if (delta > 0) {
    return { text: `+${delta}%`, class: 'text-green-600', icon: 'up' };
  } else if (delta < 0) {
    return { text: `${delta}%`, class: 'text-red-600', icon: 'down' };
  } else {
    return { text: `0%`, class: 'text-slate-500', icon: 'stable' };
  }
}

export function getTrendIcon(iconType) {
  if (iconType === 'up') return '↗';
  if (iconType === 'down') return '↘';
  return '—';
}
