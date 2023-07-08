import { getStyles } from '@enhance/arc-plugin-styles'

const { linkTag } = getStyles

export default function Head() {
  return /* html */`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="Enhance app w AQI data based on user IP or input, displayed as HTML custom elements, and cached w Dynamo">
      <title>Air Quality Index (AQ) in the US - powered by Enhance</title>
      ${linkTag()}
      <link rel="icon" href="https://fav.farm/😶‍🌫️">
      <style>
        body {
          background: var(--primary-800);
        }
        a {
          text-decoration: underline;
        }
        .panel {
          background: white;
          box-shadow: 0px 1px 1px rgba(3, 7, 18, 0.08),
            0px 5px 4px rgba(3, 7, 18, 0.06),
            0px 12px 9px rgba(3, 7, 18, 0.05),
            0px 20px 15px rgba(3, 7, 18, 0.03),
            0px 32px 24px rgba(3, 7, 18, 0.02);
        }
        .text-white {
          color: white;
        }
        .text-light {
          color: var(--light);
        }
        .text-gray {
          color: var(--secondary-500);
        }
        .text-warning {
          color: var(--warning-500);
        }
        .font-snazzy {
          font-family: ui-rounded, -apple-system, BlinkMacSystemFont, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif;
        }
      </style>
    </head>
`
}
