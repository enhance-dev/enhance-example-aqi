/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiRange({ html, state: { attrs } }) {
  const {
    label = 'AQI',
    percent = '0',
    value = '0',
  } = attrs

  return html`
    <input
      type="range"
      disabled
      min="0"
      max="100"
      value="${percent}"
    />

    <pre>${label}: ${value}</pre>
  `
}
