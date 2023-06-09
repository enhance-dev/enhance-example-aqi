import { getStyles } from '@enhance/arc-plugin-styles'

const { linkTag } = getStyles

export default function Head () {
  return /* html */`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      ${linkTag()}
      <link rel="icon" href="/_public/favicon.svg">
      <style>
        body {
          background: rgb(131,58,180);
          background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 75%, rgba(252,176,69,1) 100%);
        }
      </style>
    </head>
`
}
