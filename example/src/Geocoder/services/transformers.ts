export const nearestAdresToString = nearestAdres => {
  if (!nearestAdres) return ''
  const {
    openbare_ruimte,
    huisnummer,
    huisletter,
    huisnummer_toevoeging,
    postcode,
    woonplaats,
  } = nearestAdres

  return `${openbare_ruimte} ${huisnummer}${huisletter}${
    huisnummer_toevoeging === '' ? '' : `-${huisnummer_toevoeging}`
  }, ${postcode} ${woonplaats}`
}

export const wktPointToLocation = wktPoint => {
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
