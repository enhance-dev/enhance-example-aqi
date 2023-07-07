@app
enhance-example-aqi

@static
prune true

@plugins
enhance/arc-plugin-enhance

@scheduled
get-aqi
  rate 30 minutes
  src jobs/scheduled/get-aqi

@aws
runtime nodejs18.x
timeout 30

@begin
appID SF1X9L3V
