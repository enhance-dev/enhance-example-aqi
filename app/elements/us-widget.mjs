function css (more) {
  return /*html*/`
<style>
  section {
    background: #fff;
    box-shadow: 0 0 0.1rem rgba(0,0,0,0.5);
  }
  ${more || ''}
</style>`
}

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function UsWidget({ html, state: { store } }) {
  const { airNow, error } = store

  if (error) return html`${error.message}`
  else if (!airNow) return html`
    ${css(`
      input, button {
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        padding: 0.35rem;
      }
    `)}
    <section class="flex flex-col gap1 p1 radius1">
      <form class="flex gap1 align-items-center" method="get">
        <label for="zip">Enter a Zip Code:</label>
        <input class="border-solid" name="zip" type="number" placeholder="90210" />
        <button type="submit">Get AQI</button>
      </form>
    </section>
  `

  return html`
    ${css()}
    <section class="flex flex-col gap1 p1 align-items-stretch radius1">
      <h1 class="text1 font-bold">Air Now (US EPA)</h1>

      <div class="flex flex-col gap-2">
        ${airNow.parameters.map(d => `
          <aqi-stat parameter="${d.parameter}" value="${d.value}"></aqi-stat>
        `).join('')}
      </div>

      <p>${airNow.city}, ${airNow.state}</p>
      <time datetime="${airNow.updated}">${airNow.updated}</time>
    </section>
  `
}
