// import { useState } from 'react'
import Header from './components/header/Header.jsx';
// import { Container, Grid, Paper } from '@mui/material';
import './App.css'
import Footer from './components/footer/Footer.jsx';
import TollCalculator from './calculator/Calculator';
import RouteVisualization from './RouteVisualization.jsx';

function App() {
 

  return (
    <>
       
      {/* <Header /> */}
      <RouteVisualization/>
      {/* <TollCalculator/> */}

      {/* <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}> */}
          {/* Left Side */}
          {/* <Grid item xs={12} md={6}>
            <Paper sx={{  height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div >
                <LeftSide/>
              </div>
            
            </Paper>
          </Grid> */}

          {/* Right Side */}
          {/* <Grid item xs={12} md={6}>
            <Paper sx={{  height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div >
                Right Side Content
              </div>
             
            </Paper>
          </Grid>
        </Grid>
        
      </Container> */}
      <Footer/>
      </>
  );
    }
  export default App;


