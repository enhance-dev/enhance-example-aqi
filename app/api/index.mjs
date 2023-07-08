import { getAqiForZip } from '../lib/aqi-data.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function () {
  let aqiData
  try {
    aqiData = await getAqiForZip('80501')
  } catch (error) {
    return { status: 500, json: { error: error.message } }
  }

  if (!aqiData)
    return { status: 404, json: { error: 'Not found' } }

  return { json: { aqiData } }
}
