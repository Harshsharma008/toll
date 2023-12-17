import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const TollCalculator = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [tollAmount, setTollAmount] = useState(null);
  const [isFromSelected, setIsFromSelected] = useState(true);

  const onMapClick = (e) => {
    const clickedLocation = [e.latlng.lat, e.latlng.lng];

    if (isFromSelected) {
      setFromLocation(clickedLocation);
    } else {
      setToLocation(clickedLocation);
    }

    // Toggle between "From" and "To"
    setIsFromSelected(!isFromSelected);
  };


  const calculateToll = async () => {
    if (fromLocation && toLocation) {
      console.log('From:', fromLocation);
      console.log('To:', toLocation);
      // Implement your toll calculation logic using TollGuru API here
    }
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <h1>Toll Calculator</h1>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label={isFromSelected ? 'From' : 'To'}
            value={isFromSelected ? (fromLocation ? `${fromLocation[0]}, ${fromLocation[1]}` : '') : (toLocation ? `${toLocation[0]}, ${toLocation[1]}` : '')}
            disabled
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label={!isFromSelected ? 'From' : 'To'}
            value={!isFromSelected ? (fromLocation ? `${fromLocation[0]}, ${fromLocation[1]}` : '') : (toLocation ? `${toLocation[0]}, ${toLocation[1]}` : '')}
            disabled
          />
        </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={calculateToll}
            sx={{ marginBottom: 2 }}
          >
            Calculate Toll
          </Button>
        </Grid>
        <Grid item xs={12}>
          {tollAmount !== null && (
            <div className="result">
              <h2>Toll Amount</h2>
              <p>${tollAmount}</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '400px', width: '100%', marginTop: '20px' }}
          onClick={onMapClick}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {fromLocation && (
            <Marker position={fromLocation}>
              <Popup>From</Popup>
            </Marker>
          )}
          {toLocation && (
            <Marker position={toLocation}>
              <Popup>To</Popup>
            </Marker>
          )}
        </MapContainer>
      </Grid>
    </div>
  );
};

export default TollCalculator;
