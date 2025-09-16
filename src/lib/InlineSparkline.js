export function createSparkline(data, width, height, color) {
  if (!data || data.length < 2) {
    return `<svg width="${width}" height="${height}"></svg>`;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * height;
    return `${x},${y}`;
  }).join(' ');

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <polyline 
        fill="none" 
        stroke="${color}" 
        stroke-width="2" 
        points="${points}" 
      />
    </svg>
  `;
}
