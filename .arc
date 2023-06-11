@app
enhance-example-aqi

@static
prune true

@plugins
enhance/arc-plugin-enhance
enhance/styles-cribsheet

@scheduled
get-aqi
  rate 30 minutes
  src jobs/scheduled/get-aqi

@aws
runtime nodejs18.x

@begin
appID SF1X9L3V
