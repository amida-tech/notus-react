import {
  useState, useEffect
} from 'react';
import Alert from '../Utilities/Alert'
export default function Notification({status}) {
  const [openFTCAlert, setFTCAlert] = useState(false);

  useEffect(() => {
    console.log('status:', status)
    if (status !== 200 && status !== undefined) {
      setFTCAlert(true)
    }
  }, [status]);

  // REFRESH PAGE FUNCTION
  const handleRefreshPage = () => {
    window.location.reload();
  }
  
  if (openFTCAlert) {
    return (
      <Alert
        openAlert={openFTCAlert}
        setOpenAlert={setFTCAlert}
        title="Error Retrieving Network Data"
        options={{
          target: '_blank',
          rel: 'noopener noreferrer',
          pathto: '',
        }}
        noResultsALERT
        forwardBtn="refresh"
        handleResetData={() => handleRefreshPage()}
      >
        Please contact the support desk.
      </Alert>
    );
  }
}
