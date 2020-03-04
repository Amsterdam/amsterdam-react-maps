import { wktPointToLocation } from './transformers'

const GEOCODER_API_SUGGEST =
  'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:(amsterdam OR weesp)&fq=type:adres&q='
const GEOCODER_API_LOOKUP =
  'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?fq=gemeentenaam:(amsterdam OR weesp)&fq=type:adres&id='

export const getSuggestions = async (searchTerm: string) => {
  const result = await window.fetch(`${GEOCODER_API_SUGGEST}${searchTerm}`)
  const data = await result.json()
  const suggestions = data.response.docs.map((item: any) => ({
    id: item.id,
    name: item.weergavenaam,
  }))
  return suggestions
}

export const getAddressById = async (addressId: string) => {
  const result = await window.fetch(`${GEOCODER_API_LOOKUP}${addressId}`)
  const { response } = await result.json()
  if (response.docs[0]) {
    return {
      ...response.docs[0],
      location: wktPointToLocation(response.docs[0].centroide_ll),
    }
  }
  return null
}
