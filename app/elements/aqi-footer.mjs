/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AqiFooter({ html }) {
  return html`
    <style>
      :host {
        color: aliceblue;
      }
      a {
        text-decoration: underline;
      }
    </style>
    <footer class="mbs1 font-sans">
      <p class="text-center text-1">
        <a href="/">Home</a> •
        <a href="/us">US</a>
      </p>
      <p class="mbs-1 text-center text-2">
        Inspired by
        <a href="https://breathable.app/" target="_blank">breathable.app</a>
      </p>
    </footer>
  `
}
