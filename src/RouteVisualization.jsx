import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const RouteVisualization = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [tollMarkers, setTollMarkers] = useState([]);
  const [startLocation, setStartLocation] = useState([37.7749, -122.4194]); // San Francisco, CA
  const [endLocation, setEndLocation] = useState([34.0522, -118.2437]); // Los Angeles, CA

  useEffect(() => {
    const fetchRouteData = async () => {
      // Fetch route data from a routing API (e.g., Mapbox Directions API)
      const apiKey = 'YOUR_MAPBOX_API_KEY';
      const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLocation[1]},${startLocation[0]};${endLocation[1]},${endLocation[0]}?geometries=geojson&access_token=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
          setRouteCoordinates(route);
          extractTollMarkers(data.routes[0].legs);
        }
      } catch (error) {
        console.error('Error fetching route data:', error.message);
      }
    };

    const extractTollMarkers = (legs) => {
      const markers = legs.reduce((acc, leg) => {
        const tolls = leg.annotation.tollCollection || [];
        tolls.forEach((toll) => {
          const [lng, lat] = toll.location;
          const marker = {
            position: [lat, lng],
            description: toll.tollName,
            amount: toll.cost,
          };
          acc.push(marker);
        });
        return acc;
      }, []);
      setTollMarkers(markers);
    };

    fetchRouteData();
  }, [startLocation, endLocation]);

  return (
    <MapContainer center={startLocation} zoom={6} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={startLocation}>
        <Popup>Start Location</Popup>
      </Marker>

      <Marker position={endLocation}>
        <Popup>End Location</Popup>
      </Marker>

      {routeCoordinates.length > 0 && <Polyline positions={routeCoordinates} color="blue" />}

      {tollMarkers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div>
              <h4>{marker.description}</h4>
              <p>Amount: ${marker.amount}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RouteVisualization;
