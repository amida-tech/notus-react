import { useState } from 'react';
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

function createData(memberId, aab, aab2, aab3, aab4, aab5, aab6, aab7, aab8, aab9, aab10, aab11, aab12, aab13, aab14) {
  return { memberId, aab, aab2, aab3, aab4, aab5, aab6, aab7, aab8, aab9, aab10, aab11, aab12, aab13, aab14 };
}

const rows = [
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51644382-3037-4e40-a1e0-054433bfcd7b', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51123382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646482-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-23446382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-12646382-3037-4e40-a1e0-054433bfcd7b', 'unmatched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-78946382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-86546382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646432-3037-4e40-a1e0-054433bfcd7b', 'unmatched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-31643482-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-21632382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'unmatched', 'unmatched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'unmatched', 'unmatched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'unmatched', 'unmatched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'unmatched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'matched'),
    createData('aab-51646382-3037-4e40-a1e0-054433bfcd7b', 'matched', 'unmatched'),
];

export default function newMemberTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

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
                    backgroundColor: theme.palette?.background.main
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
              .map((row) => {
                return (
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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