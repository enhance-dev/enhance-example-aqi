module.exports = {
  data: [
    {
      scopeID: 'enhance-example-aqi',  // arc @app name
      dataID: 'staging#aqi#zip#80501', // arc env + table + key
      airNowData: {
        city: 'Denver-Boulder',
        state: 'CO',
        updated: '7/7/2023, 7:00:00 PM',
        parameters: [
          {
            parameter: 'O3',
            value: 44,
          },
          {
            parameter: 'PM2.5',
            value: 255,
          },
          {
            parameter: 'PM10',
            value: 499,
          }
        ]
      }
    },
  ],
}
