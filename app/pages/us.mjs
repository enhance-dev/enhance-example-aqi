/** @type {import('@enhance/types').EnhanceElemFn} */
export default function UsWidget({ html, state: { store } }) {
  const { airNow, error } = store
  if (error) return html`${error.message}`

  return html`
    <main class="flex flex-col gap2 p1 align-items-center font-sans">
      <us-form></us-form>

      ${airNow && /*html*/`
        <section class="flex flex-col gap1 p1 align-items-center radius1">
          <h1 class="text1 font-bold">AirNow (US EPA)</h1>

          <div class="flex flex-col gap-2">
            ${airNow.parameters.map(d => /*html*/`
              <aqi-stat parameter="${d.parameter}" value="${d.value}"></aqi-stat>
            `).join('')}
          </div>

          <p>${airNow.city}, ${airNow.state}</p>
          <time datetime="${airNow.updated}">${airNow.updated}</time>
        </section>
      `}
    </main>

    <aqi-footer></aqi-footer>
  `
}
