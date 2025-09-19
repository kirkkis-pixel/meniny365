export function createSparkline(data, width, height, color) {
  if (!data || !Array.isArray(data) || data.length < 2) {
    return `<svg width="${width}" height="${height}"></svg>`;
  }

  // Ensure all values are numbers
  const numericData = data.map(val => typeof val === 'number' ? val : 0);
  
  const max = Math.max.apply(Math, numericData);
  const min = Math.min.apply(Math, numericData);

  // Handle case where all values are the same
  if (max === min) {
    const y = height / 2;
    const points = numericData.map((_, i) => {
      const x = (i / (numericData.length - 1)) * width;
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

  const points = numericData.map((value, i) => {
    const x = (i / (numericData.length - 1)) * width;
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
