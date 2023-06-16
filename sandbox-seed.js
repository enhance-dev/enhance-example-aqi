module.exports = {
  data: [
    {
      scopeID: 'enhance-example-aqi', // arc @app name
      dataID: 'staging#aqi#my-aqi', // arc env + table + key
      airNowData: [
        {
          AQI: 58,
          Category: {
            Name: 'Moderate',
            Number: 2,
          },
          DateObserved: '2023-06-08 ',
          HourObserved: 10,
          LocalTimeZone: 'MST',
          ParameterName: 'O3',
          ReportingArea: 'Denver-Boulder',
          StateCode: 'CO',
        },
        {
          AQI: 150,
          Category: {
            Name: 'Good',
            Number: 1,
          },
          DateObserved: '2023-06-08 ',
          HourObserved: 10,
          LocalTimeZone: 'MST',
          ParameterName: 'PM2.5',
          ReportingArea: 'Denver-Boulder',
          StateCode: 'CO',
        },
        {
          AQI: 445,
          Category: {
            Name: 'Good',
            Number: 1,
          },
          DateObserved: '2023-06-08 ',
          HourObserved: 10,
          LocalTimeZone: 'MST',
          ParameterName: 'PM10',
          ReportingArea: 'Denver-Boulder',
          StateCode: 'CO',
        },
      ],
      iqAirData: {
        data: {
          city: 'Longmont',
          country: 'USA',
          current: {
            pollution: {
              aqicn: 1,
              aqius: 4,
              maincn: 'p2',
              mainus: 'p2',
              ts: '2023-06-08T17:00:00.000Z',
            },
            weather: {
              hu: 48,
              ic: '01d',
              pr: 1014,
              tp: 22,
              ts: '2023-06-08T17:00:00.000Z',
              wd: 70,
              ws: 2.06,
            },
          },
          location: {
            type: 'Point',
          },
          state: 'Colorado',
        },
        status: 'success',
      },
    },
  ],
}
