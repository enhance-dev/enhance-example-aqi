export const SCALE = [
  { emoji: '🤩', color: 'limegreen', message: 'Great' },
  { emoji: '😊', color: 'gold', message: 'Good' },
  { emoji: '😐', color: 'orange', message: 'Moderate' },
  { emoji: '😣', color: 'red', message: 'Unhealthy' },
  { emoji: '😫', color: 'red', message: 'Unhealthy' },
  { emoji: '😷', color: 'purple', message: 'Very Unhealthy' },
  { emoji: '😷', color: 'purple', message: 'Very Unhealthy' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
  { emoji: '🥵', color: 'maroon', message: 'Hazardous' },
]
export const REAL_BAD = { emoji: '☠️', color: 'black', message: 'Hazardous' }
export const UNKNOWN = { emoji: '🤷', color: 'lightgray', message: 'Unknown' }

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
