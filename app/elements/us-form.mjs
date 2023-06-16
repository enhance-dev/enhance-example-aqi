/** @type {import('@enhance/types').EnhanceElemFn} */
export default function UsForm({ html }) {
  return html`
    <style>
      input, button {
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        padding: 0.35rem;
      }
    </style>

    <section class="mbs1 flex flex-col gap1 p1 radius1">
      <form class="flex gap1 align-items-center" action="/us" method="get">
        <label for="zip">Enter a Zip Code:</label>
        <input class="border-solid" name="zip" type="number" placeholder="80501" />
        <button type="submit">Get AQI</button>
      </form>
    </section>
  `
}
