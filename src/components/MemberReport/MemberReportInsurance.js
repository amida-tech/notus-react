import {
  useState,
} from 'react';
import { Tab, Box, List, ListItem, ListItemText } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { getAge, getDatestamp, updateTimestamp } from '../Utilities/GeneralUtil';

function MemberReportInsurance(memberInfo) {
  const coverageObjArr = memberInfo.memberInfo.coverage
  const [tabValue, setTabValue] = useState(coverageObjArr[0].type.coding[0].display.value);

  console.log('covey', tabValue)

  const insuranceTabList = coverageObjArr.map((insurance, i) => {
    console.log('tab list insurance:', insurance)
    return (
      <Tab label={insurance.type.coding[i].display.value} value={insurance.type.coding[i].display.value} />
    )
    })

  const insuranceTabPanels = coverageObjArr.map((insurance, i) => {
    return (
      <TabPanel value={insurance.type.coding[i].display.value}>
        <List key={`insurance-card-${insurance.id.value}`}>
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
    </TabPanel>
    )
  })

  const handleTabChange = (_e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <TabContext orientation="vertical" value={tabValue}>
      {insuranceTabPanels}
      <Box
        sx={{
          padding: "0 1rem 1rem 0"
        }}
      >
        <TabList
              // TabIndicatorProps={{ style: { backgroundColor: 'transparent', gap: '1rem' } }}
              // sx={{ marginLeft: '8rem', height: '4rem', alignItems: 'center' }}
          orientation="vertical"
          variant="scrollable"
          scrollButtons
          onChange={handleTabChange}
          aria-label="insurance tabs"
        >
          {insuranceTabList}
        </TabList>
      </Box>
    </TabContext>
  )
}

MemberReportInsurance.defaultProps = {
  coverage: {},
}

export default MemberReportInsurance;
