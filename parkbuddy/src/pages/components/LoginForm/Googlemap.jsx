import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function LocationPicker() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
  });

  const [selectedLocation, setSelectedLocation] = useState(center);

  const onMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedLocation}
      zoom={10}
      onClick={onMapClick}
    >
      {selectedLocation && (
        <Marker position={selectedLocation} />
      )}
    </GoogleMap>
  ) : (
    <p>Loading...</p>
  );
}

export default React.memo(LocationPicker);
