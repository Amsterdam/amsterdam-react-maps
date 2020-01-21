/**
 * Deze service is copied from the amaps and adapted to the new react-maps needs.
 * 
 */

//helper functions shared between different amaps wrapper apps

import proj4 from "proj4";
/* eslint-disable-next-line max-len */
proj4.defs(
  "EPSG:28992",
  "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs"
);
const transformCoords = proj4(
  proj4.defs("EPSG:4326"),
  proj4.defs("EPSG:28992")
);

const FormatException = (error, response) => {
  return {
    error,
    response
  };
};

//utility function
function query(url) {
  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
  return promise;
}

//chain of API requests for single-click
//1. get BAG information.
//2. after that, we need to get the full object data.
//3. get locationinfo
async function getBagInfo(click) {
  const xy = {
    x: click.latlng.lng,
    y: click.latlng.lat
  };
  let nummeraanduidingId = false;
  if (click.resultObject && click.resultObject.nummeraanduiding_id)
    nummeraanduidingId = click.resultObject.nummeraanduiding_id;
  const url = requestFormatter(
    "https://api.data.amsterdam.nl/bag/nummeraanduiding/?format=json&locatie=",
    xy
  );
  return await query(url).then(res => {
    let output = {
      queryResult: responseFormatter(res, nummeraanduidingId),
      latlng: click.latlng
    };
    return output;
  });
}

async function getFullObjectData(data) {
  let nearestAdres = {};
  if (data.queryResult !== null) {
    try {
      const res = await query(data.queryResult._links.self.href);
      nearestAdres = {
        openbare_ruimte: res.openbare_ruimte._display,
        huisnummer: res.huisnummer,
        huisletter: res.huisletter,
        huisnummer_toevoeging: res.huisnummer_toevoeging,
        postcode: res.postcode,
        woonplaats: res.woonplaats._display
      };
    } catch (e) {
      /* eslint-disable no-console */
      console.log("error!");
      console.log(e);
      /* eslint-enable no-console */
    }
  } else {
    nearestAdres = null;
  }
  return {
    query: {
      latitude: data.latlng.lat,
      longitude: data.latlng.lng
    },
    nearest_adres: nearestAdres,
    object: null //no object for an address search
  };
}

function findOmgevingFeature(features, type) {
  let feature = features.find(feat => feat.properties.type === type);
  if (feature === undefined) return null;
  return feature.properties;
}

async function getLocationInfo(data) {
  const res = await query(
    `https://api.data.amsterdam.nl/geosearch/bag/?lat=${data.query.latitude}&lon=${data.query.longitude}&radius=50`
  );
  let buurtinfo = findOmgevingFeature(res.features, "gebieden/buurt");
  let wijkinfo = findOmgevingFeature(res.features, "gebieden/buurtcombinatie");
  let stadsdeelinfo = findOmgevingFeature(res.features, "gebieden/stadsdeel");
  if (buurtinfo !== null && wijkinfo !== null && stadsdeelinfo !== null) {
    data.locationInfo = {
      buurtnaam: buurtinfo !== undefined ? buurtinfo.display : null,
      buurtcode: buurtinfo !== undefined ? buurtinfo.vollcode : null,
      wijknaam: wijkinfo !== undefined ? wijkinfo.display : null,
      wijkcode: wijkinfo !== undefined ? wijkinfo.vollcode : null,
      stadsdeelnaam: stadsdeelinfo !== undefined ? stadsdeelinfo.display : null,
      stadsdeelcode: stadsdeelinfo !== undefined ? stadsdeelinfo.code : null
    };
  } else {
    data.locationInfo = null;
  }

  return data;
}

function requestFormatter(baseUrl, xy) {
  let xyRD = transformCoords.forward(xy);
  return `${baseUrl}${xyRD.x},${xyRD.y},50`;
}

function responseFormatter(res, search_id) {
  let filtered;
  search_id =
    search_id === false ? false : search_id === undefined ? false : search_id; //make sure that search_id is properly set to false
  if (res.results) {
    filtered =
      search_id !== false
        ? res.results.filter(x => x.landelijk_id === search_id)
        : res.results.filter(x => x.hoofdadres === true);
  } else {
    throw new FormatException(
      "no results property found on query response.",
      res
    );
  }
  return filtered.length > 0 ? filtered[0] : null;
}

async function pointQuery(click) {
  try {
    const result = await getBagInfo(click)
      .then(getFullObjectData)
      .then(getLocationInfo);
    return result;
  } catch (e) {
    throw e;
  }
}

export {
  pointQuery,
  getBagInfo,
  getFullObjectData,
  getLocationInfo,
  requestFormatter,
  responseFormatter,
  query
};
