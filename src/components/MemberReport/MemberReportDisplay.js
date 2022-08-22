import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography, List, ListItem, ListItemText,
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
            <ListItemText sx={{ ml: '10px' }}
              primary="MemberID:"
              secondary={id}
            >
            </ListItemText>
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText sx={{ ml: '10px' }}
              primary="Date of Birth:&nbsp;"
              secondary={ memberInfo.dob || 'N/A' }
            >
            </ListItemText>
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText sx={{ ml: '10px' }}
              primary="Age:&nbsp;"
              secondary={ memberInfo.dob ? getAge(memberInfo.dob) : 'N/A' }
            >
            </ListItemText>
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText sx={{ ml: '10px' }}
              primary="Gender:&nbsp;"
              secondary={ memberInfo.gender || 'N/A' }
            >
            </ListItemText>
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
              <ListItemText sx={{ ml: '10px' }}
                className={`member-report__coverage member-report__coverage--${coverageStatus || 'inactive'}`}
                primary="Coverage Status:&nbsp;"
                secondary={ coverageStatus || 'inactive' }
              >
              </ListItemText>
          </ListItem>
          <ListItem disablePadding className="member-report__info-field">
            <ListItemText sx={{ ml: '10px' }}
              primary="Participation Period:&nbsp;"
              secondary={ coverageStatus ? `${getDatestamp(new Date(coverage[0].period.start.value))} - ${
                getDatestamp(new Date(coverage[0].period.end.value))}` : 'N/A' }
            >
            </ListItemText>
          </ListItem>
        </List>

        {memberInfo.coverage && memberInfo.coverage.map((insurance) => (
          <List key={`insurance-card-${insurance.id.value}`} className="member-report__member-card">
            <ListItem disablePadding className="member-report__info-field">
              <ListItemText sx={{ ml: '10px' }}
                primary="Policy ID:&nbsp;"
                secondary={ insurance.id.value }
              >
              </ListItemText>
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
                <ListItemText sx={{ ml: '10px' }}
                  primary="Payor/Provider:&nbsp;"
                  secondary={ insurance.payor[0]?.reference.value || 'N/A' }
                >
                </ListItemText>
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
                <ListItemText sx={{ ml: '10px' }}
                  primary="Plan:&nbsp;"
                  secondary="N/A"
                >
                </ListItemText>
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
                <ListItemText sx={{ ml: '10px' }}
                  primary=" Dependents:&nbsp;"
                  secondary="N/A"
                >
                </ListItemText>
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
                <ListItemText sx={{ ml: '10px' }}
                  primary="Relationship:&nbsp;"
                  secondary={insurance.relationship?.coding[0]?.code.value}
                >
                </ListItemText>
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
                <ListItemText sx={{ ml: '10px' }}
                  primary="Type:&nbsp;"
                  secondary={`${insurance.type?.coding[0].code.value} - ${insurance.type?.coding[0]?.display.value}` || 'N/A' }
                >
                </ListItemText>
            </ListItem>
            <ListItem disablePadding className="member-report__info-field">
                <ListItemText sx={{ ml: '10px' }}
                  primary="Participation Period:&nbsp;"
                  secondary={ insurance.period ? `${getDatestamp(new Date(insurance.period.start.value))} - ${
                    getDatestamp(new Date(insurance.period.end.value))}` : 'N/A' }
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
      <Accordion>
        <AccordionSummary className="member-report__accordion-summary" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4">
            {`${datastoreInfo[memberInfo.measurementType]?.displayLabel || '???'} - ${datastoreInfo[memberInfo.measurementType]?.title || 'Undefined Measure'}`}
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
  description: PropTypes.string,
}

MemberReportDisplay.defaultProps = {
  id: '',
  memberInfo: {},
  datastoreInfo: {},
  exportUrl: '',
  coverage: {},
  coverageStatus: '',
  rowData: [],
  description: '',
}

export default MemberReportDisplay;
