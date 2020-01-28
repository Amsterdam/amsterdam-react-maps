export const nearestAdresToString = (nearestAdres: any) => {
  if (!nearestAdres) return ''
  const {
    // eslint-disable-next-line camelcase
    openbare_ruimte,
    huisnummer,
    huisletter,
    // eslint-disable-next-line camelcase
    huisnummer_toevoeging,
    postcode,
    woonplaats,
  } = nearestAdres

  // eslint-disable-next-line camelcase
  return `${openbare_ruimte} ${huisnummer}${huisletter}${
    // eslint-disable-next-line camelcase
    huisnummer_toevoeging === '' ? '' : `-${huisnummer_toevoeging}`
  }, ${postcode} ${woonplaats}`
}

export const wktPointToLocation = (wktPoint: string) => {
  if (!wktPoint.includes('POINT')) {
    throw TypeError('Provided WKT geometry is not a point.')
  }
  const coordinate = wktPoint.split('(')[1].split(')')[0]
  const lat = parseFloat(coordinate.split(' ')[1])
  const lon = parseFloat(coordinate.split(' ')[0])

  return {
    lat,
    lon,
  }
}
