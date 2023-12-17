// import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', padding: '20px 0', marginTop: 'auto' }}>
      <Container maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '10vh', // Set minimum height to 100% of the viewport
          minWidth:'100vh'
        }}>
        <Box 
        display="flex" justifyContent="space-between"
         alignItems="center"  flexDirection={{ xs: 'column', md: 'row' }} flex={1} >
          {/* Social Media Icons */}
          <Box>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit">
              <LinkedInIcon />
            </IconButton>
          </Box>

          {/* Topic List */}
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              Topics
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Typography variant="body2">Company</Typography>
              </li>
              <li>
                <Typography variant="body2">Products</Typography>
              </li>
              <li>
                <Typography variant="body2">Plan Your Trip With Us</Typography>
              </li>
              <li>
                <Typography variant="body2">Legal</Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
