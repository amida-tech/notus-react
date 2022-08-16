import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import ScrollToTop from './components/Utilities/ScrollToTop';
import DatastoreProvider from './context/DatastoreProvider';
import Dashboard from './layouts/Dashboard';
import MemberReportContainer from './layouts/MemberReportContainer';
import Reports from './layouts/Reports';
import NotFound from './notFound';

export default function ProtectedRoute({ authenticated }) {
  return (
    <DatastoreProvider>
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route path="/reports" component={Reports} />
        <Route path="/member/:id" render={({ match }) => <MemberReportContainer id={match.params.id} />} />
        <Route exact path="/:measure/members" component={Dashboard} loggedIn={authenticated} />
        <Route exact path="/:measure" component={Dashboard} loggedIn={authenticated} />
        <Route exact path="/" component={Dashboard} loggedIn={authenticated} />
        <Route path="*" component={NotFound} />
      </Switch>
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
