import { getStatus } from '../lib/scale.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiMeter({ html, state: { attrs } }) {
  const { percent = '0', value = '0' } = attrs
  const val = Math.min(Math.max(Number(percent), 0), 100)
  const status = getStatus(val)

  const gaugeW = 120          // width px
  const gaugeH = gaugeW       // height px
  const radius = gaugeW * 0.4 // radius is 40% of box

  const strokeWidth = 10                     // stroke width px
  const circumference = radius * 2 * Math.PI // circumference px 🥧
  const arcL = circumference * (270 / 360)   // arc length px

  const dashArray = `${arcL} ${circumference}`              // two segments: arc, empty
  const dashOffset = (arcL - (val / 100) * arcL).toString() // meter fill

  const circlePath = [                                // draw a circle
    `M ${gaugeW / 2}, ${gaugeH / 2}`,                 // move to center
    `m -${radius}, 0`,                                // move left
    `a ${radius},${radius} 0 1,1 ${radius * 2},0`,    // half circle arc
    `a ${radius},${radius} 0 1,1 -${radius * 2},0 Z`, // finish circle
  ].join(' ')

  // strangs
  const gaugeWS = gaugeW.toString()
  const gaugeHS = gaugeH.toString()
  const radiusS = radius.toString()
  const trackWS = strokeWidth.toString()
  const valueWS = (strokeWidth * 1.3).toString()

  return html`
    <style>
      :host {
        display: block;
      }
      svg {
        height: ${gaugeHS}px;
        width: ${gaugeWS}px;
        display: block;
      }
      path.meter {
        transform-origin: 50% 50% 0;
        transform: rotate(-45deg);
      }
      text.meter-value {
        font-weight: 600;
      }
    </style>

    <svg viewbox="0 0 ${gaugeWS} ${gaugeHS}">
      <path
        class="meter meter-track"
        d="${circlePath}"
        stroke-dasharray="${dashArray}"
        stroke-dashoffset="0"
        stroke-width="${trackWS}"
        stroke-linecap="round"
        fill="none"
        stroke="lightgray"
      />
      <path
        class="meter meter-fill"
        d="${circlePath}"
        stroke-dasharray="${dashArray}"
        stroke-dashoffset="${dashOffset}"
        stroke-width="${valueWS}"
        stroke-linecap="round"
        fill="none"
        stroke="${status.color}"
      />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="${radiusS}px"
      >
        ${status.emoji}
      </text>
      <text
        class="meter-value "
        x="50%"
        y="90%"
        dominant-baseline="bottom"
        text-anchor="middle"
        font-size="${(radius / 2).toString()}px"
        fill="${status.color}"
      >
        ${value}
      </text>
    </svg>
  `
}
