import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import theme from '../../assets/styles/AppTheme'

export default function newMemberTable({activeMeasure, headerInfo, currentResults}) {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  function createData(row, columns) {
    const memberObj = {}
    delete row.value;
    delete row.type;
    memberObj.key = row.label;
    Object.values(row).forEach((val, i) => {
      if (val !== memberObj[0]) {
        memberObj[columns[i]?.id] = val
      }
    })
    return { ...memberObj }
  }

  const complianceIcons = (labelValue) => {
    if (labelValue === 'true') {
      return (
        <Grid sx={{
          color: theme.palette?.success.main,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <CheckCircleIcon
          sx={{ fontSize: 'xx-large', '&:hover': { fill: theme.palette?.success.main } }}
        />
        Matched
      </Grid>
      )
    } else if (labelValue === 'false') {
      return (
        <Grid sx={{
          color: theme.palette?.error.main,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <CancelIcon
            sx={{ fontSize: 'xx-large', '&:hover': { fill: theme.palette?.error.main } }}
          />
          Unmatched
        </Grid>
      )
    } else {
      return labelValue
    }
  }

  useEffect(() => {
    const columnData = []
    let rowData = []

    if (headerInfo.length > 1) {
      headerInfo.forEach((column) => {
        const headerObj = {}
        headerObj.id = column.key;
        headerObj.label = column.header;
        headerObj.align = column.flexBasis === 'larger' ? 'left' : 'center'
        columnData.push(headerObj)
        setColumns(columnData)
      })
    }

    if (currentResults) {
    rowData = currentResults.map((row, i) => {
      return createData(row, columnData)
    })
    setRows(rowData)
    }
  }, [currentResults])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <TableCell
                  key={column.id}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    color: theme.palette?.bluegray.D1,
                    minWidth: idx === 0 ? '18rem' : '8rem',
                    backgroundColor: theme.palette?.background.main,
                  }}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {complianceIcons(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100]}
        sx={{ color: theme.palette?.bluegray.L1 }}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
