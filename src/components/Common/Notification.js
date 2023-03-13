import {
  useState, useEffect
} from 'react';
import Alert from '../Utilities/Alert'
import PropTypes from 'prop-types';

export default function Notification({status}) {

  const [openFTCAlert, setFTCAlert] = useState(false);

  useEffect(() => {
    if (status !== 200 && status !== undefined) {
      console.log('hi', status)
      setFTCAlert(true)
    }
  }, [status]);

  // REFRESH PAGE FUNCTION
  const handleRefreshPage = () => {
    window.location.reload();
  }

  return (
    <Alert
      openAlert={openFTCAlert}
      setOpenAlert={setFTCAlert}
      title="Error Retrieving Data"
      options={{
        target: '_blank',
        rel: 'noopener noreferrer',
        pathto: '',
      }}
      noResultsALERT
      forwardBtn="refresh"
      handleResetData={() => handleRefreshPage()}
    >
      An error occurred while fetching member data. If the error persists, please contact your system administrator.
    </Alert>
  );
}

Notification.propTypes = {
  status: PropTypes.number,
};

Notification.defaultProps = {
  status: undefined,
};
