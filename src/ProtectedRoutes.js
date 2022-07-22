import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import PropTypes from 'prop-types';
import ScrollToTop from './components/Utilities/ScrollToTop'
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer';
import theme from './assets/styles/AppTheme';
import DatastoreProvider from './context/DatastoreProvider';
import Reports from './layouts/Reports'
import Dashboard from './layouts/Dashboard';
import MemberReport from './layouts/MemberReport';
import NotFound from './notFound';

export default function ProtectedRoute({ authenticated }) {
  return (
    <DatastoreProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <ScrollToTop />
        <Switch>
          <Route path="/reports" component={Reports} />
          <Route path="/member/:id" render={({ match }) => <MemberReport id={match.params.id} />} />
          <Route exact path="/:measure/members" component={Dashboard} loggedIn={authenticated} />
          <Route exact path="/:measure" component={Dashboard} loggedIn={authenticated} />
          <Route exact path="/" component={Dashboard} loggedIn={authenticated} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </DatastoreProvider>
  )
}
ProtectedRoute.propTypes = {
  authenticated: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  authenticated: false,
};
