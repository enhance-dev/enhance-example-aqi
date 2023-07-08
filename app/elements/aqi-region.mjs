/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiRegion({ html, state: { store } }) {
  const { aqiData, error } = store

  return html`
    ${error && /*html*/`
      <p style="color: yellow;"><strong>Error:</strong> "${error}"</p>
    `}

    ${aqiData && /*html*/`
      <section class="flex flex-col gap-3 p1 align-items-center radius1">
        <h1 class="text-center text1 font-bold">
          ${aqiData.city}, ${aqiData.state}
        </h1>

        <div class="mb0 flex flex-col gap-2">
          ${aqiData.parameters.map(d => /*html*/`
            <aqi-stat parameter="${d.parameter}" value="${d.value}"></aqi-stat>
          `).join('')}
        </div>

        <time datetime="${aqiData.updated}" class="text-1 font-bold">
          ${aqiData.updated}
        </time>
        <h4 class="text-1">AirNow (US EPA)</h4>
      </section>
    `}
  `
}
