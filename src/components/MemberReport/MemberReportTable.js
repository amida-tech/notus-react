import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';

function MemberReportTable(rowData) {
  const formattedData = []
  function createData(rowDataObj) {
    return {
      measure: rowDataObj.measure || 'N/A',
      type: rowDataObj.type || 'N/A',
      status: rowDataObj.status || null,
      exclusions: rowDataObj.exclusions || null,
      practitioner: rowDataObj.practitioner || 'N/A',
      dates: rowDataObj.dates || 'N/A',
      conditions: rowDataObj.conditions || 'N/A',
      recommendations: rowDataObj.recommendations || 'N/A',
    }
  }

  rowData.rowData.forEach((row) => { formattedData.push(createData(row)) })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="member table">
        <TableHead>
          <TableRow>
            <TableCell>Measure</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Exclusions</TableCell>
            <TableCell align="center">Practitioner</TableCell>
            <TableCell align="center">Dates</TableCell>
            <TableCell align="center">Conditions</TableCell>
            <TableCell align="center">Recommendations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedData.map((row) => (
            <TableRow
              key={row.type}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.measure}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.status ? <CheckCircleIcon /> : <CancelIcon />}</TableCell>
              <TableCell align="center">{row.exclusions.length > 0 ? row.exclusions : <CancelIcon />}</TableCell>
              <TableCell align="center">{row.practitioner}</TableCell>
              <TableCell align="center">{row.dates}</TableCell>
              <TableCell align="center">{row.conditions}</TableCell>
              <TableCell align="center">{row.recommendations}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MemberReportTable.propTypes = {
  rowData: PropTypes.arrayOf(
    PropTypes.string,
  ),
}

MemberReportTable.defaultProps = {
  rowData: {},
}

export default MemberReportTable;
