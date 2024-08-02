import {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Tab, Box, List, ListItem, ListItemText,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import moment from 'moment';
import theme from '../../assets/styles/AppTheme';

function MemberReportInsurance({ memberInfo = {} }) {
  const coverageObjArr = memberInfo.coverage;
  const [tabValue, setTabValue] = useState(coverageObjArr[0].type.coding[0].display.value);

  const insuranceTabList = coverageObjArr.map((insurance, i) => (
    <Tab
      key={insurance.type.coding[i].display.value}
      label={insurance.type.coding[i].display.value}
      value={insurance.type.coding[i].display.value}
    />
  ));

  const insuranceTabPanels = coverageObjArr.map((insurance, i) => (
    <TabPanel
      key={insurance.type.coding[i].display.value}
      value={insurance.type.coding[i].display.value}
    >
      <List key={`insurance-card-${insurance.id.value}`}>
        <ListItem color={theme.palette?.bluegray.D4} disablePadding className="member-report__info-field">
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
            secondary={insurance.relationship.coding[0].code.value}
          />
        </ListItem>
        <ListItem disablePadding className="member-report__info-field">
          <ListItemText
            sx={{ m: 0, display: 'flex', gap: '.5rem' }}
            primaryTypographyProps={{ fontWeight: '700' }}
            secondaryTypographyProps={{ alignSelf: 'center' }}
            primary="Type:&nbsp;"
            secondary={`${insurance.type?.coding[0].code.value} - ${insurance.type?.coding[0].display.value}` || 'N/A'}
          />
        </ListItem>
        <ListItem disablePadding className="member-report__info-field">
          <ListItemText
            sx={{ m: 0, display: 'flex', gap: '.5rem' }}
            primaryTypographyProps={{ fontWeight: '700' }}
            secondaryTypographyProps={{ alignSelf: 'center' }}
            primary="Participation Period:&nbsp;"
            secondary={insurance.period ? `${moment(insurance.period.start.value)
              .format('MM/DD/YYYY')} - ${moment(insurance.period.end.value)
                .format('MM/DD/YYYY')}` : 'N/A'}
          />
        </ListItem>
      </List>
    </TabPanel>
  ));

  const handleTabChange = (_e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <TabContext orientation="vertical" value={tabValue}>
      {insuranceTabPanels}
      <Box
        sx={{
          padding: '0 1rem 1rem 0',
        }}
      >
        <TabList
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ margin: '1rem 0' }}
          onChange={handleTabChange}
          aria-label="insurance tabs"
        >
          {insuranceTabList}
        </TabList>
      </Box>
    </TabContext>
  );
}

MemberReportInsurance.propTypes = {
  memberInfo: PropTypes.shape({
    dob: PropTypes.string,
    timeStamp: PropTypes.string,
    gender: PropTypes.string,
    coverage: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          coding: PropTypes.arrayOf(
            PropTypes.shape({
              display: PropTypes.shape({
                value: PropTypes.string,
              }),
            }),
          ),
        }),
      }),
    ),
    measurementType: PropTypes.string,
  }),
};

// MemberReportInsurance.defaultProps = {
//   memberInfo: {},
// };

export default MemberReportInsurance;
