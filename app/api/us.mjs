import { getAqiForZip } from '../lib/aqi-data.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query: { zip } }) {
  if (!zip)
    return {} // just render the form

  if (zip.length !== 5 || !/^\d+$/.test(zip))
    return { status: 400, json: { error: "That zip code doesn't look right" } }

  let aqiData
  try {
    aqiData = await getAqiForZip(zip)
  } catch (error) {
    return { status: 500, json: { error: error.message } }
  }

  if (!aqiData)
    return { status: 404, json: { error: 'Not found' } }

  return { json: { aqiData } }
}
