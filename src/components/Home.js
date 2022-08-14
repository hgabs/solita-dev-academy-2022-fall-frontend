import React from 'react';
import { Box } from '@mui/system';
import { StationList } from './stations';
import { JourneyList } from './journeys';
import { Grid, Typography } from '@mui/material';


const Home = () => {
  return (
    <>
      <Box>
        <Grid container spacing={4}>
          <Grid item xl={3}>
            <Typography variant="h5"></Typography>
            <StationList />
          </Grid>

          <Grid item xl={9}>
            <JourneyList />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}


export default Home;
