export function formatDelta(percentage) {
  if (percentage > 0) {
    return {
      text: `+${Math.round(percentage)}%`,
      class: 'text-green-600',
      icon: 'up'
    };
  } else if (percentage < 0) {
    return {
      text: `${Math.round(percentage)}%`,
      class: 'text-red-600',
      icon: 'down'
    };
  } else {
    return {
      text: '0%',
      class: 'text-slate-500',
      icon: 'flat'
    };
  }
}

export function getTrendIcon(icon) {
  switch (icon) {
    case 'up':
      return '↗';
    case 'down':
      return '↘';
    case 'flat':
    default:
      return '→';
  }
}
