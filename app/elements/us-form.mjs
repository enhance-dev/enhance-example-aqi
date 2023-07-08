/** @type {import('@enhance/types').EnhanceElemFn} */
export default function UsForm({ html }) {
  return html`
    <style>
      :host {
        display: block;
      }
      input[type='number'] {
        width: 5rem;
      }
      input, button {
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        padding: 0.35rem;
      }
    </style>

    <section class="panel gap1 p0 radius1">
      <form class="flex gap1 align-items-center" action="/us" method="get">
        <label class="font-semibold" for="zip">US Zip:</label>
        <input name="zip" type="number" placeholder="10001" />
        <button type="submit">Get AQI</button>
      </form>
    </section>
  `
}
