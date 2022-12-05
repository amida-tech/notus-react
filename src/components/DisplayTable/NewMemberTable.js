import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import theme from '../../assets/styles/AppTheme'

const columns = [
  { id: 'memberId', label: 'MemberID', align: 'left' },
  { id: 'aab', label: 'AAB', align: 'left' },
  { id: 'aab2', label: 'AAB-2', align: 'left' },
  { id: 'aab3', label: 'AAB-3', align: 'left' },
  { id: 'aab4', label: 'AAB-4', align: 'left' },
  { id: 'aab5', label: 'AAB-5', align: 'left' },
  { id: 'aab6', label: 'AAB-6', align: 'left' },
  { id: 'aab7', label: 'AAB-7', align: 'left' },
  { id: 'aab8', label: 'AAB-8', align: 'left' },
  { id: 'aab9', label: 'AAB-9', align: 'left' },
  { id: 'aab10', label: 'AAB-10', align: 'left' },
  { id: 'aab11', label: 'AAB-11', align: 'left' },
  { id: 'aab12', label: 'AAB-12', align: 'left' },
  { id: 'aab13', label: 'AAB-13', align: 'left' },
  { id: 'aab14', label: 'AAB-14', align: 'left' },
];

function createData(row) {
  const memberObj = []
  delete row.value;
  delete row.type;
  memberObj.push(row.label);
  Object.values(row).forEach((val) => {
    if (val !== memberObj[0]) {
      memberObj.push(val)
    }
  })
  
  return { ...memberObj }
}

const rows = [
  createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
];

const mockCurrentResults = [{
    "value": "aise-1ed190b4-544d-4d70-a236-daed10a03f5e",
    "label": "aise-1ed190b4-544d-4d70-a236-daed10a03f5e",
    "type": "member",
    "aise": "false",
    "aise-1": "false",
    "aise-2": "true",
    "aise-3": "true",
    "aise-4": "true"
  },
  {
    "value": "aise-0ade383e-54cb-4e6f-a82e-7e7f0b190a76",
    "label": "aise-0ade383e-54cb-4e6f-a82e-7e7f0b190a76",
    "type": "member",
    "aise": "true",
    "aise-1": "true",
    "aise-2": "true",
    "aise-3": "true",
    "aise-4": "true"
  },
  {
    "value": "aise-916f93b0-112f-46f3-b275-a3c8ad659a9f",
    "label": "aise-916f93b0-112f-46f3-b275-a3c8ad659a9f",
    "type": "member",
    "aise": "false",
    "aise-1": "false",
    "aise-2": "false",
    "aise-3": "true",
    "aise-4": "true"
  },
  {
    "value": "aise-75d99812-a2b4-4c77-a475-4302aaceabc7",
    "label": "aise-75d99812-a2b4-4c77-a475-4302aaceabc7",
    "type": "member",
    "aise": "false",
    "aise-1": "false",
    "aise-2": "false",
    "aise-3": "true",
    "aise-4": "true"
  },
  {
    "value": "aise-9525616d-decc-46e0-858b-92089306e3d9",
    "label": "aise-9525616d-decc-46e0-858b-92089306e3d9",
    "type": "member",
    "aise": "true",
    "aise-1": "true",
    "aise-2": "true",
    "aise-3": "true",
    "aise-4": "true"
  }]

export default function newMemberTable({activeMeasure, headerInfo, currentResults}) {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  console.log(headerInfo)

  useEffect(() => {
    console.log('START')
    if (headerInfo.length > 1) {
      const columnData = []
      headerInfo.forEach((column) => {
        const headerObj = {}
        headerObj.id = column.key;
        headerObj.label = column.header;
        headerObj.align = column.flexBasis === 'larger' ? 'left' : 'center'
        columnData.push(headerObj)
        console.log('columnData', columnData)
        setColumns(columnData)
      })
    }

    if (mockCurrentResults) {
    const rowData = mockCurrentResults.map((row) => {
      return createData(row)
    })
    // setRows(rowData)
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.memberId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
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
