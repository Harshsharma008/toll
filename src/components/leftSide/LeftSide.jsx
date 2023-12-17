import  { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';

const LeftSide = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = () => {
    // Handle the submission logic (e.g., send data to the server, trigger an action, etc.)
    console.log('Source:', source);
    console.log('Destination:', destination);
  };

  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="Source"
        variant="outlined"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Destination"
        variant="outlined"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
};

export default LeftSide;
