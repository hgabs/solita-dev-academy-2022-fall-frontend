import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

import { Alert, Breadcrumbs, Divider, Grid, Link, Typography } from '@mui/material';
import { Box, Tabs, Tab } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { useGetStationByIdQuery, useGetStationTopDeparturesQuery, useGetStationTopArrivalsQuery } from '../../apis/backends';
import { JourneyList } from '../journeys';

const buildRows = (data, attributes) => data.map(row => {
  const buildRow = {};
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].key == 'station_name') {
      buildRow[attributes[i].key] = <Link href={'/stations/' + row.station_id}>{row[attributes[i].key]}</Link>;
    } else {
      buildRow[attributes[i].key] = row[attributes[i].key];
    }
  }
  return buildRow;
});

const BasicTable = (data, headers, title) => {
  const rows = buildRows(data, headers);

  return (
    <>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{title}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(column => (
                <TableCell key={column.title}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={'r' + row.station_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {headers.map(item => (
                  <TableCell
                    key={item.key + '_' + row.station_id}
                    component="td"
                    scope="row">{row[item.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Station = () => {
  const [value, setValue] = useState(0);

  const { data: station, isFetching, errorStation } = useGetStationByIdQuery(id, { skip: false });
  const { data: departures, isFetching: isFetchingDepartures, errorDepartures } = useGetStationTopDeparturesQuery(id);
  const { data: arrivals, isFetching: isFetchingArrivals, errorArrivals } = useGetStationTopArrivalsQuery(id);

  const { id } = useParams();


  const departureHeader = [
    { key: 'departure_count', title: 'Depature Count' },
    { key: 'station_id', title: 'Station Id' },
    { key: 'station_name', title: 'Station Name' }
  ];

  const arrivalHeader = [
    { key: 'arrival_count', title: 'Arrival Count' },
    { key: 'station_id', title: 'Station Id' },
    { key: 'station_name', title: 'Station Name' }
  ];

  const departureTable = BasicTable(departures, departureHeader, 'Top 5 Departures');
  const arrivalTable = BasicTable(arrivals, arrivalHeader, 'Top 5 Arrivals');
  const position = [station.coordinates.lat, station.coordinates.lon];
  const coordinatesExists = position.every(x => x);

  const handleChange = (e, newValue) => setValue(newValue);

  if (!station || !departures || !arrivals) return;

  return (
    <Box mt={4}>
      <Grid container spacing={2}>

        <Grid item xl={12}>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/stations">
              Stations
            </Link>
          </Breadcrumbs>

          <Box sx={{ paddingTop: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography sx={{ float: 'left', marginRight: 6 }} variant="h4">{station.name}</Typography>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Statistics" {...a11yProps(0)} />
              <Tab label="Journeys" {...a11yProps(1)} />
            </Tabs>
          </Box>

        </Grid>

        <Grid item xl={12}>
          <TabPanel value={value} index={0}>
            <Grid container xl={12} spacing={6}>
              <Grid item xl={8}>
                {
                  coordinatesExists && <MapContainer
                    scrollWheelZoom={false}
                    center={position}
                    zoom={19}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}>
                      <Popup>
                        {station.address.street}<br />
                        {station.address.postalcode}, {station.address.city}
                      </Popup>
                    </Marker>
                  </MapContainer>
                }
                {!coordinatesExists && <Alert severity="error">No coordinates available for station.</Alert>}

                <Box pt={6} textAlign="center">
                  <Grid container xs={12}>
                    <Grid item sm={3}>
                      <Typography sx={{ fontWeight: 'bold' }} variant="h3">{station.departures}</Typography>
                      <Typography variant="body2">Departures</Typography>
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{ marginLeft: -1 }} />

                    <Grid item sm={3}>
                      <Typography sx={{ fontWeight: 'bold' }} component="span" variant="h3">{station.avg_departure_distance}</Typography>
                      <Typography component="span" variant="h5"> km</Typography>
                      <Typography variant="body2">Departure Distance (avg)</Typography>
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{ marginLeft: -1 }} />

                    <Grid item sm={3}>
                      <Typography sx={{ fontWeight: 'bold' }} variant="h3">{station.arrivals || '-'}</Typography>
                      <Typography variant="body2">Arrivals</Typography>
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{ marginLeft: -1 }} />

                    <Grid item sm={3}>
                      <Typography sx={{ fontWeight: 'bold' }} component="span" variant="h3">{station.avg_arrival_distance || '-'}</Typography>
                      <Typography component="span" variant="h5"> km</Typography>
                      <Typography variant="body2">Arrival Distance (avg)</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item container xl={4} spacing={2}>
                <Grid item xl={12} sm={6}>
                  <Box mb={4}>{departureTable}</Box>
                </Grid>

                <Grid item xl={12} sm={6}>
                  <Box>{arrivalTable}</Box>
                </Grid>
              </Grid>

            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <JourneyList />
          </TabPanel>

        </Grid>

      </Grid>
    </Box>
  );
}


export default Station;
