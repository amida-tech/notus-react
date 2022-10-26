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
    return {
      measure: rowDataObj.measure || 'N/A',
      type: rowDataObj.type || 'N/A',
      status: rowDataObj.status || null,
      exclusions: rowDataObj.exclusions || null,
      practitioner: rowDataObj.practitioner || 'N/A',
      dates: rowDataObj.dates || 'N/A',
      conditions: rowDataObj.conditions || 'N/A',
      recommendations: recommendationsGenerator(rowDataObj) || 'N/A',
    }
  }
  function recommendationsGenerator(rowDataObj) {
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
            <div>
              <strong>{baseRecommendation}</strong>
              <ul style={{ listStyle: 'none', marginTop: '0.5rem' }}>
                {additionalRecommendation.map((item) => <li key={item}>{item}</li>)}
                <li />
              </ul>
            </div>
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
    return recommendation
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
          {formattedData.map((row, idx) => {
            Object.assign(row, { key: idx })
            return (
              <TableRow
                key={row.key}
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
                <TableCell
                  align={
                row.type === 'Measure' || row.type === 'Sub-Measure'
                  ? 'left'
                  : 'center'
              }
                >
                  {row.status ? (
                    <strong>
                      {'Member is '}
                      <strong style={{ color: theme.palette.success.main }}>COMPLIANT</strong>
                      {' of '}
                      {row.measure.toUpperCase()}
                    </strong>
                  ) : row.recommendations}
                </TableCell>
              </TableRow>
            )
          })}
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
