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

function friendlyParameter(parameter) {
  switch (parameter) {
  case 'O3': return 'Ozone'
  default: return parameter
  }
}

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
      .gauge {
        height: 85px;
        overflow: hidden;
        position: relative;
        width: 170px;
      }
      .gauge .arc {
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
      .gauge .indicator {
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
      .gauge .mask::before,
      .gauge .mask::after {
        background-image: radial-gradient(transparent 0, transparent 50%, #fff 50%, #fff 100%);
        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0% 100%);
        content: '';
        height: 18px;
        position: absolute;
        width: 18px;
      }
      .gauge .mask::before {
        left: -2px;
        bottom: 0;
      }
      .gauge .mask::after {
        bottom: 0;
        right: -2px;
      }
      .gauge .label {
        bottom: 5px;
        left: 0;
        position: absolute;
        text-align: center;
        width: 100%;
        font-size: 3.5rem;
      }
      .stats .value {
      }
      .stats .message {
      }
      .stats .parameter {
        color: gray;
      }
    </style>

    <div class="flex flex-row gap1 align-items-end justify-content-between">
      <div class="gauge">
        <div class="arc"></div>
        <div class="indicator"></div>
        <div class="mask"></div>
        <div class="label">${status.emoji}</div>
      </div>

      <div class="stats flex flex-col gap-5 align-items-end">
        <div class="value text-2 font-semibold">${value}</div>
        <div class="message text0 font-bold">${status.message}</div>
        <div class="parameter text-1 font-bold">${friendlyParameter(parameter)}</div>
      </div>
    </div>
  `
}

// this helped https://stackoverflow.com/questions/67235098/how-to-create-semi-circle-ellipse-with-html-css-like-a-gauge-speedometer
