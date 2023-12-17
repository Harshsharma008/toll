import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMapEvents } from 'react-leaflet';
import * as polylineCodec from '@googlemaps/polyline-codec';

const RouteVisualization = () => {
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [toCoordinates, setToCoordinates] = useState(null);
  const [decodedRoute, setDecodedRoute] = useState([]);
  const [tollAmount, setTollAmount] = useState(null);

  const handleMapClick = (e) => {
    console.log("click", e)
    const clickedCoordinates = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    };

    // Determine if it's "from" or "to" click
    if (!fromCoordinates) {
      setFromCoordinates(clickedCoordinates);
    } else if (!toCoordinates) {
      setToCoordinates(clickedCoordinates);
    } else {
      // Reset coordinates if both "from" and "to" are already set
      setFromCoordinates(clickedCoordinates);
      setToCoordinates(null);
    }
  };

  useEffect(() => {
    // Fetch route data when both "from" and "to" coordinates are available
    if (fromCoordinates && toCoordinates) {
      const fetchRouteData = async () => {
        // Fetch route data from the TollGuru API
        const apiKey = 'HjbBFnHMmDLmHQPRL44dBqD6FggTmF4';
        const from = `${fromCoordinates.lat},${fromCoordinates.lng}`;
        const to = `${toCoordinates.lat},${toCoordinates.lng}`;
        const apiUrl = `https://dev.tollguru.com/beta04/calc/here/cb?apiKey=${apiKey}&from=${from}&to=${to}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.error) {
            console.error('Error fetching route data:', data.error);
            return;
          }

          const polyline = data.trip[0].route.encoded_polyline;
          setDecodedRoute(polylineCodec.decode(polyline));

          // For simplicity, assuming a flat rate of $0.10 per kilometer
          const rate = 0.10;
          const calculatedToll = data.trip[0].costs.total * rate;
          setTollAmount(calculatedToll.toFixed(2));
        } catch (error) {
          console.error('Error fetching route data:', error.message);
        }
      };

      fetchRouteData();
    }
  }, [fromCoordinates, toCoordinates]);

  return (
    <div>
      <div>
        <label>From Coordinates:</label>
        <input type="text" value={fromCoordinates ? `${fromCoordinates.lat}, ${fromCoordinates.lng}` : ''} readOnly />
      </div>

      <div>
        <label>To Coordinates:</label>
        <input type="text" value={toCoordinates ? `${toCoordinates.lat}, ${toCoordinates.lng}` : ''} readOnly />
      </div>

      {tollAmount !== null && (
        <div>
          <label>Toll Amount:</label>
          <input type="text" value={`$${tollAmount}`} readOnly />
        </div>
      )}

      <MapContainer center={[37.7749, -122.4194]} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <CustomClickHandler onClick={handleMapClick} />

        {fromCoordinates && (
          <Marker position={fromCoordinates}>
            <Popup>From Coordinates: {`${fromCoordinates.lat}, ${fromCoordinates.lng}`}</Popup>
          </Marker>
        )}

        {toCoordinates && (
          <Marker position={toCoordinates}>
            <Popup>To Coordinates: {`${toCoordinates.lat}, ${toCoordinates.lng}`}</Popup>
          </Marker>
        )}

        {decodedRoute.length > 0 && <Polyline positions={decodedRoute} color="blue" />}
      </MapContainer>
    </div>
  );
};

// CustomClickHandler component to handle map clicks
const CustomClickHandler = ({ onClick }) => {
  const map = useMapEvents({
    click: (e) => {
      onClick(e);
    },
  });

  return null;
};

export default RouteVisualization;
