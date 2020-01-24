import proj4 from 'proj4'
import { LeafletMouseEvent } from 'leaflet'

/**
 * This service is copied from the amaps and adapted to the new react-maps needs.
 *
 */

// helper functions shared between different amaps wrapper apps

proj4.defs(
  'EPSG:28992',
  `+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs`,
)

const transformCoords = proj4(proj4.defs('EPSG:4326'), proj4.defs('EPSG:28992'))

const FormatException = (error: string, response: Function) => ({
  error,
  response,
})

// utility function
const query = async (url: string) => {
  const result = await window.fetch(url)
  return result.json()
}

// chain of API requests for single-click
// 1. get BAG information.
// 2. after that, we need to get the full object data.
// 3. get locationinfo
const getBagInfo = async (click: LeafletMouseEvent) => {
  const xy = {
    x: click.latlng.lng,
    y: click.latlng.lat,
  }
  let nummeraanduidingId = false
  if (click.resultObject && click.resultObject.nummeraanduiding_id)
    nummeraanduidingId = click.resultObject.nummeraanduiding_id
  const url = requestFormatter(
    'https://api.data.amsterdam.nl/bag/nummeraanduiding/?format=json&locatie=',
    xy,
  )
  const result = await query(url)
  const output = {
    queryResult: responseFormatter(result, nummeraanduidingId),
    latlng: click.latlng,
  }
  return output
}

async function getFullObjectData(data) {
  let nearestAdres = {}
  if (data.queryResult !== null) {
    try {
      const res = await query(data.queryResult._links.self.href)
      nearestAdres = {
        openbare_ruimte: res.openbare_ruimte._display,
        huisnummer: res.huisnummer,
        huisletter: res.huisletter,
        huisnummer_toevoeging: res.huisnummer_toevoeging,
        postcode: res.postcode,
        woonplaats: res.woonplaats._display,
      }
    } catch (e) {
      /* eslint-disable no-console */
      console.log('error!')
      console.log(e)
      /* eslint-enable no-console */
    }
  } else {
    nearestAdres = null
  }
  return {
    location: {
      lat: data.latlng.lat,
      lng: data.latlng.lng,
    },
    nearestAdres,
  }
}

function requestFormatter(baseUrl: string, xy) {
  let xyRD = transformCoords.forward(xy)
  return `${baseUrl}${xyRD.x},${xyRD.y},50`
}

function findFeatureByType(features: Array<any>, type: string) {
  const feature = features.find(feat => feat.properties.type === type)
  if (feature === undefined) return null
  return feature.properties
}

async function getLocationInfo(data) {
  const { location } = data
  const res = await query(
    `https://api.data.amsterdam.nl/geosearch/bag/?lat=${location.lat}&lon=${location.lng}&radius=50`,
  )
  const buurtinfo = findFeatureByType(res.features, 'gebieden/buurt')
  const wijkinfo = findFeatureByType(res.features, 'gebieden/buurtcombinatie')
  const stadsdeelinfo = findFeatureByType(res.features, 'gebieden/stadsdeel')
  if (buurtinfo !== null && wijkinfo !== null && stadsdeelinfo !== null) {
    data.locationInfo = {
      buurtnaam: buurtinfo !== undefined ? buurtinfo.display : null,
      buurtcode: buurtinfo !== undefined ? buurtinfo.vollcode : null,
      wijknaam: wijkinfo !== undefined ? wijkinfo.display : null,
      wijkcode: wijkinfo !== undefined ? wijkinfo.vollcode : null,
      stadsdeelnaam: stadsdeelinfo !== undefined ? stadsdeelinfo.display : null,
      stadsdeelcode: stadsdeelinfo !== undefined ? stadsdeelinfo.code : null,
    }
  } else {
    data.locationInfo = null
  }

  return data
}

function responseFormatter(res, search_id) {
  let filtered
  search_id =
    search_id === false ? false : search_id === undefined ? false : search_id //make sure that search_id is properly set to false
  if (res.results) {
    filtered =
      search_id !== false
        ? res.results.filter(x => x.landelijk_id === search_id)
        : res.results.filter(x => x.hoofdadres === true)
  } else {
    throw new FormatException(
      'no results property found on query response.',
      res,
    )
  }
  return filtered.length > 0 ? filtered[0] : null
}

const pointQuery = async (event: LeafletMouseEvent) => {
  try {
    return await getBagInfo(event)
      .then(getFullObjectData)
      .then(getLocationInfo)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e)
    throw e
  }
}

export default pointQuery
