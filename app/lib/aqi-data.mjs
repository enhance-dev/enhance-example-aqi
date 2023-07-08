import process from 'node:process'
import data from '@begin/data'

const { AIRNOW_KEY } = process.env

/**
 * @param {string} zip
 * @returns {Promise<AqiData>}
 */
export async function getAqiForZip(zip) {
  if (!zip)
    throw new Error('Zip code required')

  // check cache
  const cacheKey = `zip#${zip}`
  const cached = await data.get({ table: 'aqi', key: cacheKey })

  if (cached?.airNowData) {
    console.log(`Zip ${zip} found in cache`)
    // @ts-ignore
    return cached.airNowData
  }

  // fetch data
  const url = [
    'https://www.airnowapi.org/aq/observation/zipCode/current/',
    '?format=application/json&API_KEY=',
    AIRNOW_KEY,
    '&distance=25&zipCode=',
    zip
  ].join('')

  const response = await fetch(url)
  const responseData = await response.json()

  if (responseData.WebServiceError)
    throw new Error(responseData.WebServiceError)
  else if (Array.isArray(responseData) && responseData.length > 0) {
    const airNowData = {}
    const firstD = responseData[0]
    const updated = new Date(firstD.DateObserved)
    updated.setHours(firstD.HourObserved)

    airNowData.city = firstD.ReportingArea
    airNowData.state = firstD.StateCode
    airNowData.updated = updated.toLocaleString('en-US')
    airNowData.parameters = []

    for (const d of responseData) {
      const updated = new Date(d.DateObserved)
      updated.setHours(d.HourObserved)

      airNowData.parameters.push({
        parameter: d.ParameterName,
        value: d.AQI,
        city: d.ReportingArea,
        state: d.StateCode,
        updated: updated.toLocaleString('en-us'),
      })
    }

    // cache new data
    // @ts-ignore
    await data.set({
      table: 'aqi',
      key: cacheKey,
      ttl: 60 * 30, // 30 min
      airNowData,
    })

    return airNowData
  } else {
    throw new Error('No data')
  }
}

/**
 * @typedef {object} AqiData
 * @property {string} city
 * @property {string} state
 * @property {string} updated
 * @property {AqiParameter[]} parameters
 */
/**
 * @typedef {object} AqiParameter
 * @property {string} parameter
 * @property {number} value
 * @property {string} city
 * @property {string} state
 * @property {string} updated
*/
