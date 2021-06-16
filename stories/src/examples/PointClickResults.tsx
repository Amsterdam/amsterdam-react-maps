/* eslint-disable */
import { Marker, useGetAddressFromLatLng } from '@amsterdam/arm-core'
import { Close } from '@amsterdam/asc-assets'
import { Button, Heading, Icon, Spinner, TopBar } from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import { LeafletMouseEvent } from 'leaflet'
import { useEffect } from 'react'
import styled from 'styled-components'

const PointClickPanel = styled.div`
  background-color: #fff;
  width: 400px;
  padding: 10px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PointClickResults: React.FC = () => {
  const { addresses, setLatLng, loading, latLng } = useGetAddressFromLatLng()
  const mapInstance = useMapInstance()

  useEffect(() => {
    const clickHandler = (e: LeafletMouseEvent) => {
      setLatLng(e.latlng)
    }

    mapInstance.on('click', clickHandler)

    return () => {
      mapInstance.off('click', clickHandler)
    }
  }, [])

  return (
    <>
      {latLng && <Marker latLng={latLng} />}
      {(addresses || loading) && (
        <PointClickPanel>
          {addresses && !loading && (
            <List>
              <TopBar>
                <Heading as="h3">Results</Heading>
                <Button
                  type="button"
                  size={30}
                  onClick={() => {
                    setLatLng(undefined)
                  }}
                  variant="blank"
                >
                  <Icon size={20}>
                    <Close />
                  </Icon>
                </Button>
              </TopBar>
              {addresses.results.map(({ _display, landelijk_id }) => (
                <span key={landelijk_id}>{_display}</span>
              ))}
            </List>
          )}
          {loading && <Spinner />}
        </PointClickPanel>
      )}
    </>
  )
}

export default PointClickResults
