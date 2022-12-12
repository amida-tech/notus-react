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
  Grid,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  activeMeasureProps, headerInfoProps, rowEntriesProps,
} from '../ChartContainer/D3Props';

import theme from '../../assets/styles/AppTheme'

export default function MemberTable({ activeMeasure, headerInfo, rowEntries }) {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  function createData(row, columnDataSet) {
    const memberObj = {}
    const tempRow = structuredClone(row)
    delete tempRow.value;
    delete tempRow.type;
    memberObj.key = tempRow.label;
    Object.entries(tempRow).forEach(([key, val], i) => {
      if (val !== memberObj[0] && key !== 'type' && key !== 'value') {
        memberObj[columnDataSet[i]?.id] = val
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
          alignItems: 'center',
        }}
        >
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
          alignItems: 'center',
        }}
        >
          <CancelIcon
            sx={{ fontSize: 'xx-large', '&:hover': { fill: theme.palette?.error.main } }}
          />
          Unmatched
        </Grid>
      )
    }
    return (
      <Link
        style={{ color: theme.palette?.primary.main }}
        component={RouterLink}
        to={{ pathname: `/member/${labelValue}` }}
      >
        {labelValue}
      </Link>
    )
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

    if (rowEntries) {
      rowData = rowEntries.map((row) => createData(row, columnData))
      setRows(rowData)
    }
  }, [rowEntries, headerInfo])

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
                <TableRow hover role="checkbox" tabIndex={-1} aria-label={row.label} key={row.key}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`${activeMeasure.measure}${column.id}`} aria-label={`${column.id}`} align={column.align}>
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

MemberTable.propTypes = {
  activeMeasure: activeMeasureProps,
  headerInfo: headerInfoProps,
  rowEntries: rowEntriesProps,
}

MemberTable.defaultProps = {
  activeMeasure: {
    measure: '',
    denominator: 0,
    shortlabel: '',
    starRating: '',
    title: '',
  },
  headerInfo: [],
  rowEntries: [],
}
