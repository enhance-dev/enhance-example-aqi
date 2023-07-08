import { getStatus } from '../lib/scale.mjs'

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

  const status = getStatus(percent)

  return html`
    <style>
      :host {
        display: block;
        width: 100%;
      }
    </style>

    <div class="flex flex-row gap1 align-items-end justify-content-between">
      <aqi-meter percent="${percent.toString()}" value="${value}"></aqi-meter>

      <div class="flex flex-col gap-4 align-self-center align-items-end">
        <h2 class="text-light text1 font-bold p-5 radius1" style="background-color: ${status.color}">${status.message}</h2>
        <h3 class="text-gray text0 font-bold">${friendlyParameter(parameter)}</h3>
      </div>
    </div>
  `
}
