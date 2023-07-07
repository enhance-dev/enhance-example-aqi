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
    <style>
      :host {
        display: block;
        width: 100%;
      }
      .message {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        color: white;
      }
      .parameter {
        color: gray;
      }
    </style>

    <div class="flex flex-row gap1 align-items-end justify-content-around">
      <aqi-meter percent="${percent.toString()}" value="${value}"></aqi-meter>

      <div class="stats flex flex-col gap-4 align-self-center align-items-end">
        <div class="message text1 font-bold" style="background-color: ${status.color}">${status.message}</div>
        <div class="parameter text0 font-bold">${friendlyParameter(parameter)}</div>
      </div>
    </div>
  `
}
