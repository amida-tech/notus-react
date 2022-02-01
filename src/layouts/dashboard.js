import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { theme } from "assets/styles/AppTheme.js";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// components

import DashboardNavbar from "../components/Navbars/DashboardNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import D3Chart from "../components/D3Container/D3Chart.js";
import Welcome from "../components/Cards/CardWelcome.js";
import Stars from "../components/Cards/CardStars.js";

import { dataList } from '../components/D3Container/DemoData';

export const datastoreContext = createContext("");
const axios = require('axios').default;

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HEDIS_MEASURE_API_URL}`,
  timeout: 1000
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius.xl,
}));

export default function Admin() {
  const [measures, setMeasures] = useState([]);
  let valueArray = [];

  useEffect(() => {
    instance.get('measures/search', {
      params: {
        //memberId: '6dccff7c-db25-a27b-d718-7189b766b218',
        measurementType: 'drre'
      }
    })
    .then(res => {
      if (res && res.data.length > 30) {
        let numeratorValues = [];
        let denominatorValues = [];
        for (const patientJSON in res.data) {
          const patient = JSON.parse(patientJSON);
          for (const patientField in patient) {
            if (patientField.startsWith('Numerator')) {
              let numCount = 0;
              if (patientField !== 'Numerator') {
                numCount = patientField.replace('Numerator ', '') - 1
              }
              numeratorValues[numCount] += patient[patientField]
            }
            else if (patientField.startsWith('Denominator')) {
              let denCount = 0;
              if (patientField !== 'Denominator') {
                denCount = patientField.replace('Denominator ', '') - 1
              }
              denominatorValues[denCount] += patient[patientField]
            }
          }
        }

        const measureSize = numeratorValues.length();
        const currentDate = new Date();
        const dateString = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
        for (let i = 0; i < measureSize; i++) {
          const numerator = numeratorValues[i];
          const denominator = denominatorValues[i];
          valueArray.push({
            name: 'drre ' + (i + 1),
            date: dateString,
            value: (numerator/denominator) * 100
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);

  const [datastore, setDatastore] = useState("");

  return (
    <>
      <ThemeProvider theme={theme} >
        <datastoreContext.Provider value={{ datastore, setDatastore }}>
          <DashboardNavbar />
            <Paper sx={{ padding: 4, height: '90vh', background: theme.palette.background.main }}>
            <Box sx={{ flexGrow: 2 }}>
              <Grid container spacing={4}>
                <Grid item sm={3} xs={6}>
                  <Item>
                    <Welcome/>
                  </Item>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Item>
                    <Stars/>
                  </Item>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Item>
                    <Typography variant='subtitle1' align='center'>Impacts and Trends</Typography>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>
                    <D3Chart measures={dataList} />
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>Reports</Item>
                </Grid>
              </Grid>
            </Box>
            </Paper>
            <FooterAdmin />
          </datastoreContext.Provider>
      </ThemeProvider>
    </>
  );
}