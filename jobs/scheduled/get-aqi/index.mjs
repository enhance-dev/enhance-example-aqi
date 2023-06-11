import process from 'node:process'
import data from '@begin/data'

const {
  MY_LAT = 40.1680173,
  MY_LON = 105.1390536,
  IQAIR_KEY,
  AIRNOW_KEY,
} = process.env
const IQAIR_URL = `https://api.airvisual.com/v2/nearest_city?lat=${MY_LAT}&lon=-${MY_LON}&key=${IQAIR_KEY}`
const AIRNOW_URL = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${MY_LAT}&longitude=-${MY_LON}&distance=25&API_KEY=${AIRNOW_KEY}`

export async function handler() {
  let iqAirData
  let airNowData

  try {
    const iqAirResponse = await fetch(IQAIR_URL)
    iqAirData = await iqAirResponse.json()
  } catch (error) {
    console.log('iqAir error', error)
  }

  try {
    const airNowResponse = await fetch(AIRNOW_URL)
    airNowData = await airNowResponse.json()
  } catch (error) {
    console.log('airNow error', error)
  }

  const saved = await data.set({
    table: 'aqi',
    key: 'my-aqi',
    iqAirData,
    airNowData,
  })

  console.log('saved', saved.key)

  return
}
