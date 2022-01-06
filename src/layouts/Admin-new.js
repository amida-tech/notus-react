import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Measure from "components/Measures/Measure.js";
import NewCardBarChart from "../components/Cards/NewCardBarChart.js";

// views
import MeasureDashboard from "views/admin/MeasureDashboard.js";
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";

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
      {/* <Sidebar /> */}
      {/* <div className="relative md:ml-64 bg-gray-200"> */}
      <AdminNavbar />
      <div className="relative flex bg-light-grey">
        {/* Left Column */}
        <div className="relative flex flex-col width-25">
          <div className="inside-padding border-grey margin-20 rounded-xl bg-white">
            <p>Welcome Susanna</p>
          </div>
          <div className="inside-padding border-grey margin-20 rounded-xl bg-white">
            <h3>Star Rating</h3>
            <p>&#9733;&#9733;&#9733;&#9734;&#9734;</p>
          </div>
          <div className="inside-padding border-grey margin-20 rounded-xl bg-white">
            <p>Impacts and Trends</p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="relative flex flex-col w-full">
          <div className="inside-padding border-grey margin-20 rounded-xl bg-white">
            <NewCardBarChart
                labels={labels}
                data={data}
                title="Today's Trends"
                yAxis="% Impact on HEDIS Score"
                xAxis="Measure"
                measures={measureNoComp} />
          </div>
          <div className="inside-padding border-grey margin-20 rounded-xl bg-white">
            <p>Reports</p>
          </div>
        </div>
        
      </div>
      
      <FooterAdmin />
    </>
  );
}
