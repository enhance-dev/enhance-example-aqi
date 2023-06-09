import data from '@begin/data'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function() {
  const myAqiData = await data.get({ table: 'aqi', key: 'my-aqi' })
  // @ts-ignore
  const { airNowData, iqAirData } = myAqiData

  const myAqi = { iqAir: {}, airNow: { } }

  if (iqAirData?.data?.current?.pollution) {
    const { data: iqAir } = iqAirData
    const iqAirCurrentPollution = iqAir.current.pollution

    myAqi.iqAir = {
      parameter: iqAirCurrentPollution.mainus,
      value: iqAirCurrentPollution.aqius,
      city: iqAir.city,
      state: iqAir.state,
      country: iqAir.country,
      // IQ Air date is UTC
      updated: (new Date(iqAirCurrentPollution.ts))
        .toLocaleString('en-us', { timeZone: 'America/Denver' }),
    }
  }

  if (Array.isArray(airNowData)) {
    const firstD = airNowData[0]
    const updated = new Date(firstD.DateObserved)
    updated.setHours(firstD.HourObserved)

    myAqi.airNow.city = firstD.ReportingArea
    myAqi.airNow.state = firstD.StateCode
    myAqi.airNow.updated = updated.toLocaleString('en-us')

    for (const d of airNowData) {
      const updated = new Date(d.DateObserved)
      updated.setHours(d.HourObserved)

      myAqi.airNow[d.ParameterName.replace('.', '_')] = {
        parameter: d.ParameterName,
        value: d.AQI,
        city: d.ReportingArea,
        state: d.StateCode,
        // AirNow date is already in local time
        updated: updated.toLocaleString('en-us')
      }
    }
  }

  return { json: { myAqi } }
}
