import React, { Fragment } from "react";
import { GoogleMap, useJsApiLoader  } from '@react-google-maps/api';
const containerStyle = {
  width: '1140px',
  left: '50px',
  top: '40px',
  height: '700px'

};

const center = {
  lat: 2.9420157417112534,
  lng: -75.29844381962066
};
const MapsApi = ()=>{
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""  //Aqui va la API
  })

const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  
  return <div style={{position:'relative',}}>
   
    {isLoaded ? <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={8}
    onLoad={onLoad}
    onUnmount={onUnmount}
  >
    { /* Child components, such as markers, info windows, etc. */ }
    <></>
  </GoogleMap>
  :<></>
    }

  </div>

  
}

export default MapsApi;