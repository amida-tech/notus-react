import React, { useState, useEffect } from "react";

// components

import DashboardNavbar from "../components/Navbars/DashboardNavbar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import NewCardBarChart from "../components/D3Container/D3Chart.js";
import Welcome from "../components/Cards/CardWelcome.js";
import Stars from "../components/Cards/CardStars.js";

export default function Admin() {
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HEDIS_MEASURE_API_URL}measures`)
      .then((response) => response.json())
      .then((res) => {
        if (res && res.length > 0) {
          const specialName = "Composite";
          const first = res.find((a) => a.name === specialName);
          const theRestSorted = res
            .filter((a) => a.name !== specialName)
            .sort((a, b) => a.name.localeCompare(b.name));
          setMeasures([first, ...theRestSorted]);
        }
      });
  }, []);

  let comp = {displayName: "Composite Score", rating: ""}
  comp = measures && measures.length ? measures[0] : comp;
  const compName = "Composite";
  const measureNoComp = measures
    .filter(measure => measure.name !== compName)
    .sort((a, b) => a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase()));

  const sortedImpact = measures.length 
    ? Object.entries(comp.impact)
      .sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase())) 
    : undefined;

  const labels = measures.length ? sortedImpact.map(el => el[0]) : [];
  const data = measures.length ? sortedImpact.map(el => el[1]) : [];

  return (
    <>
      <DashboardNavbar />
      {/* Body */}
      <div className="relative bg-light-grey margin-10em">
        {/* Top Row */}
        <div className="relative flex w-full">
          <div className="flex flex-col inside-padding border-grey margin-20 rounded-xl bg-white width-25 text-center">
            <Welcome/>
          </div>
          <div className="flex flex-col inside-padding border-grey margin-20 rounded-xl bg-white width-25 text-center">
            <Stars/>
          </div>
          <div className="flex flex-col inside-padding border-grey margin-20 rounded-xl bg-white width-50">
            <p>Impacts and Trends</p>
          </div>
        </div>
        
        {/* Middle Row */}
        <div className="relative w-full">
          <div className="inside-padding border-grey margin-20 rounded-xl bg-white">
            <NewCardBarChart
                labels={labels}
                data={data}
                title="Today's Trends"
                yAxis="% Impact on HEDIS Score"
                xAxis="Measure"
                measures={measureNoComp} />
          </div>
        </div>

        {/* Bottomr row */ }
        <div className="relative w-full">
          <div className="inside-padding border-grey margin-20 rounded-xl bg-white">
            <p>Reports</p>
          </div>
        </div>
        
      </div>
      
      <FooterAdmin />
    </>
  );
}