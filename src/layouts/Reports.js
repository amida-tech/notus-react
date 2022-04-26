import React, { useContext } from 'react'
import DashboardNavbar from '../components/Navbars/DashboardNavbar'
import Footer from '../components/Footers/Footer'
import ReportsBanner from '../components/Summary/ReportsBanner'
import ReportBuilder from '../components/Reports/ReportBuilder/ReportBuilder'
import SavedQueries from '../components/Reports/SavedQueries'
import { DatastoreContext } from '../context/DatastoreProvider';

function Reports() {
  const { datastore } = useContext(DatastoreContext);
  return (
    <div>
      <DashboardNavbar />
      <ReportsBanner />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <SavedQueries />
        <ReportBuilder store={datastore} />
      </div>
      <Footer />
    </div>
  )
}

export default Reports
