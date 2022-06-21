import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Banner from '../components/Common/Banner';
import Info from '../components/Common/Info';
import DisplayTable from '../components/DisplayTable/DisplayTable';
import { updateTimestamp, getDatestamp, getAge } from '../components/Utilities/GeneralUtil';
import ReportTable from '../components/Utilities/ReportTable';
import ReportTableRow from '../components/DisplayTable/ReportTableRow';
import { DatastoreContext } from '../context/DatastoreProvider';
import env from '../env';

const generalInfoTip = 'The basic information about this patient, including provider and payor information.';
const measureAnalysisTip = 'Information about measurement compliance, from dates to practitioners involved, and assessment on how to improve.';

const axios = require('axios').default;

const memberQueryUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members/info/`);

function MemberReport({ id }) {
  const { datastore } = useContext(DatastoreContext);
  const [memberInfo, setMemberInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    axios.get(`${memberQueryUrl}?memberId=${id}`)
      .then((res) => {
        setMemberInfo(res.data);
      });
  }, [id]);

  useEffect(() => {
    if (Object.keys(datastore.info).length > 0 && memberInfo.measurementType !== undefined) {
      setIsLoading(datastore.isLoading);
      setRowData(ReportTable.formatData(
        memberInfo,
        memberInfo.measurementType,
        datastore.info,
      ));
    }
  }, [datastore, memberInfo]);

  const coverage = memberInfo.coverage?.find((item) => item.status?.value === 'active');

  return (
    <Box className="member-report">
      <Banner headerText="Reporting - Member's Data" lastUpdated={updateTimestamp(new Date(memberInfo.timeStamp))} />
      <Box className="member-report__info-panel">
        <Box className="member-report__info-title">
          <Typography variant="h2" className="member-report__h2-header">
            General Information
          </Typography>
          <Info infoText={generalInfoTip} />
        </Box>
        <Button disabled className="member-report__download-icon" startIcon={<FileDownloadIcon />}>
          <Typography variant="caption">
            Export
          </Typography>
        </Button>
      </Box>
      <Box className="member-report__info-display">
        <Grid className="member-report__patient-card">
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
            <Typography className={`member-report__coverage member-report__coverage--${coverage?.status.value || 'inactive'}`}>
              { coverage?.status.value || 'inactive' }
            </Typography>
          </Box>
          <Box className="member-report__info-field">
            <Typography className="member-report__info-label">
              Participation Period:&nbsp;
            </Typography>
            { coverage ? `${getDatestamp(new Date(coverage.period.start.value))} - ${
              getDatestamp(new Date(coverage.period.end.value))}` : 'N/A' }
          </Box>
        </Grid>
        {memberInfo.coverage && memberInfo.coverage.map((insurance) => (
          <Grid key={`insurance-card-${insurance.id.value}`} className="member-report__patient-card">
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
      {isLoading ? (
        <Grid className="member-report__loading-container">
          <CircularProgress size={250} thickness={3} className="member-report__loading-spinner" />
        </Grid>
      ) : (
        <Accordion>
          <AccordionSummary className="member-report__accordion-summary" expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h4">
              {`${datastore.info[memberInfo.measurementType].displayLabel} - ${datastore.info[memberInfo.measurementType].title}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="member-report__accordion-text">
              Info coming soon.
            </Typography>
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
      )}
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
