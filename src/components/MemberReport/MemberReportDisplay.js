import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import Banner from '../Common/Banner';
import Info from '../Common/Info';
import DisplayTable from '../DisplayTable/DisplayTable';
import ReportTableRow from '../DisplayTable/ReportTableRow';
import { getAge, getDatestamp, updateTimestamp } from '../Utilities/GeneralUtil';
import ReportTable from '../Utilities/ReportTable';

const generalInfoTip = 'The basic information about this member, including provider and payor information.';
const measureAnalysisTip = 'Information about measurement compliance, from dates to practitioners involved, and assessment on how to improve.';

function MemberReport({ id, memberInfo, datastoreInfo, exportUrl, coverageStatus, rowData, description }) {

  return (
    <Box className="member-report" sx={{ background: 'white' }}>
      <Banner headerText="Reporting - Member's Data" lastUpdated={updateTimestamp(new Date(memberInfo.timeStamp))} />
      <Box className="member-report__info-panel">
        <Box className="member-report__info-title">
          <Typography variant="h2" className="member-report__h2-header">
            General Information
          </Typography>
          <Info infoText={generalInfoTip} />
        </Box>
        <a href={exportUrl} target="_parent" rel="noreferrer">
          <Button className="member-report__download-icon" startIcon={<FileDownloadIcon />}>
            <Typography variant="caption">
              Export
            </Typography>
          </Button>
        </a>
      </Box>
      <Box className="member-report__info-display">
        <Grid className="member-report__member-card">
          <Box className="member-report__info-field">
            <Typography className="member-report__info-label">
              MemberID:&nbsp;
            </Typography>
            { id }
          </Box>
          <Box className="member-report__info-field">
            <Typography className="member-report__info-label">
              Date of Birth:&nbsp;
            </Typography>
            { memberInfo.dob || 'N/A' }
          </Box>
          <Box className="member-report__info-field">
            <Typography className="member-report__info-label">
              Age:&nbsp;
            </Typography>
            { memberInfo.dob ? getAge(memberInfo.dob) : 'N/A' }
          </Box>
          <Box className="member-report__info-field">
            <Typography className="member-report__info-label">
              Gender:&nbsp;
            </Typography>
            { memberInfo.gender || 'N/A' }
          </Box>
          <Box className="member-report__info-field">
            <Typography className="member-report__info-label">
              Coverage Status:&nbsp;
            </Typography>
            <Typography className={`member-report__coverage member-report__coverage--${coverageStatus?.status.value || 'inactive'}`}>
              { coverageStatus?.status.value || 'inactive' }
            </Typography>
          </Box>
          <Box className="member-report__info-field">
            <Typography className="member-report__info-label">
              Participation Period:&nbsp;
            </Typography>
            { coverageStatus ? `${getDatestamp(new Date(coverageStatus.period.start.value))} - ${
              getDatestamp(new Date(coverageStatus.period.end.value))}` : 'N/A' }
          </Box>
        </Grid>
        {memberInfo.coverage && memberInfo.coverage.map((insurance) => (
          <Grid key={`insurance-card-${insurance.id.value}`} className="member-report__member-card">
            <Box className="member-report__info-field">
              <Typography className="member-report__info-label">
                Policy ID:&nbsp;
              </Typography>
              { insurance.id.value }
            </Box>
            <Box className="member-report__info-field">
              <Typography className="member-report__info-label">
                Payor/Provider:&nbsp;
              </Typography>
              { insurance.payor[0]?.reference.value || 'N/A' }
            </Box>
            <Box className="member-report__info-field">
              <Typography className="member-report__info-label">
                Plan:&nbsp;
              </Typography>
              N/A
            </Box>
            <Box className="member-report__info-field">
              <Typography className="member-report__info-label">
                Dependents:&nbsp;
              </Typography>
              N/A
            </Box>
            <Box className="member-report__info-field">
              <Typography className="member-report__info-label">
                Relationship:&nbsp;
              </Typography>
              <Typography className="member-report__relationship-label">
                {insurance.relationship?.coding[0]?.code.value}
              </Typography>
            </Box>
            <Box className="member-report__info-field">
              <Typography className="member-report__info-label">
                Type:&nbsp;
              </Typography>
              {`${insurance.type?.coding[0].code.value} - ${insurance.type?.coding[0]?.display.value}` || 'N/A' }
            </Box>
            <Box className="member-report__info-field">
              <Typography className="member-report__info-label">
                Participation Period:&nbsp;
              </Typography>
              { insurance.period ? `${getDatestamp(new Date(insurance.period.start.value))} - ${
                getDatestamp(new Date(insurance.period.end.value))}` : 'N/A' }
            </Box>
          </Grid>
        ))}
      </Box>
      <Box className="member-report__info-panel">
        <Box className="member-report__info-title">
          <Typography variant="h2" className="member-report__h2-header">
            Measure Analysis
          </Typography>
          <Info infoText={measureAnalysisTip} />
        </Box>
      </Box>
        <Accordion>
          <AccordionSummary className="member-report__accordion-summary" expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h4">
              {`${datastoreInfo[memberInfo.measurementType].displayLabel} - ${datastoreInfo[memberInfo.measurementType].title}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="member-report__accordion-text">
              {description}
            </Box>
            <Box className="member-report__table-display">
              <DisplayTable
                rowData={rowData}
                headerInfo={ReportTable.headerData}
                pageSize={ReportTable.pageSize}
                useCheckBox={false}
                invertedColor
              >
                {rowData.map((item) => (
                  <ReportTableRow
                    key={`report-table-row-${item.value}`}
                    rowDataItem={item}
                    headerInfo={ReportTable.headerData}
                  />
                ))}
              </DisplayTable>
            </Box>
          </AccordionDetails>
        </Accordion>
    </Box>
  )
}

MemberReport.propTypes = {
  id: PropTypes.string,
}

MemberReport.defaultProps = {
  id: '',
}

export default MemberReport;