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
      recommendations: recommendationsGenerator(rowDataObj.recommendations, rowDataObj.measure) || 'N/A',
    }
  }
  function recommendationsGenerator(recommendationArray, rowDataMeasure) {
    let recommendation = ''
    let baseRecommendation = ''
    // IF recommendationArray IS GREATER THAN 1
    if (recommendationArray.length > 0) {
    // BASE RECOMMENDATIONS ARE BOLDED.
      baseRecommendation = <strong>{recommendationArray[0]}</strong>
      // ADDITIONAL RECOMMENDATIONS FORMATTED WITH SPACING
      const additionalRecommendations = recommendationArray.map((item, idx) => {
        if (idx !== 0) {
          // ADDITIONAL RECOMMENDATIONS WITH COLON OR 'OR'
          // IN STRING ARE STYLED WITH BOLD FONT WEIGHT
          if (item.includes(': ') || item === 'OR') {
            return (
              <li key={item} style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{item}</li>
            )
          }
          return (<li key={item} style={{ marginBottom: '0.5rem' }}>{item}</li>)
        }
        return ''
      })
      // WHAT WE RETURN IF recommendationArray IS GREATER THAN 1
      recommendation = (
        <div>
          <p>{baseRecommendation}</p>
          <ul style={{ listStyle: 'none', marginTop: '0.5rem' }}>
            {additionalRecommendations}
          </ul>
        </div>
      )
    } else {
    // IF recommendationArray IS EQUALS 0 RETURN NOT COMPLIANT.
    // ALL SUBMEASURES SHOULD HAVE A RECOMMENDATION.
      recommendation = (
        <strong>
          {'Member is '}
          <strong style={{ color: theme.palette.error.main }}>NOT COMPLIANT</strong>
          {' with '}
          {rowDataMeasure.toUpperCase()}
        </strong>
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
                  {/* IF STATUS IS TRUE WE RETURN COMPLAINT
                   RESULT IF NOT WE RETURN A RECOMENDATION */}
                  {row.status ? (
                    <strong>
                      {'Member is '}
                      <strong style={{ color: theme.palette.success.main }}>COMPLIANT</strong>
                      {' with '}
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
      exclusions: PropTypes.arrayOf(
        PropTypes.string,
      ),
      practitioner: PropTypes.string,
      dates: PropTypes.string,
      conditions: PropTypes.string,
      recommendations: PropTypes.arrayOf(
        PropTypes.string,
      ),
    }),
  ),
}

MemberReportTable.defaultProps = {
  rowData: {},
}

export default MemberReportTable;
