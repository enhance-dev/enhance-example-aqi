import process from 'node:process'

const { AIRNOW_KEY } = process.env

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query }) {
  const { zip } = query

  // TODO: validate zip
  // TODO: cache AQI data by zip

  if (zip) {
    const url = [
      'https://www.airnowapi.org/aq/observation/zipCode/current/',
      '?format=application/json&API_KEY=',
      AIRNOW_KEY,
      '&distance=25&zipCode=',
      zip
    ].join('')

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.WebServiceError)
        return { json: { error: data.WebServiceError } }
      else {
        const airNow = {}
        const firstD = data[0]
        const updated = new Date(firstD.DateObserved)
        updated.setHours(firstD.HourObserved)

        airNow.city = firstD.ReportingArea
        airNow.state = firstD.StateCode
        airNow.updated = updated.toLocaleString('en-US')
        airNow.parameters = []

        for (const d of data) {
          const updated = new Date(d.DateObserved)
          updated.setHours(d.HourObserved)

          airNow.parameters.push({
            parameter: d.ParameterName,
            value: d.AQI,
            city: d.ReportingArea,
            state: d.StateCode,
            updated: updated.toLocaleString('en-us'),
          })
        }

        return { json: { airNow } }
      }

    } catch (error) {
      console.log(error)
      return { json: { error: 'Error fetching data' } }
    }
  }
  else {
    return {}
  }
}
