/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiWidget({ html, state: { store } }) {
  // TODO: refactor like us-widget
  const { myAqi: { iqAir, airNow } } = store

  return html`
    <style>
      section {
        background: #fff;
        box-shadow: 0 0 0.1rem rgba(0,0,0,0.5);
      }
    </style>

    <h2 class="mbs2 text-center text1 font-bold" style="color: white;">Longmont, CO:</h2>

    <section class="flex flex-col gap1 p1 align-items-stretch radius1">
      <h2 class="text1 font-bold">Air Now (US EPA)</h2>

      <div class="flex flex-col gap-2">
        <aqi-stat parameter="Ozone" value="${airNow.O3.value}"></aqi-stat>
        <aqi-stat parameter="PM 2.5" value="${airNow.PM2_5.value}"></aqi-stat>
        <aqi-stat parameter="PM 10" value="${airNow.PM10.value}"></aqi-stat>
      </div>

      <p>${airNow.city}, ${airNow.state}</p>
      <time datetime="${airNow.updated}">${airNow.updated}</time>
    </section>

    <section class="flex flex-col gap1 p1 align-items-stretch radius1">
      <h2 class="text1 font-bold">IQ Air</h2>
      <aqi-stat parameter="${iqAir.parameter}" value="${iqAir.value}"></aqi-stat>
      <p>${iqAir.city}, ${iqAir.state}, ${iqAir.country}</p>
      <p>${iqAir.updated}</p>
    </section>
  `
}
