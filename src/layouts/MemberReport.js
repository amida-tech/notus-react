import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Grid, List, ListItem, Typography,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Banner from '../components/Common/Banner';
import Info from '../components/Common/Info';
import { updateTimestamp, getAge } from '../components/Utilities/GeneralUtil';
import env from '../env';

const generalInfoTip = 'The basic information about this patient, including provider and payor information.';
const measureAnalysisTip = 'Information about measurement compliance.';

const axios = require('axios').default;

const memberQueryUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members/info/`);

function MemberReport({ id }) {
  const [memberInfo, setMemberInfo] = useState({});
  const values = [];
  // let measure = '';

  useEffect(() => {
    axios.get(`${memberQueryUrl}?memberId=${id}`)
      .then((res) => {
        setMemberInfo(res.data);
        console.log(res.data);
      });
  }, [id]);

  if (memberInfo.memberId) {
    // measure = memberInfo.measurementType;
    const memberData = memberInfo[memberInfo.memberId]
    const denominatorFields = Object.keys(memberData).filter((field) => field.startsWith('Denominator'));

    denominatorFields.forEach((denomField) => {
      let numerField = 'Numerator';
      if (denomField.includes(' ')) {
        numerField += denomField.split(' ')[1];
      }
      let numerValue = '';
      let denomValue = '';
      if (Array.isArray(memberData[denomField])) {
        denomValue = memberData[denomField].length;
        numerValue = memberData[numerField].length;
      } else {
        denomValue = memberData[denomField] ? 1 : 0;
        numerValue = memberData[numerField] ? 1 : 0;
      }
      values.push(
        <ListItem key={denomField}>
          {denomField}
          {': '}
          {denomValue}
          {' - '}
          {numerField}
          {': '}
          {numerValue}
        </ListItem>,
      )
    });
  }

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
            { memberInfo.memberId }
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
        </Grid>
      </Box>
      <Box className="member-report__info-panel">
        <Box className="member-report__info-title">
          <Typography variant="h2" className="member-report__h2-header">
            Measure Analysis
          </Typography>
          <Info infoText={measureAnalysisTip} />
        </Box>
      </Box>
      <List>{values}</List>
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
