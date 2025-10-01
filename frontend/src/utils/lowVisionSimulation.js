/**
 * Low Vision Simulation Utilities
 * Simulates various low vision conditions including blur, cataracts, and magnification
 */

/**
 * Apply blur effect to simulate blurred vision
 * @param {HTMLImageElement|HTMLCanvasElement} source - Source image or canvas
 * @param {number} intensity - Blur intensity (0-20, default 5)
 * @returns {HTMLCanvasElement} - Canvas with blur applied
 */
export function applyBlurVision(source, intensity = 5) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = source.width || source.naturalWidth;
  canvas.height = source.height || source.naturalHeight;
  
  // Apply blur using CSS filter
  ctx.filter = `blur(${intensity}px)`;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Apply cataract simulation (blur + reduced contrast + yellowing)
 * @param {HTMLImageElement|HTMLCanvasElement} source - Source image or canvas
 * @param {number} severity - Severity level (0-1, default 0.5)
 * @returns {HTMLCanvasElement} - Canvas with cataract effect
 */
export function applyCataractVision(source, severity = 0.5) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = source.width || source.naturalWidth;
  canvas.height = source.height || source.naturalHeight;
  
  // Draw source image
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Apply cataract effects
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Add yellow tint
    const yellowTint = severity * 50;
    data[i] = Math.min(255, r + yellowTint);
    data[i + 1] = Math.min(255, g + yellowTint * 0.8);
    data[i + 2] = Math.max(0, b - yellowTint * 0.5);
    
    // Reduce contrast
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const contrastReduction = severity * 0.5;
    data[i] = data[i] + (avg - data[i]) * contrastReduction;
    data[i + 1] = data[i + 1] + (avg - data[i + 1]) * contrastReduction;
    data[i + 2] = data[i + 2] + (avg - data[i + 2]) * contrastReduction;
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Apply blur
  const blurCanvas = document.createElement('canvas');
  const blurCtx = blurCanvas.getContext('2d');
  blurCanvas.width = canvas.width;
  blurCanvas.height = canvas.height;
  blurCtx.filter = `blur(${severity * 8}px)`;
  blurCtx.drawImage(canvas, 0, 0);
  
  return blurCanvas;
}

/**
 * Apply contrast reduction to simulate low contrast sensitivity
 * @param {HTMLImageElement|HTMLCanvasElement} source - Source image or canvas
 * @param {number} reduction - Contrast reduction (0-1, default 0.5)
 * @returns {HTMLCanvasElement} - Canvas with reduced contrast
 */
export function applyLowContrast(source, reduction = 0.5) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = source.width || source.naturalWidth;
  canvas.height = source.height || source.naturalHeight;
  
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  const factor = 1 - reduction;
  const intercept = 128 * reduction;
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * factor + intercept;
    data[i + 1] = data[i + 1] * factor + intercept;
    data[i + 2] = data[i + 2] * factor + intercept;
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Apply tunnel vision effect (peripheral vision loss)
 * @param {HTMLImageElement|HTMLCanvasElement} source - Source image or canvas
 * @param {number} radius - Radius of clear vision (0-1, default 0.3)
 * @returns {HTMLCanvasElement} - Canvas with tunnel vision effect
 */
export function applyTunnelVision(source, radius = 0.3) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = source.width || source.naturalWidth;
  canvas.height = source.height || source.naturalHeight;
  
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  
  // Create radial gradient for vignette effect
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
  const clearRadius = maxRadius * radius;
  
  const gradient = ctx.createRadialGradient(
    centerX, centerY, clearRadius,
    centerX, centerY, maxRadius
  );
  
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Apply macular degeneration effect (central vision loss)
 * @param {HTMLImageElement|HTMLCanvasElement} source - Source image or canvas
 * @param {number} radius - Radius of affected area (0-1, default 0.2)
 * @returns {HTMLCanvasElement} - Canvas with macular degeneration effect
 */
export function applyMacularDegeneration(source, radius = 0.2) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = source.width || source.naturalWidth;
  canvas.height = source.height || source.naturalHeight;
  
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
  const affectedRadius = maxRadius * radius;
  
  // Create gradient for central blur
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, affectedRadius
  );
  
  gradient.addColorStop(0, 'rgba(200, 200, 200, 0.8)');
  gradient.addColorStop(0.7, 'rgba(200, 200, 200, 0.3)');
  gradient.addColorStop(1, 'rgba(200, 200, 200, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Apply diabetic retinopathy effect (spots and blurred areas)
 * @param {HTMLImageElement|HTMLCanvasElement} source - Source image or canvas
 * @param {number} severity - Severity level (0-1, default 0.5)
 * @returns {HTMLCanvasElement} - Canvas with diabetic retinopathy effect
 */
export function applyDiabeticRetinopathy(source, severity = 0.5) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = source.width || source.naturalWidth;
  canvas.height = source.height || source.naturalHeight;
  
  // Apply blur first
  ctx.filter = `blur(${severity * 3}px)`;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  ctx.filter = 'none';
  
  // Add dark spots
  const spotCount = Math.floor(severity * 50);
  for (let i = 0; i < spotCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 20 + 5;
    const opacity = Math.random() * 0.5 + 0.2;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, `rgba(50, 0, 0, ${opacity})`);
    gradient.addColorStop(1, 'rgba(50, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
  }
  
  return canvas;
}

/**
 * Get CSS filter string for low vision simulation
 * @param {string} type - Type of low vision condition
 * @param {number} intensity - Intensity level
 * @returns {string} - CSS filter string
 */
export function getLowVisionCSSFilter(type, intensity = 0.5) {
  const filters = {
    blur: `blur(${intensity * 10}px)`,
    lowContrast: `contrast(${1 - intensity * 0.5})`,
    cataract: `blur(${intensity * 5}px) contrast(${1 - intensity * 0.3}) sepia(${intensity * 0.5})`,
    brightness: `brightness(${1 - intensity * 0.5})`,
    normal: 'none'
  };
  
  return filters[type] || filters.normal;
}

/**
 * Get information about a low vision condition
 * @param {string} type - Type of low vision condition
 * @returns {object} - Information about the condition
 */
export function getLowVisionInfo(type) {
  const info = {
    blur: {
      name: 'Blurred Vision',
      description: 'General blur that can result from uncorrected refractive errors.',
      prevalence: 'Very common',
      characteristics: ['Reduced sharpness', 'Difficulty reading small text']
    },
    cataract: {
      name: 'Cataracts',
      description: 'Clouding of the eye lens causing blurred and yellowed vision.',
      prevalence: 'Common in older adults',
      characteristics: ['Blurred vision', 'Yellow tint', 'Reduced contrast', 'Glare sensitivity']
    },
    tunnelVision: {
      name: 'Tunnel Vision',
      description: 'Loss of peripheral vision, often from glaucoma or retinitis pigmentosa.',
      prevalence: 'Affects ~3% of people over 40',
      characteristics: ['Peripheral vision loss', 'Narrow field of view']
    },
    macularDegeneration: {
      name: 'Macular Degeneration',
      description: 'Loss of central vision affecting reading and face recognition.',
      prevalence: 'Leading cause of vision loss in people over 50',
      characteristics: ['Central vision loss', 'Blurred central area', 'Difficulty reading']
    },
    diabeticRetinopathy: {
      name: 'Diabetic Retinopathy',
      description: 'Damage to retinal blood vessels causing spots and blurred vision.',
      prevalence: 'Affects ~1/3 of people with diabetes',
      characteristics: ['Dark spots', 'Blurred areas', 'Floaters']
    },
    lowContrast: {
      name: 'Low Contrast Sensitivity',
      description: 'Difficulty distinguishing objects from backgrounds.',
      prevalence: 'Common with aging',
      characteristics: ['Reduced contrast perception', 'Difficulty in low light']
    }
  };
  
  return info[type] || {};
}

/**
 * Create magnifying glass effect
 * @param {HTMLCanvasElement} canvas - Canvas to apply magnification to
 * @param {number} x - X coordinate of magnifier center
 * @param {number} y - Y coordinate of magnifier center
 * @param {number} radius - Radius of magnifier
 * @param {number} zoom - Zoom level (default 2)
 */
export function applyMagnifier(canvas, x, y, radius = 100, zoom = 2) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Create temporary canvas for magnified area
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.putImageData(imageData, 0, 0);
  
  // Draw magnified circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();
  
  const sourceX = x - radius / zoom;
  const sourceY = y - radius / zoom;
  const sourceSize = (radius * 2) / zoom;
  
  ctx.drawImage(
    tempCanvas,
    sourceX, sourceY, sourceSize, sourceSize,
    x - radius, y - radius, radius * 2, radius * 2
  );
  
  ctx.restore();
  
  // Draw magnifier border
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

export default {
  applyBlurVision,
  applyCataractVision,
  applyLowContrast,
  applyTunnelVision,
  applyMacularDegeneration,
  applyDiabeticRetinopathy,
  getLowVisionCSSFilter,
  getLowVisionInfo,
  applyMagnifier
};
