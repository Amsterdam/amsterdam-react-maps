import {
  BaseLayer,
  DeviceMode,
  DrawerControl,
  DrawerOverlay,
  DrawerPanelHeader,
  DrawerPanelProps,
  DrawerState,
  LargeDrawerPanel,
  LegendControl,
  Marker,
  SmallDrawerPanel,
  usePanToLatLng,
} from '@amsterdam/arm-core'
import {
  Heading,
  hooks,
  Paragraph,
  Spinner,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import { LatLng, LeafletMouseEvent } from 'leaflet'
import React, {
  forwardRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'

const StyledParagraph = styled(Paragraph)`
  margin: 0 ${themeSpacing(4)};
`

const TitleHeading = styled(Heading)`
  margin: 0;
`

const SubtitleHeading = styled(Heading)`
  color: red;
  margin: 0;
`

interface PointMarkerProps {
  latLng: LatLng | null
  setLatLng: (latLng: LatLng | null) => void
}

const PointMarker: FunctionComponent<PointMarkerProps> = ({
  latLng,
  setLatLng,
}) => {
  const mapInstance = useMapInstance()
  const { pan } = usePanToLatLng()

  useEffect(() => {
    const clickHandler = (e: LeafletMouseEvent) => {
      setLatLng(e.latlng)
    }

    mapInstance.on('click', clickHandler)

    return () => {
      setLatLng(null)
      mapInstance.off('click', clickHandler)
    }
  }, [])

  useEffect(() => {
    if (latLng) {
      pan(latLng)
    }
  }, [latLng])

  return latLng ? <Marker latLng={latLng} /> : null
}

const LegendPanel = forwardRef<
  HTMLDivElement,
  DrawerPanelProps & { onClose?: () => void }
>(({ onClose, ...otherProps }, ref) => (
  <SmallDrawerPanel ref={ref} {...otherProps}>
    <DrawerPanelHeader onClose={onClose}>
      <TitleHeading styleAs="h1">Legenda</TitleHeading>
      <SubtitleHeading as="h3">Een kaartpaneel</SubtitleHeading>
    </DrawerPanelHeader>
    <StyledParagraph>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam
      corporis culpa error et illum ipsa ipsam laudantium, maiores molestias non
      quaerat quasi qui temporibus voluptates. Adipisci dolore odit placeat sint
      tenetur totam voluptatum? A accusamus animi, at blanditiis corporis et
      excepturi fuga incidunt inventore ipsa laborum mollitia nihil nisi nobis
      odit optio praesentium quam quas quasi quidem recusandae sed totam. Ad
      cumque debitis delectus error, et facilis illo impedit inventore similique
      voluptates? Autem, commodi consequuntur cumque dolore, ea eos et ipsum
      iure magni neque nulla odio, odit pariatur placeat possimus quidem
      quisquam quo quos reprehenderit sapiente sed ullam vel vero. Accusantium
      adipisci aspernatur, at delectus distinctio dolore dolorem eligendi
      explicabo hic impedit in minus nam officia quam quod sit sunt voluptatum!
      Alias aperiam cumque doloremque ducimus eius mollitia repudiandae
      voluptates. Cumque mollitia nostrum repellat. Alias, asperiores cumque
      dolorem enim eum eveniet non odit reprehenderit voluptas voluptatum.
      Deserunt doloribus necessitatibus porro soluta temporibus. Aspernatur
      dignissimos doloribus fugiat in, odio officiis quasi voluptas? Amet
      assumenda blanditiis eius, eveniet hic neque officiis perferendis placeat
      provident quas ullam, veritatis. Accusantium eligendi iure quis quo, quos
      suscipit? Accusamus ad aliquid at atque cupiditate dolorem eaque earum,
      error eum ex expedita explicabo facilis fugit harum inventore laudantium,
      libero maxime minima minus molestiae natus necessitatibus nemo nostrum
      numquam officiis optio pariatur quis quod reiciendis repellendus sapiente
      sequi temporibus tenetur ullam vero voluptas voluptate! Accusantium, alias
      aliquam aspernatur autem blanditiis cumque cupiditate dolore dolores ea
      excepturi exercitationem illo ipsa magni neque odio praesentium provident
      quam quasi quidem quos repellat vitae voluptates voluptatibus! Consectetur
      consequatur dolor dolore doloremque dolorum ducimus eligendi eos error
      explicabo fugit in ipsa iure minus nam natus non nostrum officiis omnis
      pariatur perferendis perspiciatis possimus provident quam quas quisquam
      quo quod recusandae rem reprehenderit tenetur unde ut, velit veritatis
      vero voluptate voluptatem voluptatibus. Voluptas? Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Accusantium, adipisci alias architecto
      asperiores atque aut commodi consectetur delectus dolor ducimus enim error
      expedita facere fugiat id illo itaque iusto laborum nesciunt nisi officia
      officiis, optio pariatur quas sapiente sed similique sit temporibus ullam
      vero voluptatem voluptates voluptatibus voluptatum. Accusantium ad,
      adipisci alias aliquid asperiores consequuntur delectus distinctio dolorem
      est ex excepturi hic, in ipsum iure laborum laudantium minus
      necessitatibus nesciunt pariatur quas recusandae reiciendis rem
      reprehenderit saepe sit sunt voluptatibus? Consequatur, laboriosam sit.
      Accusamus aperiam corporis excepturi hic id magni modi, neque nesciunt
      nulla, officiis placeat quaerat reiciendis rerum sunt tenetur ullam velit
      voluptatum! At consequatur culpa cum distinctio dolores expedita harum id
      incidunt iste itaque molestias nemo neque non, nulla obcaecati odio
      provident quidem quis quisquam sapiente. Accusamus ad alias aperiam aut
      blanditiis, debitis delectus distinctio dolorum, eligendi enim eum eveniet
      exercitationem fugit incidunt iste laborum libero molestias non nulla odit
      officiis possimus quia similique temporibus veritatis voluptas voluptatum?
      Adipisci autem cum cupiditate deleniti, distinctio et eveniet expedita
      inventore laborum nulla quas quis quo quod tenetur veritatis? Cupiditate
      explicabo illum impedit molestias mollitia officiis quis tempore.
      Aspernatur at dolorem expedita laboriosam quis sed velit veniam
      voluptates? Aperiam aut consectetur distinctio quod sit. Accusamus ad
      animi at culpa fugiat odio quis sit tempora unde veritatis? Aut beatae
      corporis dolore ea eos fuga fugit laboriosam natus quod, voluptates.
      Asperiores at blanditiis consectetur est harum ipsa ipsum iusto nihil
      nulla vitae. Dicta dolorum eum ipsum perspiciatis, quidem recusandae? Ab
      aut consequatur corporis cupiditate dolor dolorum eaque exercitationem
      expedita harum iste libero modi nemo nisi non numquam placeat quam quas
      quia ratione repellendus, sed similique sunt tempore totam veritatis
      voluptatem voluptates voluptatibus! A alias atque distinctio dolores
      ducimus facilis illo, illum minus necessitatibus nihil nostrum officiis
      possimus quam, quis sed tempore vero, voluptas.
    </StyledParagraph>
  </SmallDrawerPanel>
))

interface DetailPanelProps extends DrawerPanelProps {
  latLng: LatLng
  size?: 'small' | 'large'
}

const DetailPanel = forwardRef<HTMLDivElement, DetailPanelProps>(
  ({ latLng, size, ...otherProps }, ref) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)

      setTimeout(() => setLoading(false), 1000)
    }, [latLng])

    const DrawerPanel = useMemo(
      () => (size === 'small' ? SmallDrawerPanel : LargeDrawerPanel),
      [size],
    )

    return (
      <DrawerPanel ref={ref} {...otherProps}>
        <DrawerPanelHeader>
          <TitleHeading styleAs="h1">Resultaten</TitleHeading>
        </DrawerPanelHeader>
        {loading ? (
          <Spinner />
        ) : (
          <StyledParagraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
            nobis odit reiciendis totam! Ad adipisci alias aliquid beatae
            commodi, consequatur cumque debitis delectus dolorem eius error
            fugit, harum hic iure labore laborum laudantium minima, neque non
            nulla quam quibusdam sapiente similique sit suscipit ut vel vero!
            Accusamus ad consequatur dolore esse, facere fugiat illum maxime
            mollitia nihil optio, quasi quisquam reprehenderit saepe sunt totam
            unde vel veniam veritatis vero voluptates.
          </StyledParagraph>
        )}
      </DrawerPanel>
    )
  },
)

const MapPanelExample: FunctionComponent = () => {
  const [latLng, setLatLng] = useState<LatLng | null>(null)
  const [legendActive, setLegendActive] = useState(false)
  const [drawerState, setDrawerState] = useState(DrawerState.Closed)
  const [showDesktopVariant] = hooks.useMatchMedia({ minBreakpoint: 'tabletM' })
  const mode = showDesktopVariant ? DeviceMode.Desktop : DeviceMode.Mobile

  const closeLegend = () => {
    setLegendActive(false)
  }

  const openPanel = useCallback(() => {
    setDrawerState(
      mode === DeviceMode.Desktop ? DrawerState.Open : DrawerState.Preview,
    )
  }, [mode, setDrawerState])

  const onMarkerClick = useCallback(
    (position: LatLng | null) => {
      setLegendActive(false)
      setLatLng(position)
      openPanel()
    },
    [openPanel, setLegendActive, setLatLng],
  )

  const controls: DrawerControl[] = [
    {
      id: 'legend',
      hAlign: 'left',
      vAlign: showDesktopVariant ? 'top' : 'bottom',
      node: (
        <LegendControl
          showDesktopVariant={showDesktopVariant}
          active={legendActive}
          onToggle={() => {
            setLegendActive(!legendActive)
            if (!legendActive) {
              openPanel()
            }
          }}
        />
      ),
    },
  ]

  return (
    <>
      <BaseLayer />
      <PointMarker latLng={latLng} setLatLng={onMarkerClick} />
      <DrawerOverlay
        mode={mode}
        controls={controls}
        state={drawerState}
        onStateChange={(state) => setDrawerState(state)}
      >
        {latLng && (
          <DetailPanel
            latLng={latLng}
            size={legendActive ? 'small' : 'large'}
          />
        )}
        {legendActive && (
          <LegendPanel {...(latLng ? { onClose: closeLegend } : {})} />
        )}
      </DrawerOverlay>
    </>
  )
}

export default MapPanelExample
