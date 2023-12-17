// import { useState } from 'react'
import Header from './components/Header'
import { Container, Grid, Paper } from '@mui/material';
import './App.css'
import LeftSide from './components/leftSide/LeftSide';
import Footer from './components/footer/Footer';
import TollCalculator from './calculator/Calculator';

function App() {
 

  return (
    <>
       
      <Header />
      <TollCalculator/>

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


