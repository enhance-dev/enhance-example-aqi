import process from 'node:process'
import { getAqiForZip } from '../lib/aqi-data.mjs'
import { ip2Zip, ipToZip } from '../lib/ip-to-zip.mjs'

const { MY_IP } = process.env
const DEFAULT_ZIP = '10001'

/** @type {import('@enhance/types').EnhanceApiFn & any} */
export const get = async function ({ requestContext }) {
  let userIp = requestContext.http.sourceIp
  // userIp = '2600:6c46:4500:41f::d301:4256:6710' // IPv6 in MN (55060) with no AQI data
  // userIp ='104.159.127.255' // IP in Canada
  if (userIp === '1') userIp = MY_IP // local Sandbox

  let zip
  let ip2location
  try {
    zip = await ip2Zip(userIp)
  } catch (error) {
    ip2location = error
    console.log('Error getting location from ip2location.io:', error)
  }

  if (ip2location) { // fallback
    console.log('Falling back to ipapi.co')

    try {
      zip = await ipToZip(userIp)
    } catch (error) {
      console.log('Error getting location from ipapi.co:', error)
    }
  }

  let aqiData
  try {
    aqiData = await getAqiForZip(zip || DEFAULT_ZIP)
  } catch (error) {
    return error.message === 'No data'
      ? { status: 200, json: { aqiData: await getAqiForZip(DEFAULT_ZIP) } } // better than error
      : { status: 500, json: { error: error.message } }
  }

  if (!aqiData)
    return { status: 404, json: { error: 'Not found' } }

  return { json: { aqiData } }
}
