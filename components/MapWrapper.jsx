import React, { useState, useEffect, useRef } from 'react';

function MapWrapper(props) {
  const { latitude, longitude } = props;
  const [map, setMap] = useState();
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          mapTypeControl: false,
          zoom: 10,
        })
      );
    }
  }, [mapRef, latitude, longitude]);

  return <div ref={mapRef} style={{ height: '500px' }}></div>;
}

export default MapWrapper;
