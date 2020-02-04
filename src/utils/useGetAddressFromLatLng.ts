/* eslint-disable no-underscore-dangle,camelcase */
import { useEffect, useState } from 'react'
import { LatLng } from 'leaflet'
import proj4, { InterfaceCoordinates } from 'proj4'
import { CRS_CONFIG } from './getCrsRd'
import { ENDPOINTS } from '../constants'
import useFetchWithAbort from './useFetchWithAbort'

type Links = {
  self: {
    href: string
  }
  next: {
    href: string
  }
  previous: {
    href: string
  }
}

type VboStatus = { code: string; omschrijving: string }

type Address = {
  _links: Links
  _display: string
  landelijk_id: string
  hoofdadres: boolean
  vbo_status: VboStatus
  dataset: string // Todo: could be an enum?
}

type ValidResponse = {
  _links: Links
  count: number
  results: Address[]
}

function requestFormatter(baseUrl: string, xy: InterfaceCoordinates) {
  proj4.defs(CRS_CONFIG.RD.code, CRS_CONFIG.RD.projection)

  const transformCoords = proj4(CRS_CONFIG.WGS84.code, CRS_CONFIG.RD.code)

  const { x, y } = transformCoords.forward(xy)
  return `${baseUrl}${x},${y},50`
}

const useGetAddressFromLatLng = () => {
  const [addresses, setAddresses] = useState<ValidResponse>()
  const [latLng, setLatLng] = useState<LatLng>()
  const [loading, setLoading] = useState(false)

  const [request, controller] = useFetchWithAbort()

  useEffect(() => {
    if (latLng) {
      setLoading(true)
      const xy: InterfaceCoordinates = {
        x: latLng.lng,
        y: latLng.lat,
      }

      request(requestFormatter(ENDPOINTS.geocoder, xy))
        .then(res => res.json())
        .then((res: ValidResponse) => {
          setAddresses(res)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setAddresses(undefined)
    }

    return () => {
      controller.abort()
    }
  }, [latLng])

  return { addresses, setLatLng, loading, latLng }
}

export default useGetAddressFromLatLng
