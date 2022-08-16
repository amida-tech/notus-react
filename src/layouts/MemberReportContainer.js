import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import {
  useContext, useEffect,
  useState
} from 'react';
import { memberInfoFetch } from '../components/Common/Controller';
import ReportTable from '../components/Utilities/ReportTable';
import { DatastoreContext } from '../context/DatastoreProvider';
import env from '../env';
import MemberReport from './MemberReport';

const memberInfoQueryUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members/info/`);

function MemberReportContainer({ id }) {
  const { datastore } = useContext(DatastoreContext);
  const [isLoading, setIsLoading] = useState(true);
  const [memberInfo, setMemberInfo] = useState();
  const [exportUrl, setExportUrl] = useState('')
  const [rowData, setRowData] = useState([]);
  const [description, setDescription] = useState('')
  const [coverageStatus, setCoverageStatus] = useState('')

  useEffect(() => {
    console.log('>>>>>data store info:', datastore.info)
    console.log('>>>>>member info:', memberInfo)
    if (Object.keys(datastore.info).length > 0 && memberInfo) {
      console.log('the data store has info!')
      setIsLoading(datastore.isLoading);
      setRowData(ReportTable.formatData(
        memberInfo,
        memberInfo.measurementType,
        datastore.info,
      ));
      setDescription(datastore?.info[memberInfo.measurementType].description || 'Measure description not currently available.')
    } else {
      console.log('data store had no info :(')
    }
  }, [datastore, memberInfo]);

  useEffect( async () => {
    console.log('our id:', id)
    async function fetchData() {
      const result = await memberInfoFetch(memberInfoQueryUrl, id)
      console.log('our result from axios request:', result)
      setMemberInfo(result)
      setCoverageStatus(result.coverage?.find((item) => item.status?.value === 'active'))
      setExportUrl(`${env.REACT_APP_HEDIS_MEASURE_API_URL}exports/member/?memberId=${result.memberId}`)
    }
    await fetchData()
    
  }, [id]);

  return (
    memberInfo && !isLoading
    ? <MemberReport
        id={id}
        memberInfo={memberInfo}
        datastoreInfo={datastore.info}
        exportUrl={exportUrl}
        coverageStatus={coverageStatus}
        rowData={rowData}
        description={description}
        sx={{ background: 'white' }}
      />
    :
    <CircularProgress size={250} thickness={3} />
  )
}

MemberReportContainer.propTypes = {
  id: PropTypes.string,
}

MemberReportContainer.defaultProps = {
  id: '',
}

export default MemberReportContainer;
