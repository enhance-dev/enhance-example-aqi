import { getStatus } from '../util/scale.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiMeter({ html, state: { attrs } }) {
  const {
    value = '0',
    min = '0',
    max = '500',
  } = attrs

  const val = Number(value)
  const minVal = Number(min)
  const maxVal = Number(max)
  const status = getStatus(val, maxVal, minVal)

  return html`
    <style>
      :host {
        height: 85px;
        overflow: hidden;
        position: relative;
        width: 170px;
      }
      .arc {
        background-image:
          radial-gradient(white 0, white 60%, transparent 60%),
          conic-gradient(green 0deg, gold 35deg, orange 55deg, red 75deg, purple 110deg, maroon 135deg, maroon 170deg, black 180deg, white 360deg);
        background-position: center center, center center;
        background-repeat: no-repeat;
        background-size: 100% 100%, 100% 100%;
        border-radius: 50%;
        border-style: none;
        height: 170px;
        position: relative;
        transform: rotate(-90deg);
        width: 100%;
      }
      .indicator {
        background: white;
        border: 1px solid #999;
        border-radius: 999px;
        bottom: 0;
        content: '';
        height: 20px;
        left: 0;
        position: absolute;
        transform: rotate(135deg) translateX(13px) translateY(-10px);
        transform-origin: 85px 0;
        width: 20px;
      }
      .mask::before,
      .mask::after {
        background-image: radial-gradient(transparent 0, transparent 50%, #fff 50%, #fff 100%);
        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0% 100%);
        content: '';
        height: 18px;
        position: absolute;
        width: 18px;
      }
      .mask::before {
        left: -2px;
        bottom: 0;
      }
      .mask::after {
        bottom: 0;
        right: -2px;
      }
      .label {
        bottom: 5px;
        left: 0;
        position: absolute;
        text-align: center;
        width: 100%;
        font-size: 3.5rem;
      }
    </style>

    <div class="arc"></div>
    <div class="indicator"></div>
    <div class="mask"></div>
    <div class="label">${status.emoji}</div>
  `
}
