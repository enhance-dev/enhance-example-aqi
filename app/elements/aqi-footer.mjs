/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiFooter({ html }) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>

    <footer class="text-light font-sans">
      <nav class="text-center text0">
        <a href="/">Home</a> •
        <a href="/us">US</a>
      </nav>
      <aside class="mbs1 text-center text-1">
        Powered by
        <a href="https://enhance.dev/" target="_blank">Enhance</a>
      </aside>
      <aside class="mbs0 text-center text-2">
        Inspired by
        <a href="https://breathable.app/" target="_blank">breathable.app</a>
      </aside>
    </footer>
  `
}
