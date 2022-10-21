import {Marker, LayerGroup, Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {Offers} from '../../types/offer';
import {City} from '../../types/offer';
import {URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  offers: Offers;
  city: City;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
//
// const currentCustomIcon = new Icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

function Map({city, offers}: MapProps) {
  const layersRef = useRef<LayerGroup | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      if (layersRef.current) {
        layersRef.current.clearLayers();
      }

      layersRef.current = new LayerGroup();

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });


        if (layersRef.current) {
          marker
            .setIcon(defaultCustomIcon)
            .addTo(layersRef.current);
        }
      });

      layersRef.current.addTo(map);
    }
  }, [map, offers]);

  useEffect(() => {
    if (map) {
      map.flyTo({
        lat: city.location.latitude,
        lng: city.location.longitude},
      city.location.zoom);
    }
  }, [map, city]);

  return (
    <div
      style={{ height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
