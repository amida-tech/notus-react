import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import { memberInfoFetch } from './components/Common/Controller'
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import ScrollToTop from './components/Utilities/ScrollToTop';
import DatastoreProvider from './context/DatastoreProvider';
import Dashboard from './layouts/Dashboard';
import MemberReport from './layouts/MemberReport';
import Reports from './layouts/Reports';
import NotFound from './notFound';

export default function ProtectedRoute({authenticated}) {
  console.log('you made it to protected routes... authenticated?', authenticated)
  return (
    <DatastoreProvider>
      <Navbar />
      <Routes>
        <Route path="/reports" component={Reports} />
        <Route
          path="/member/:id"
          render={({ match }) => (
            <MemberReport
              id={match.params.id}
              memberInfoFetch={memberInfoFetch}
              loading
            />
          )}
        />
        <Route exact path="/:measure/members" component={Dashboard} loggedIn={authenticated} />
        <Route exact path="/:measure" component={Dashboard} loggedIn={authenticated} />
        <Route exact path="*" component={Dashboard} loggedIn={authenticated} />
        <Route path="*" component={NotFound} />
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
