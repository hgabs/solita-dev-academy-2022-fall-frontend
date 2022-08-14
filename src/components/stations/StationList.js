import { React, useState, useEffect } from 'react';
import { DataGrid, useGridApiRef, GridColDef } from '@mui/x-data-grid';
import { useGetAllStationsQuery, useGetStationByIdQuery } from '../../apis/backends';
import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const StationList = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const apiRef = useGridApiRef();
  const navigate = useNavigate();

  const [currentStation, setCurrentStation] = useState();

  const handleLinkClick = (params) => {
    navigate(`/stations/${params.id}`);
  };

  const dataColumns = [
    { field: 'id', headerName: 'Station Id' },
    {
      field: 'name', headerName: 'Station Name', flex: 1, renderCell: (params) => {
        return <Link to={'/stations/' + params.id}>{params.formattedValue}</Link>
      }
    }
  ];

  const { data, isLoading, isFetching, errors } = useGetAllStationsQuery({ keyword, page: page + 1, limit });

  const handleChangeRowsPerPage = value => {
    setLimit(value);
    setPage(0);
  };

  const handlePageChange = value => {
    setPage(value);
  }

  useEffect(() => {
    setKeyword(inputValue.trim());
    setOptions(options);
  }, [inputValue])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          fullWidth
          freeSolo={true}
          options={[]}
          value={keyword || undefined}
          getOptionLabel={option => option}
          onChange={(event, newValue) => {
            setPage(0);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue.trim());
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Stations" />
          )} />
      </Grid>
      <Grid item xs={12}>
        <DataGrid
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
          disableColumnFilter
          filterMode="server"
          apiReft={apiRef} />
      </Grid>
    </Grid>
  )
};

export default StationList;
