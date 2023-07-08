/** @type {import('@enhance/types').EnhanceElemFn} */
export default function UsForm({ html }) {
  return html`
    <style>
      :host {
        display: block;
      }
      input, button {
        border: 1px solid var(--secondary-100);
        border-radius: 0.25rem;
        padding: 0.35rem;
      }
      input[inputmode="numeric"] {
        width: 5.5rem;
      }
      button {
        padding: 0.455rem 0.65rem;
        color: var(--light);
        background: var(--primary-600);
      }
      input[type="search"]::-webkit-search-decoration,
      input[type="search"]::-webkit-search-cancel-button,
      input[type="search"]::-webkit-search-results-button,
      input[type="search"]::-webkit-search-results-decoration {
        -webkit-appearance:none;
      }
    </style>

    <section class="panel gap1 p0 radius1">
      <form class="flex gap1 align-items-center" action="/us" method="get">
        <label class="font-semibold" for="zip">US Zip:</label>
        <input
          class="text-center"
          type="search"
          required
          name="zip"
          placeholder="90210"
          inputmode="numeric"
          autocomplete="off"
          pattern="[0-9]{5}"
          oninvalid="setCustomValidity('5 digit zip code')"
          oninput="setCustomValidity('')"
        >
        <button class="font-medium" type="submit">Get AQI</button>
      </form>
    </section>
  `
}
