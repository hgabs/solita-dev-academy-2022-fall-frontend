import React from "react";
import Table from '@mui/material/Table';
import Typography from "@mui/material/Typography";
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "@mui/material/Link";

const buildRows = (data, attributes) => data.map(row => {
  const buildRow = {};
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].key === 'station_name') {
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


export default BasicTable;
