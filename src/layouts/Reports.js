import { DatastoreContext } from '../context/DatastoreProvider';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import env from '../env';
import ReportBuilder from '../components/Reports/ReportBuilder';
import SavedQueries from '../components/Reports/SavedQueries';
import styles from './Dashboard.module.css';

export default function Reports() {
  const { datastore } = useContext(DatastoreContext);
  return (
    <div>
      <Grid className='reports__display'>
        <div className={styles.dashboardContent}>
          {env.REACT_APP_MVP_SETTING === 'true' && <SavedQueries />}
          <ReportBuilder store={datastore} />
        </div>
      </Grid>
    </div>
  );
}
