import { getStatus } from '../util/scale.mjs'

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
    value = '0',
    min = '0',
    max = '500',
  } = attrs

  const val = Number(value)
  const minVal = Number(min)
  const maxVal = Number(max)

  const percent = (val / (maxVal - minVal) * 100)

  let status = getStatus(percent)

  return html`
    <div class="flex flex-row gap1 align-items-end justify-content-between">
      <aqi-meter percent="${percent.toString()}"></aqi-meter>

      <div class="stats flex flex-col gap-5 align-items-end">
        <div class="value text-2 font-semibold">${value}</div>
        <div class="message text0 font-bold">${status.message}</div>
        <div class="parameter text-1 font-bold">${friendlyParameter(parameter)}</div>
      </div>
    </div>
  `
}
