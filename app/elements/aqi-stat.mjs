const SCALE = [
  { emoji:'🤩', message: 'Great' },
  { emoji:'😊', message: 'Good' },
  { emoji:'😐', message: 'Moderate' },
  { emoji:'😣', message: 'Unhealthy' },
  { emoji:'😫', message: 'Unhealthy' },
  { emoji:'😷', message: 'Very Unhealthy' },
  { emoji:'😷', message: 'Very Unhealthy' },
  { emoji:'🥵', message: 'Hazardous' },
  { emoji:'🥵', message: 'Hazardous' },
  { emoji:'🥵', message: 'Hazardous' },
  { emoji:'🥵', message: 'Hazardous' },
]
const REAL_BAD = { emoji: '💀', message: 'Hazardous' }
const UNKNOWN = { emoji: '🤷', message: 'Unknown' }

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiStat({ html, state: { attrs } }) {
  const {
    parameter,
    value,
    optimum = 50,
    low = 99,
    high = 200,
    min = 0,
    max = 500,
  } = attrs

  let status
  if (Number(value) > Number(max)) status = REAL_BAD
  else {
    const percentage = Number(value)/(Number(max) - Number(min))
    const index = Math.floor(percentage * (SCALE.length - 1))
    status = SCALE[index]
  }

  if (!status) status = UNKNOWN

  return html`
    <style>
      meter {
        width: 100%;
        height: 2rem;
      }
    </style>

    <div class="flex flex-row gap-1 justify-content-between">
      <div>${status.emoji} ${status.message}</div>
      <div>${parameter}: ${value}</div>
    </div>
    <meter
      min="${min.toString()}"
      max="${max.toString()}"
      optimum="${optimum.toString()}"
      low="${low.toString()}"
      high="${high.toString()}"
      value="${value.toString()}"
    >${value}</meter>
  `
}
