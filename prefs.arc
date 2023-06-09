@sandbox
livereload true

@sandbox-startup
node scripts/run-aqi-job.mjs # grab live data and overwrite seed
