import { Map, BaseLayer, Marker } from '@amsterdam/arm-core'

export default {
  title: 'UI/Marker',
  component: Marker,
}

export const Default = {
  render: () => (
    <Map fullScreen>
      <Marker
        latLng={{
          lat: 52.3731081,
          lng: 4.8932945,
        }}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'Default',
}
