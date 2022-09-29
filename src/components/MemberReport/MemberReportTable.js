import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';

function MemberReportTable({ rowData }) {
  const formattedData = []
  const theme = useTheme()
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

  rowData.forEach((row) => { formattedData.push(createData(row)) })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="member table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '700' }}>Measure</TableCell>
            <TableCell sx={{ fontWeight: '700' }} align="center">Type</TableCell>
            <TableCell sx={{ fontWeight: '700' }} align="center">Status</TableCell>
            <TableCell sx={{ fontWeight: '700' }} align="center">Exclusions</TableCell>
            <TableCell sx={{ fontWeight: '700' }} align="center">Practitioner</TableCell>
            <TableCell sx={{ fontWeight: '700' }} align="center">Dates</TableCell>
            <TableCell sx={{ fontWeight: '700' }} align="center">Conditions</TableCell>
            <TableCell sx={{ fontWeight: '700' }} align="center">Recommendations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedData.map((row, i) => (
            <TableRow
              key={`table-row-for-${row.type}-${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.measure}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">
                {row.status
                  ? <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
                  : <CancelIcon sx={{ color: theme.palette.error.main }} /> }
              </TableCell>
              <TableCell align="center">{row.exclusions?.length > 0 ? row.exclusions : <CancelIcon sx={{ color: theme.palette.error.main }} />}</TableCell>
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
    PropTypes.shape({
      measure: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.bool,
      exclusions: PropTypes.bool,
      practitioner: PropTypes.string,
      dates: PropTypes.string,
      conditions: PropTypes.string,
      recommendations: PropTypes.string,
    }),
  ),
}

MemberReportTable.defaultProps = {
  rowData: {},
}

export default MemberReportTable;
