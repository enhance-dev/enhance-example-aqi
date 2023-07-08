import process from 'node:process'
import data from '@begin/data'

const { IP2LOCATION_KEY } = process.env

async function getCache(ip) {
  return await data.get({
    table: 'ip',
    key: `ip|${ip}`,
  })
}

async function setCache(ip, zip, isUS = true, source) {
  return data.set({
    table: 'ip',
    key: `ip|${ip}`,
    zip,
    isUS,
    source,
    created: new Date().toISOString(),
    TTL: Math.round(Date.now() / 1_000) + (60 * 60 * 24), // 1 day
  })
}

export async function ip2Zip(ip) {
  const cached = await getCache(ip)

  if (cached?.zip) {
    console.log(`IP ${ip.substring(0, 6)}… cache hit`)

    return Object.hasOwn(cached, 'isUS') && cached.isUS
      ? cached.zip
      : null
  }

  const response = await fetch(`https://api.ip2location.io/?key=${IP2LOCATION_KEY}&ip=${ip}`)

  if (response.status === 429)
    throw new Error('ip2location.io rate limit exceeded')

  const ipData = await response.json()

  if (ipData.response?.includes('insufficient credits'))
    throw new Error('Insufficient credits')

  const isUS = ipData.country_code === 'US'
  const zip = ipData.zip_code

  setCache(ip, zip, isUS, 'ip2location.io')

  return isUS ? zip : null
}

export async function ipToZip(ip) {
  const cached = await getCache(ip)

  if (cached?.zip) {
    const ipStub = ip.split('.')[0].split(':')[0]
    console.log(`IP ${ipStub}... cache hit`)

    return Object.hasOwn(cached, 'isUS') && cached.isUS
      ? cached.zip
      : null
  }

  const response = await fetch(`https://ipapi.co/${ip}/json/`)

  if (response.status === 429)
    throw new Error('ipapi.co rate limit exceeded')

  const ipData = await response.json()

  if (ipData.error)
    throw new Error(ipData.reason)

  const isUS = ipData.country_code === 'US'
  const zip = ipData.postal

  setCache(ip, zip, isUS, 'ipapi.co')

  return isUS ? zip : null
}
