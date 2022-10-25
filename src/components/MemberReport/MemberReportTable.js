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
  function createTableRows(rowDataObj) {
    let recommendation = (
      <strong>
        {'Member is '}
        <strong style={{ color: theme.palette.error.main }}>NOT COMPLIANT</strong>
        {' of '}

      </strong>
    )
    if (rowDataObj.recommendations) {
      const baseRecommendation = rowDataObj.recommendations.recommendation
      const additionalRecommendation = rowDataObj.recommendations.recommendation_list
      if (baseRecommendation) {
        recommendation = baseRecommendation
        if (additionalRecommendation.length > 0) {
          recommendation = (
            <p>
              <strong>{baseRecommendation}</strong>
              <ul style={{ listStyle: 'none', marginTop: '0.5rem' }}>
                {additionalRecommendation.map((item) => <li>{item}</li>)}
                <li />
              </ul>
            </p>
          )
        }
      }
    } else {
      recommendation = (
        <p>
          No Recommendations available for
          {' '}
          <strong>{rowDataObj.measure.toUpperCase()}</strong>
          {' '}
          at this moment. Please check back soon.
        </p>
      )
    }
    return (
      <TableRow
        key={rowDataObj.type}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{rowDataObj.measure}</TableCell>
        <TableCell align="center">{rowDataObj.type}</TableCell>
        <TableCell align="center">
          {rowDataObj.status
            ? <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
            : <CancelIcon sx={{ color: theme.palette.error.main }} /> }
        </TableCell>
        <TableCell align="center">{rowDataObj.exclusions?.length > 0 ? rowDataObj.exclusions : <CancelIcon sx={{ color: theme.palette.error.main }} />}</TableCell>
        <TableCell align="center">{rowDataObj.practitioner}</TableCell>
        <TableCell align="center">{rowDataObj.dates}</TableCell>
        <TableCell
          align={
          rowDataObj.type === 'Measure' || rowDataObj.type === 'Sub-Measure'
            ? 'left'
            : 'center'
        }
        >
          {rowDataObj.status ? (
            <strong>
              {'Member is '}
              <strong style={{ color: theme.palette.success.main }}>COMPLIANT</strong>
              {' of '}
              {rowDataObj.measure.toUpperCase()}
            </strong>
          ) : recommendation}
        </TableCell>
      </TableRow>
    )
  }

  rowData.forEach((row) => { formattedData.push(createTableRows(row)) })

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
            <TableCell sx={{ fontWeight: '700' }} align="left">Recommendations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedData.map((row) => row)}
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
      exclusions: PropTypes.arrayOf(
        PropTypes.string,
      ),
      practitioner: PropTypes.string,
      dates: PropTypes.string,
      conditions: PropTypes.string,
      recommendations: PropTypes.shape({
        recommendation: PropTypes.string,
        recommendation_list: PropTypes.arrayOf(
          PropTypes.string,
        ),
      }),
    }),
  ),
}

MemberReportTable.defaultProps = {
  rowData: {},
}

export default MemberReportTable;
