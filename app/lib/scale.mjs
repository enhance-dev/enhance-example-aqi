const SCALE = [
  { emoji: '🤩', color: 'limegreen', message: 'Great!' },
  { emoji: '😊', color: 'gold', message: 'Good' },
  { emoji: '😐', color: 'orange', message: 'Moderate' },
  { emoji: '😣', color: 'firebrick', message: 'Unhealthy' },
  { emoji: '😫', color: 'firebrick', message: 'Unhealthy' },
  { emoji: '😷', color: 'purple', message: 'Very Unhealthy' },
  { emoji: '😷', color: 'purple', message: 'Very Unhealthy' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
]
const REAL_BAD = { emoji: '💀', color: 'black', message: 'Hazardous' }
const UNKNOWN = { emoji: '🤷', color: 'lightgray', message: 'Unknown' }

/**
 * @param {number} val
 * @param {number} max
 * @param {number} min
 * @returns {{emoji: string, color: string, message: string}}
 */
export function getStatus(val, max = 100, min = 0) {
  let status
  if (val >= max) status = REAL_BAD
  else {
    const index = Math.floor((val / (max - min)) * (SCALE.length - 1))
    status = SCALE[index]
  }
  if (!status) status = UNKNOWN
  return status
}
