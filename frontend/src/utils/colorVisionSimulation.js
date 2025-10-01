/**
 * Color Vision Simulation Utilities
 * Simulates different types of color blindness using transformation matrices
 */

// Transformation matrices for different types of color blindness
const COLOR_BLINDNESS_MATRICES = {
  // Protanopia (red-blind) - affects ~1% of males
  protanopia: [
    0.567, 0.433, 0.0, 0, 0,
    0.558, 0.442, 0.0, 0, 0,
    0.0, 0.242, 0.758, 0, 0,
    0, 0, 0, 1, 0
  ],
  
  // Deuteranopia (green-blind) - affects ~1% of males
  deuteranopia: [
    0.625, 0.375, 0.0, 0, 0,
    0.7, 0.3, 0.0, 0, 0,
    0.0, 0.3, 0.7, 0, 0,
    0, 0, 0, 1, 0
  ],
  
  // Tritanopia (blue-blind) - very rare, affects ~0.001% of people
  tritanopia: [
    0.95, 0.05, 0.0, 0, 0,
    0.0, 0.433, 0.567, 0, 0,
    0.0, 0.475, 0.525, 0, 0,
    0, 0, 0, 1, 0
  ],
  
  // Protanomaly (red-weak)
  protanomaly: [
    0.817, 0.183, 0.0, 0, 0,
    0.333, 0.667, 0.0, 0, 0,
    0.0, 0.125, 0.875, 0, 0,
    0, 0, 0, 1, 0
  ],
  
  // Deuteranomaly (green-weak) - most common, affects ~5% of males
  deuteranomaly: [
    0.8, 0.2, 0.0, 0, 0,
    0.258, 0.742, 0.0, 0, 0,
    0.0, 0.142, 0.858, 0, 0,
    0, 0, 0, 1, 0
  ],
  
  // Tritanomaly (blue-weak)
  tritanomaly: [
    0.967, 0.033, 0.0, 0, 0,
    0.0, 0.733, 0.267, 0, 0,
    0.0, 0.183, 0.817, 0, 0,
    0, 0, 0, 1, 0
  ],
  
  // Achromatopsia (complete color blindness) - very rare
  achromatopsia: [
    0.299, 0.587, 0.114, 0, 0,
    0.299, 0.587, 0.114, 0, 0,
    0.299, 0.587, 0.114, 0, 0,
    0, 0, 0, 1, 0
  ],
  
  // Normal vision (no transformation)
  normal: [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 1, 0
  ]
};

/**
 * Apply color blindness filter to an image using canvas
 * @param {HTMLImageElement|HTMLCanvasElement} source - Source image or canvas
 * @param {string} type - Type of color blindness
 * @returns {HTMLCanvasElement} - Canvas with filter applied
 */
export function applyColorBlindnessFilter(source, type = 'normal') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to match source
  canvas.width = source.width || source.naturalWidth;
  canvas.height = source.height || source.naturalHeight;
  
  // Draw the source image
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Get transformation matrix
  const matrix = COLOR_BLINDNESS_MATRICES[type] || COLOR_BLINDNESS_MATRICES.normal;
  
  // Apply transformation to each pixel
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Apply matrix transformation
    data[i] = Math.min(255, Math.max(0, 
      matrix[0] * r + matrix[1] * g + matrix[2] * b + matrix[3] * 255 + matrix[4]
    ));
    data[i + 1] = Math.min(255, Math.max(0,
      matrix[5] * r + matrix[6] * g + matrix[7] * b + matrix[8] * 255 + matrix[9]
    ));
    data[i + 2] = Math.min(255, Math.max(0,
      matrix[10] * r + matrix[11] * g + matrix[12] * b + matrix[13] * 255 + matrix[14]
    ));
    // Alpha channel remains unchanged
  }
  
  // Put modified image data back
  ctx.putImageData(imageData, 0, 0);
  
  return canvas;
}

/**
 * Get CSS filter string for color blindness simulation
 * Note: This is an approximation and not as accurate as canvas-based transformation
 * @param {string} type - Type of color blindness
 * @returns {string} - CSS filter string
 */
export function getColorBlindnessCSSFilter(type = 'normal') {
  const filters = {
    protanopia: 'url(#protanopia-filter)',
    deuteranopia: 'url(#deuteranopia-filter)',
    tritanopia: 'url(#tritanopia-filter)',
    achromatopsia: 'grayscale(100%)',
    normal: 'none'
  };
  
  return filters[type] || filters.normal;
}

/**
 * Create SVG filter element for color blindness simulation
 * @param {string} type - Type of color blindness
 * @returns {string} - SVG filter definition
 */
export function createSVGColorBlindnessFilter(type) {
  const matrix = COLOR_BLINDNESS_MATRICES[type];
  if (!matrix) return '';
  
  return `
    <svg style="position: absolute; width: 0; height: 0;">
      <defs>
        <filter id="${type}-filter">
          <feColorMatrix type="matrix" values="
            ${matrix[0]} ${matrix[1]} ${matrix[2]} ${matrix[3]} ${matrix[4]}
            ${matrix[5]} ${matrix[6]} ${matrix[7]} ${matrix[8]} ${matrix[9]}
            ${matrix[10]} ${matrix[11]} ${matrix[12]} ${matrix[13]} ${matrix[14]}
            ${matrix[15]} ${matrix[16]} ${matrix[17]} ${matrix[18]} ${matrix[19]}
          "/>
        </filter>
      </defs>
    </svg>
  `;
}

/**
 * Get information about a color blindness type
 * @param {string} type - Type of color blindness
 * @returns {object} - Information about the condition
 */
export function getColorBlindnessInfo(type) {
  const info = {
    protanopia: {
      name: 'Protanopia',
      description: 'Red-blind. Difficulty distinguishing red from green.',
      prevalence: '~1% of males',
      affectedColors: ['Red', 'Orange', 'Yellow', 'Green']
    },
    deuteranopia: {
      name: 'Deuteranopia',
      description: 'Green-blind. Difficulty distinguishing red from green.',
      prevalence: '~1% of males',
      affectedColors: ['Red', 'Orange', 'Yellow', 'Green']
    },
    tritanopia: {
      name: 'Tritanopia',
      description: 'Blue-blind. Difficulty distinguishing blue from yellow.',
      prevalence: '~0.001% of people',
      affectedColors: ['Blue', 'Yellow', 'Violet', 'Green']
    },
    protanomaly: {
      name: 'Protanomaly',
      description: 'Red-weak. Reduced sensitivity to red light.',
      prevalence: '~1% of males',
      affectedColors: ['Red', 'Orange']
    },
    deuteranomaly: {
      name: 'Deuteranomaly',
      description: 'Green-weak. Most common form of color blindness.',
      prevalence: '~5% of males, ~0.4% of females',
      affectedColors: ['Green', 'Yellow', 'Orange']
    },
    tritanomaly: {
      name: 'Tritanomaly',
      description: 'Blue-weak. Reduced sensitivity to blue light.',
      prevalence: 'Very rare',
      affectedColors: ['Blue', 'Yellow']
    },
    achromatopsia: {
      name: 'Achromatopsia',
      description: 'Complete color blindness. Sees only in grayscale.',
      prevalence: '~0.003% of people',
      affectedColors: ['All colors']
    },
    normal: {
      name: 'Normal Vision',
      description: 'No color vision deficiency.',
      prevalence: 'Majority of population',
      affectedColors: []
    }
  };
  
  return info[type] || info.normal;
}

/**
 * Get all available color blindness types
 * @returns {Array} - Array of type keys
 */
export function getAvailableTypes() {
  return Object.keys(COLOR_BLINDNESS_MATRICES);
}

export default {
  applyColorBlindnessFilter,
  getColorBlindnessCSSFilter,
  createSVGColorBlindnessFilter,
  getColorBlindnessInfo,
  getAvailableTypes,
  COLOR_BLINDNESS_MATRICES
};
