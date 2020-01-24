import { memo } from "react";
import L from "leaflet";
import "leaflet.nontiledlayer";
import { useMapInstance } from "@datapunt/react-maps";

const NonTiledLayer = ({ url, params, ...args }: any) => {
  const { mapInstance } = useMapInstance();
  const query = params ? new URLSearchParams(params).toString() : "";
  const layerUrl = query ? `${url}?${query}` : url;

  if (mapInstance) {
    // @ts-ignore
    L.nonTiledLayer.wms(layerUrl, args).addTo(mapInstance);
  }

  return null;
};

export default memo(NonTiledLayer);
