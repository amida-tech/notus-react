import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem,
  ListItemText, Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Banner from '../Common/Banner';
import Info from '../Common/Info';
import { getAge, getDatestamp, updateTimestamp } from '../Utilities/GeneralUtil';
import MemberReportTable from './MemberReportTable';

const generalInfoTip = 'The basic information about this member, including provider and payor information.';
const measureAnalysisTip = 'Information about measurement compliance, from dates to practitioners involved, and assessment on how to improve.';

function MemberReportDisplay({
  id,
  memberInfo,
  datastoreInfo,
  exportUrl,
  coverage,
  coverageStatus,
  rowData,
  description,
}) {
  const theme = useTheme()
  const coverageStatusColor = coverageStatus === 'active' ? theme.palette.success.main : theme.palette.error.main

  const descriptionCreator = (descriptionArr) => {
    let descrip = ''
    if (descriptionArr.length > 0) {
      let additionalDescriptions = ''
      if (description.length === 1) {
        additionalDescriptions = (
          <p style={{ margin: '0.5rem 0' }}>{descriptionArr[0]}</p>
        )
      } else {
        additionalDescriptions = descriptionArr.map((des, idx) => (
          idx !== 0
            ? <p key={des} style={{ marginTop: '0.5rem' }}>{des}</p>
            : <p key={des} style={{ fontWeight: 'bold' }}>{des}</p>))
      }

      descrip = additionalDescriptions
    } else {
      descrip = 'No description found for current measure'
    }
    return descrip
    // MAKE A NO FOUND RESPONSE
  }

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
        <List className="member-report__member-card">
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText
              sx={{ m: 0, display: 'flex', gap: '.5rem' }}
              primaryTypographyProps={{ fontWeight: '700' }}
              secondaryTypographyProps={{ alignSelf: 'center' }}
              primary="Member ID:"
              secondary={id}
            />
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText
              sx={{ m: 0, display: 'flex', gap: '.5rem' }}
              primaryTypographyProps={{ fontWeight: '700' }}
              secondaryTypographyProps={{ alignSelf: 'center' }}
              primary="Date of Birth:&nbsp;"
              secondary={memberInfo.dob || 'N/A'}
            />
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText
              sx={{ m: 0, display: 'flex', gap: '.5rem' }}
              primaryTypographyProps={{ fontWeight: '700' }}
              secondaryTypographyProps={{ alignSelf: 'center' }}
              primary="Age:&nbsp;"
              secondary={memberInfo.dob ? getAge(memberInfo.dob) : 'N/A'}
            />
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText
              sx={{ m: 0, display: 'flex', gap: '.5rem' }}
              primaryTypographyProps={{ fontWeight: '700' }}
              secondaryTypographyProps={{ alignSelf: 'center' }}
              primary="Gender:&nbsp;"
              secondary={memberInfo.gender || 'N/A'}
            />
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText
              sx={{ m: 0, display: 'flex', gap: '.5rem' }}
              primaryTypographyProps={{ fontWeight: '700' }}
              secondaryTypographyProps={{
                alignSelf: 'center',
                color: coverageStatusColor,
              }}
              primary="Coverage Status:&nbsp;"
              secondary={coverageStatus === 'active'
                ? 'ACTIVE'
                : 'INACTIVE'}
            />
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText
              sx={{ m: 0, display: 'flex', gap: '.5rem' }}
              primaryTypographyProps={{ fontWeight: '700' }}
              secondaryTypographyProps={{ alignSelf: 'center' }}
              primary="Participation Period:&nbsp;"
              secondary={coverageStatus ? `${getDatestamp(new Date(coverage[0].period.start.value))} - ${
                getDatestamp(new Date(coverage[0].period.end.value))}` : 'N/A'}
            />
          </ListItem>
        </List>

        {memberInfo.coverage && memberInfo.coverage.map((insurance) => (
          <List key={`insurance-card-${insurance.id.value}`} className="member-report__member-card">
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText
                sx={{ m: 0, display: 'flex', gap: '.5rem' }}
                primaryTypographyProps={{ fontWeight: '700' }}
                secondaryTypographyProps={{ alignSelf: 'center' }}
                primary="Policy ID:&nbsp;"
                secondary={insurance.id.value}
              />
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText
                sx={{ m: 0, display: 'flex', gap: '.5rem' }}
                primaryTypographyProps={{ fontWeight: '700' }}
                secondaryTypographyProps={{ alignSelf: 'center' }}
                primary="Payor/Provider:&nbsp;"
                secondary={insurance.payor[0]?.reference.value || 'N/A'}
              />
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText
                sx={{ m: 0, display: 'flex', gap: '.5rem' }}
                primaryTypographyProps={{ fontWeight: '700' }}
                secondaryTypographyProps={{ alignSelf: 'center' }}
                primary="Plan:&nbsp;"
                secondary="N/A"
              />
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText
                sx={{ m: 0, display: 'flex', gap: '.5rem' }}
                primaryTypographyProps={{ fontWeight: '700' }}
                secondaryTypographyProps={{ alignSelf: 'center' }}
                primary=" Dependents:&nbsp;"
                secondary="N/A"
              />
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText
                sx={{ m: 0, display: 'flex', gap: '.5rem' }}
                primaryTypographyProps={{ fontWeight: '700' }}
                secondaryTypographyProps={{ alignSelf: 'center' }}
                primary="Relationship:&nbsp;"
                secondary={insurance.relationship?.coding[0]?.code.value}
              />
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText
                sx={{ m: 0, display: 'flex', gap: '.5rem' }}
                primaryTypographyProps={{ fontWeight: '700' }}
                secondaryTypographyProps={{ alignSelf: 'center' }}
                primary="Type:&nbsp;"
                secondary={`${insurance.type?.coding[0].code.value} - ${insurance.type?.coding[0]?.display.value}` || 'N/A'}
              />
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText
                sx={{ m: 0, display: 'flex', gap: '.5rem' }}
                primaryTypographyProps={{ fontWeight: '700' }}
                secondaryTypographyProps={{ alignSelf: 'center' }}
                primary="Participation Period:&nbsp;"
                secondary={insurance.period ? `${getDatestamp(new Date(insurance.period.start.value))} - ${
                  getDatestamp(new Date(insurance.period.end.value))}` : 'N/A'}
              />
            </ListItem>
          </List>
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
      <Accordion defaultExpanded>
        <AccordionSummary className="member-report__accordion-summary" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4">
            {`${datastoreInfo[memberInfo.measurementType]?.displayLabel || '???'} - ${datastoreInfo[memberInfo.measurementType]?.title || 'Undefined Measure'}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="member-report__accordion-text">
            {descriptionCreator(description)}
          </Box>
          <Box className="member-report__table-display">
            <MemberReportTable
              rowData={rowData}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

MemberReportDisplay.propTypes = {
  id: PropTypes.string,
  memberInfo: PropTypes.shape({
    dob: PropTypes.string,
    timeStamp: PropTypes.string,
    gender: PropTypes.string,
    coverage: PropTypes.arrayOf(
      PropTypes.shape({
        any: PropTypes.string,
      }),
    ),
    measurementType: PropTypes.string,
  }),
  datastoreInfo: PropTypes.shape({
    any: PropTypes.string,
  }),
  exportUrl: PropTypes.string,
  coverage: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.shape({
        value: PropTypes.string,
      }),
      type: PropTypes.shape({
        coding: PropTypes.arrayOf(
          PropTypes.shape({
            system: PropTypes.shape({
              value: PropTypes.string,
            }),
            code: PropTypes.shape({
              value: PropTypes.string,
            }),
            display: PropTypes.shape({
              value: PropTypes.string,
            }),
          }),
        ),
      }),
      subscriber: PropTypes.shape({
        reference: PropTypes.shape({
          value: PropTypes.string,
        }),
      }),
      beneficiary: PropTypes.shape({
        reference: PropTypes.shape({
          value: PropTypes.string,
        }),
      }),
      relationship: PropTypes.shape({
        coding: PropTypes.arrayOf(
          PropTypes.shape({
            code: PropTypes.shape({
              value: PropTypes.string,
            }),
          }),
        ),
      }),
      period: PropTypes.shape({
        start: PropTypes.shape({
          value: PropTypes.string,
        }),
        end: PropTypes.shape({
          value: PropTypes.string,
        }),
      }),
      payor: PropTypes.arrayOf(
        PropTypes.shape({
          reference: PropTypes.shape({
            value: PropTypes.string,
          }),
        }),
      ),
      id: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
  ),
  coverageStatus: PropTypes.string,
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      any: PropTypes.string,
    }),
  ),
  description: PropTypes.arrayOf(PropTypes.string),
  recommendations: PropTypes.shape({
    measure: PropTypes.string,
    recommendation: PropTypes.string,
    subMeasures: PropTypes.arrayOf(
      PropTypes.shape({
        measure: PropTypes.string,
        recommendation: PropTypes.string,
      }),
    ),
  }),
}

MemberReportDisplay.defaultProps = {
  id: '',
  memberInfo: {},
  datastoreInfo: {},
  exportUrl: '',
  coverage: {},
  coverageStatus: '',
  rowData: [],
  description: [],
  recommendations: {},
}

export default MemberReportDisplay;
