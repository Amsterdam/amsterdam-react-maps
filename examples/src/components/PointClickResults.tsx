/* eslint-disable no-underscore-dangle,camelcase */
import React, { useEffect } from 'react'
import { useMapInstance } from '@datapunt/react-maps'
import styled from 'styled-components'
import { Close } from '@datapunt/asc-assets'
import { Button, Heading, Icon, Spinner, TopBar } from '@datapunt/asc-ui'
import { LeafletMouseEvent } from 'leaflet'
import { utils, components } from '@datapunt/arm-core'

const { Marker } = components

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
  const {
    addresses,
    setLatLng,
    loading,
    latLng,
  } = utils.useGetAddressFromLatLng()
  const mapInstance = useMapInstance()

  useEffect(() => {
    const clickHandler = (e: LeafletMouseEvent) => {
      setLatLng(e.latlng)
    }
    if (mapInstance) {
      mapInstance.on('click', clickHandler)
    }

    return () => {
      if (mapInstance) {
        mapInstance.off('click', clickHandler)
      }
    }
  }, [mapInstance])

  return (
    <>
      {latLng && <Marker latLng={latLng} />}
      {(addresses || loading) && (
        <PointClickPanel>
          {addresses && !loading && (
            <List>
              <TopBar>
                <Heading as="h3">Resultaten</Heading>
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
