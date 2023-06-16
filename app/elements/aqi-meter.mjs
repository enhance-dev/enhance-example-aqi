import { SCALE, REAL_BAD, UNKNOWN } from '../util/scale.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiMeter({ html, state: { attrs } }) {
  const { percent = '0' } = attrs
  const val = Math.min(Math.max(Number(percent), 0), 100)

  let status
  if (val >= 100) status = REAL_BAD
  else {
    const index = Math.floor((val / 100) * (SCALE.length - 1))
    status = SCALE[index]
  }
  if (!status) status = UNKNOWN

  const gaugeW = 120
  const gaugeH = gaugeW
  const radius = gaugeW * 0.4
  const arcLength = 270

  const strokeWidth = radius * 0.2
  const innerRadius = radius - strokeWidth / 2
  const circumference = innerRadius * 2 * Math.PI;
  const arc = circumference * (arcLength / 360);

  const dashArray = `${arc} ${circumference}`;
  const dashOffset = (arc - (val / 100) * arc).toString();

  const meterPathDraw = [
    `M ${gaugeW/2}, ${gaugeH/2}`,                     // move to center
    `m -${radius}, 0`,                                // move left
    `a ${radius},${radius} 0 1,1 ${radius * 2},0`,    // arc
    `a ${radius},${radius} 0 1,1 -${radius * 2},0 Z`, // arc
  ].join(' ')

  const gwStr = gaugeW.toString()
  const ghStr = gaugeH.toString()
  const trackWStr = strokeWidth.toString()
  const valWStr = (strokeWidth * 1.3).toString()
  const radiusStr = radius.toString()

  return html`
    <style>
      svg {
        height: ${ghStr}px;
        width: ${gwStr}px;
        display: block;
      }
      path.meter {
        transform-origin: 50% 50% 0;
        transform: rotate(-30deg); /* math? */
      }
    </style>

    <svg viewbox="0 0 ${gwStr} ${ghStr}">
      <path
        class="meter meter-track"
        d="${meterPathDraw}"
        stroke-dasharray="${dashArray}"
        stroke-dashoffset="0"
        stroke-width="${trackWStr}"
        stroke-linecap="round"
        fill="none"
        stroke="lightgray"
      />
      <path
        class="meter meter-value"
        d="${meterPathDraw}"
        stroke-dasharray="${dashArray}"
        stroke-dashoffset="${dashOffset}"
        stroke-width="${valWStr}"
        stroke-linecap="round"
        fill="none"
        stroke="${status.color}"
      />
      <text
        class="meter meter-emoji"
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="${radiusStr}px"
      >${status.emoji}</text>
    </svg>
  `
}
