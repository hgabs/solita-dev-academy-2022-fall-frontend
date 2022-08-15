import React from 'react';
import { CircularProgress, Box } from '@mui/material';


const Loader = () => {
  return (<Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    border: '1px green solid',
    flexDirection: 'column',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    background: 'rgba(255,255,255,1)',
    height: '100%' }}>
    <CircularProgress size="10vh" />
  </Box>);
}


export default Loader;
