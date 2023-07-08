import process from 'node:process'
import data, { set } from '@begin/data'

const { IP2LOCATION_KEY } = process.env

async function getCache(ip) {
  return await data.get({
    table: 'ip',
    key: `ip#${ip}`,
  })
}

async function setCache(ip, zip) {
  return data.set({
    table: 'ip',
    key: `ip#${ip}`,
    ttl: 60 * 60 * 24 * 7, // 1 week
    zip
  })
}

export async function ipToZip(ip) {
  const cached = await getCache(ip)

  if (cached?.zip) {
    console.log(`IP found in cache`)
    return cached.zip
  }

  const response = await fetch(`https://ipapi.co/${ip}/json/`)

  if (response.status === 429)
    throw new Error('ipapi.co rate limit exceeded')

  const ipData = await response.json()

  if (ipData.country_code !== 'US')
    throw new Error('Not a US IP')
  if (ipData.error)
    throw new Error(ipData.reason)
  else {
    await setCache(ip, ipData.postal)
    return ipData.postal
  }
}

export async function ip2Zip(ip) {
  const cached = await getCache(ip)

  if (cached?.zip) {
    console.log(`IP found in cache`)
    return cached.zip
  }

  const response = await fetch(`https://api.ip2location.io/?key=${IP2LOCATION_KEY}&ip=${ip}`)

  if (response.status === 429)
    throw new Error('ipapi.co rate limit exceeded')

  const ipData = await response.json()

  if (ipData.response?.includes('insufficient credits'))
    throw new Error('Insufficient credits')
  else if (ipData.country_code !== 'US')
    throw new Error('Not a US IP')
  else {
    await setCache(ip, ipData.zip_code)
    return ipData.zip_code
  }
}
