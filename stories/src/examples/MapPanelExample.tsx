import React, { useContext, useEffect, useState } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import { hooks, Paragraph, Spinner, ViewerContainer } from '@datapunt/asc-ui'
import { useMapInstance } from '@datapunt/react-maps'
import { LatLng, LeafletMouseEvent } from 'leaflet'
import {
  Marker,
  BaseLayer,
  Zoom,
  mapPanelComponents,
  usePanToLatLng,
} from '@datapunt/arm-core'

const {
  MapPanel,
  MapPanelDrawer,
  MapPanelLegendButton,
  MapPanelContent,
  MapPanelProvider,
  MapPanelContext,
} = mapPanelComponents

type StyledViewerContainerProps = {
  leftOffset?: string
  viewerHeight?: string
  ignoreTransition: boolean
}

export enum Overlay {
  Results,
  Legend,
  None,
}

export enum SnapPoint {
  Full,
  Halfway,
  Closed,
}

const StyledViewerContainer = styled(ViewerContainer).attrs<
  StyledViewerContainerProps
>(({ viewerHeight, leftOffset }) => ({
  style: {
    height: viewerHeight,
    left: leftOffset,
  },
}))<StyledViewerContainerProps>`
  z-index: 400;
  ${({ ignoreTransition }) =>
    !ignoreTransition &&
    css`
      transition: height 0.3s ease-in-out;
    `}
`

type Props = {
  currentOverlay: Overlay
  setCurrentOverlay: (overlay: Overlay) => void
  showDesktopVariant: boolean
}

const ViewerContainerWithMapDrawerOffset: React.FC<Props> = ({
  currentOverlay,
  setCurrentOverlay,
  showDesktopVariant,
  ...otherProps
}) => {
  const { drawerPosition, draggable } = useContext(MapPanelContext)
  const height =
    parseInt(drawerPosition, 10) < window.innerHeight / 2
      ? '50%'
      : drawerPosition

  return (
    <>
      {!showDesktopVariant ? (
        <StyledViewerContainer
          {...otherProps}
          ignoreTransition={draggable}
          viewerHeight={height}
          bottomLeft={
            <MapPanelLegendButton
              {...{ showDesktopVariant, currentOverlay, setCurrentOverlay }}
            />
          }
        />
      ) : (
        <StyledViewerContainer
          {...otherProps}
          ignoreTransition={draggable}
          leftOffset={drawerPosition}
          topLeft={
            <MapPanelLegendButton
              {...{ showDesktopVariant, currentOverlay, setCurrentOverlay }}
            />
          }
          bottomRight={<Zoom />}
        />
      )}
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body { 
    touch-action: none;
    overflow: hidden; // This will prevent the scrollBar on iOS due to navigation bar
  }
`

const CustomMarker: React.FC<{
  setCurrentLatLng: (latLng: LatLng | null) => void
  currentLatLng: LatLng | null
}> = ({ setCurrentLatLng, currentLatLng }) => {
  const {
    drawerPosition,
    setPositionFromSnapPoint,
    matchPositionWithSnapPoint,
    variant,
  } = useContext(MapPanelContext)
  const mapInstance = useMapInstance()
  const { pan } = usePanToLatLng()
  useEffect(() => {
    const clickHandler = (e: LeafletMouseEvent) => {
      setPositionFromSnapPoint(SnapPoint.Halfway)
      setCurrentLatLng(e.latlng)
    }
    if (mapInstance) {
      mapInstance.on('click', clickHandler)
    }

    return () => {
      if (mapInstance) {
        setCurrentLatLng(null)
        mapInstance.off('click', clickHandler)
      }
    }
  }, [mapInstance])

  // Use this logic to automatically pan the map to the center of the marker when the drawer is positioned in the middle
  useEffect(() => {
    if (matchPositionWithSnapPoint(SnapPoint.Halfway) && currentLatLng) {
      pan(currentLatLng, variant === 'drawer' ? 'vertical' : 'horizontal', 20)
    }
  }, [drawerPosition, currentLatLng])
  return currentLatLng ? <Marker latLng={currentLatLng} /> : null
}

const MapLegendContent = ({ ...otherProps }) => (
  <MapPanelContent title="Legenda" {...otherProps}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam
    corporis culpa error et illum ipsa ipsam laudantium, maiores molestias non
    quaerat quasi qui temporibus voluptates. Adipisci dolore odit placeat sint
    tenetur totam voluptatum? A accusamus animi, at blanditiis corporis et
    excepturi fuga incidunt inventore ipsa laborum mollitia nihil nisi nobis
    odit optio praesentium quam quas quasi quidem recusandae sed totam. Ad
    cumque debitis delectus error, et facilis illo impedit inventore similique
    voluptates? Autem, commodi consequuntur cumque dolore, ea eos et ipsum iure
    magni neque nulla odio, odit pariatur placeat possimus quidem quisquam quo
    quos reprehenderit sapiente sed ullam vel vero. Accusantium adipisci
    aspernatur, at delectus distinctio dolore dolorem eligendi explicabo hic
    impedit in minus nam officia quam quod sit sunt voluptatum! Alias aperiam
    cumque doloremque ducimus eius mollitia repudiandae voluptates. Cumque
    mollitia nostrum repellat. Alias, asperiores cumque dolorem enim eum eveniet
    non odit reprehenderit voluptas voluptatum. Deserunt doloribus
    necessitatibus porro soluta temporibus. Aspernatur dignissimos doloribus
    fugiat in, odio officiis quasi voluptas? Amet assumenda blanditiis eius,
    eveniet hic neque officiis perferendis placeat provident quas ullam,
    veritatis. Accusantium eligendi iure quis quo, quos suscipit? Accusamus ad
    aliquid at atque cupiditate dolorem eaque earum, error eum ex expedita
    explicabo facilis fugit harum inventore laudantium, libero maxime minima
    minus molestiae natus necessitatibus nemo nostrum numquam officiis optio
    pariatur quis quod reiciendis repellendus sapiente sequi temporibus tenetur
    ullam vero voluptas voluptate! Accusantium, alias aliquam aspernatur autem
    blanditiis cumque cupiditate dolore dolores ea excepturi exercitationem illo
    ipsa magni neque odio praesentium provident quam quasi quidem quos repellat
    vitae voluptates voluptatibus! Consectetur consequatur dolor dolore
    doloremque dolorum ducimus eligendi eos error explicabo fugit in ipsa iure
    minus nam natus non nostrum officiis omnis pariatur perferendis perspiciatis
    possimus provident quam quas quisquam quo quod recusandae rem reprehenderit
    tenetur unde ut, velit veritatis vero voluptate voluptatem voluptatibus.
    Voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Accusantium, adipisci alias architecto asperiores atque aut commodi
    consectetur delectus dolor ducimus enim error expedita facere fugiat id illo
    itaque iusto laborum nesciunt nisi officia officiis, optio pariatur quas
    sapiente sed similique sit temporibus ullam vero voluptatem voluptates
    voluptatibus voluptatum. Accusantium ad, adipisci alias aliquid asperiores
    consequuntur delectus distinctio dolorem est ex excepturi hic, in ipsum iure
    laborum laudantium minus necessitatibus nesciunt pariatur quas recusandae
    reiciendis rem reprehenderit saepe sit sunt voluptatibus? Consequatur,
    laboriosam sit. Accusamus aperiam corporis excepturi hic id magni modi,
    neque nesciunt nulla, officiis placeat quaerat reiciendis rerum sunt tenetur
    ullam velit voluptatum! At consequatur culpa cum distinctio dolores expedita
    harum id incidunt iste itaque molestias nemo neque non, nulla obcaecati odio
    provident quidem quis quisquam sapiente. Accusamus ad alias aperiam aut
    blanditiis, debitis delectus distinctio dolorum, eligendi enim eum eveniet
    exercitationem fugit incidunt iste laborum libero molestias non nulla odit
    officiis possimus quia similique temporibus veritatis voluptas voluptatum?
    Adipisci autem cum cupiditate deleniti, distinctio et eveniet expedita
    inventore laborum nulla quas quis quo quod tenetur veritatis? Cupiditate
    explicabo illum impedit molestias mollitia officiis quis tempore. Aspernatur
    at dolorem expedita laboriosam quis sed velit veniam voluptates? Aperiam aut
    consectetur distinctio quod sit. Accusamus ad animi at culpa fugiat odio
    quis sit tempora unde veritatis? Aut beatae corporis dolore ea eos fuga
    fugit laboriosam natus quod, voluptates. Asperiores at blanditiis
    consectetur est harum ipsa ipsum iusto nihil nulla vitae. Dicta dolorum eum
    ipsum perspiciatis, quidem recusandae? Ab aut consequatur corporis
    cupiditate dolor dolorum eaque exercitationem expedita harum iste libero
    modi nemo nisi non numquam placeat quam quas quia ratione repellendus, sed
    similique sunt tempore totam veritatis voluptatem voluptates voluptatibus! A
    alias atque distinctio dolores ducimus facilis illo, illum minus
    necessitatibus nihil nostrum officiis possimus quam, quis sed tempore vero,
    voluptas.
  </MapPanelContent>
)

type ResultProps = {
  setCurrentLatLng: (latLng: LatLng | null) => void
  currentOverlay: Overlay
  currentLatLng: LatLng | null
}

const Results: React.FC<ResultProps> = ({
  setCurrentLatLng,
  currentOverlay,
  currentLatLng,
}) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    // Fake loading time
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [currentLatLng])
  return (
    <MapPanelContent
      title="Resultaten"
      animate
      stackOrder={currentOverlay === Overlay.Results ? 2 : 1}
      onClose={() => {
        setCurrentLatLng(null)
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          nobis odit reiciendis totam! Ad adipisci alias aliquid beatae commodi,
          consequatur cumque debitis delectus dolorem eius error fugit, harum
          hic iure labore laborum laudantium minima, neque non nulla quam
          quibusdam sapiente similique sit suscipit ut vel vero! Accusamus ad
          consequatur dolore esse, facere fugiat illum maxime mollitia nihil
          optio, quasi quisquam reprehenderit saepe sunt totam unde vel veniam
          veritatis vero voluptates.
        </Paragraph>
      )}
    </MapPanelContent>
  )
}

const MapPanelExample: React.FC<{ variant?: string }> = () => {
  const [currentLatLng, setCurrentLatLng] = useState<LatLng | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>(Overlay.None)
  const [showDesktopVariant] = hooks.useMatchMedia({ minBreakpoint: 'tabletM' })

  useEffect(() => {
    if (!currentLatLng) {
      setCurrentOverlay(Overlay.None)
    } else {
      setCurrentOverlay(Overlay.Results)
    }
  }, [currentLatLng])

  const Element = showDesktopVariant ? MapPanel : MapPanelDrawer
  return (
    <>
      <GlobalStyle />
      <MapPanelProvider
        variant={showDesktopVariant ? 'panel' : 'drawer'}
        initialPosition={SnapPoint.Closed}
      >
        <Element>
          <CustomMarker
            setCurrentLatLng={setCurrentLatLng}
            currentLatLng={currentLatLng}
          />
          {currentOverlay === Overlay.Legend && (
            <MapLegendContent
              stackOrder={2}
              animate
              onClose={() => {
                setCurrentOverlay(
                  currentLatLng ? Overlay.Results : Overlay.None,
                )
              }}
            />
          )}
          {currentLatLng && (
            <Results
              {...{
                currentOverlay,
                setCurrentLatLng,
                currentLatLng,
              }}
            />
          )}
          <MapLegendContent />
        </Element>
        <ViewerContainerWithMapDrawerOffset
          {...{
            setCurrentOverlay,
            currentOverlay,
            showDesktopVariant,
          }}
        />
      </MapPanelProvider>
      <BaseLayer />
    </>
  )
}

export default MapPanelExample
