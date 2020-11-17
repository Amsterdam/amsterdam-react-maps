import { LatLngTuple } from 'leaflet'

const generateParams = (data: Record<string, string>) =>
  Object.entries(data)
    .filter(([, value]) => value !== null && value !== undefined)
    .map((pair) => pair.map(encodeURIComponent).join('='))
    .join('&')

export interface Source {
  centroid: [number, number]
}

export interface ObjectListItem {
  _index: string
  _type: string
  _id: string
  _score: null
  _source: Source
  sort: Array<number | string>
}

export interface DataSelection {
  numberOfRecords: number
  data: ObjectListItem[]
  markers: LatLngTuple[]
}

interface RawResponse {
  object_count: number
  object_list: ObjectListItem[]
}

function formatResponse({
  object_count: numberOfRecords,
  object_list: data,
}: RawResponse): DataSelection {
  // eslint-disable-next-line no-underscore-dangle
  const markers = data.map((item) => item._source.centroid)

  return {
    numberOfRecords,
    data,
    markers,
  }
}

export default async function getDataSelection(
  endpoint: string,
  params: Record<string, string>,
): Promise<DataSelection> {
  return fetch(`${endpoint}?${generateParams(params)}`)
    .then((response) => response.json())
    .then((rawData) => formatResponse(rawData))
}
