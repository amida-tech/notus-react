import PropTypes from 'prop-types';
import { Route, Routes, useParams } from 'react-router-dom';
import { memberInfoFetch } from './components/Common/Controller'
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import DatastoreProvider from './context/DatastoreProvider';
import Dashboard from './layouts/Dashboard';
import MemberReport from './layouts/MemberReport';
import Reports from './layouts/Reports';
import NotFound from './notFound';
import ScrollToTop from './components/Utilities/ScrollToTop'

export default function ProtectedRoute({ authenticated }) {
  const lastParameter = useParams()['*'].split('/').at(-1)
  const memberId = lastParameter || '/'

  return (
    <DatastoreProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route exact path="*" element={<Dashboard loggedIn={authenticated} />} />
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/member/:id"
          element={(
            <MemberReport
              id={memberId}
              memberInfoFetch={memberInfoFetch}
              loading
            />
          )}
        />
        <Route exact path="/:measure/members" element={<Dashboard loggedIn={authenticated} />} />
        <Route exact path="/:measure" element={<Dashboard loggedIn={authenticated} />} />
        <Route path="/*" component={<NotFound />} />
      </Routes>
      <Footer />
    </DatastoreProvider>
  )
}
ProtectedRoute.propTypes = {
  authenticated: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  authenticated: false,
};
