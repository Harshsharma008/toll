import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import * as polylineCodec from '@googlemaps/polyline-codec';
const RouteVisualization = () => {
  const [routePolyline, setRoutePolyline] = useState('');
  const [decodedRoute, setDecodedRoute] = useState([]);

  useEffect(() => {
    const fetchRouteData = async () => {
      // Fetch route data from the TollGuru API
      const apiKey = 'YOUR_TOLLGURU_API_KEY';
      const startLocation = '37.7749,-122.4194'; // San Francisco, CA
      const endLocation = '34.0522,-118.2437'; // Los Angeles, CA
      const apiUrl = `https://dev.tollguru.com/beta04/calc/here/cb?apiKey=${apiKey}&from=${startLocation}&to=${endLocation}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
          console.error('Error fetching route data:', data.error);
          return;
        }

        const polyline = data.trip[0].route.encoded_polyline;
        setRoutePolyline(polyline);

        // Decode the polyline using @googlemaps/polyline-codec
        const decodedRoute = polylineCodec.decode(polyline);
        setDecodedRoute(decodedRoute);
      } catch (error) {
        console.error('Error fetching route data:', error.message);
      }
    };

    fetchRouteData();
  }, []);

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={6} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {decodedRoute.length > 0 && <Polyline positions={decodedRoute} color="blue" />}
    </MapContainer>
  );
};

export default RouteVisualization;
