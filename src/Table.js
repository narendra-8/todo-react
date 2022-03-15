import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {columnHeaders,rowHeaders,jobTotals,lastRowData,genCellValues} from './TableFunctions';

//Column Value Generation
const columns = ['Job/Name',...columnHeaders(),'Total'];

//Row Data Generation
function createData(...values) {
  let targetData={};
  const data=['job',...columns.slice(1)];
  for(let i=0;i<data.length;i++){
      targetData[data[i]]=values[i]
  }
  return {...targetData };
}

const rows = [
  ...rowHeaders().map((value)=>createData(`${value}`,...columnHeaders().map((data)=>genCellValues(data,value)),jobTotals(value))),
   createData('Total', ...lastRowData())
];

//Table Styling
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'lightgrey'
    }
  }));

export default function TargetTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
             <StyledTableCell>{columns[0]}</StyledTableCell>
            {columns.slice(1).map((value,index)=><StyledTableCell align="left" key={index}>{value}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.job}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{backgroundColor:'lavender'}} component="th" scope="row">
                {row.job}
              </TableCell>
              { columns.slice(1).map((value,index)=>
              <TableCell key={index} align="right">{row[value]}</TableCell>)
             }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}