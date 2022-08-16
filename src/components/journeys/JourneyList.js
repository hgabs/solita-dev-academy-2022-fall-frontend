import { React, useState } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useGetAllJourneysQuery } from '../../apis/backends';
import { useParams, Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField, Grid } from '@mui/material';
import moment from 'moment';


const JourneyList = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState(null);
  const [filter, setFilter] = useState();
  const [operator, setOperator] = useState();
  const [value, setValue] = useState();
  const [sortModel, setSortModel] = useState([
    { field: 'id', sort: 'desc' }
  ]);

  const apiRef = useGridApiRef();

  const getDepartureStationLink = (params) => {
    return <Link to={`/stations/${params.row.departure_station_id}`}>{params.row.departure_station_name}</Link>;
  }

  const getArrivalStationLink = (params) => {
    return <Link to={`/stations/${params.row.arrival_station_id}`}>{params.row.arrival_station_name}</Link>;
  }

  const dataColumns = [
    { field: 'id', headerName: 'Journey Id', sortable: true },
    { field: 'departure_station_name', headerName: 'Departing From', type: 'string', editable: true, flex: 1, renderCell: getDepartureStationLink },
    { field: 'departure_time', headerName: 'Departure Time', type: 'dateTime', sortable: true, flex: 1 },
    { field: 'arrival_station_name', headerName: 'Arriving To', type: 'string', flex: 1, renderCell: getArrivalStationLink },
    { field: 'arrival_time', headerName: 'Arrival Time', type: 'dateTime', sortable: true, flex: 1 },
    { field: 'distance', headerName: 'Distance (km)', sortable: true, type: 'number', flex: 0.5 },
    { field: 'duration', headerName: 'Duration (min)', sortable: true, type: 'string', flex: 0.5 },
  ];

  const { id } = useParams();

  const queryArguments = {
    id,
    page: page + 1,
    limit,
    date: date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : undefined,
    ...sortModel[0],
    filter,
    operator,
    value
  }

  const { data, isLoading, isFetching, errors } = useGetAllJourneysQuery(queryArguments);

  const handleChangeRowsPerPage = value => {
    setLimit(value);
    setPage(0);
  };

  const handlePageChange = value => {
    setPage(value);
  }

  const handleFilterModelChange = (newFilter) => {
    if (!newFilter.items) return;
    setFilter(newFilter.items[0].columnField);
    setOperator(newFilter.items[0].operatorValue);
    setValue(newFilter.items[0].value);
  }

  const handleSortModelChange = (newSort) => {
    setSortModel(newSort);
  }

  return (
    <>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <DatePicker
            views={['year','month']}
            inputFormat="MM.YYYY"
            openTo='month'
            label="Filter By Month"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => <TextField fullWidth {...params} helperText={null} />}
          />
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'desc' }],
              },
            }}
            experimentalFeatures={{ newEditingApi: true }}
            loading={isFetching}
            rowHeight={70}
            autoHeight={true}
            paginationMode={'server'}
            page={page}
            onPageChange={handlePageChange}
            rows={data?.results || []}
            rowCount={data?.count || 0}
            rowsPerPageOptions={[5, 10, 20, 50]}
            pageSize={limit}
            onPageSizeChange={handleChangeRowsPerPage}
            columns={dataColumns}
            onFilterModelChange={handleFilterModelChange}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            apiReft={apiRef} />

        </Grid>
      </Grid>

    </>
  )
};

export default JourneyList;
