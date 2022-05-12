import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import PropTypes from 'prop-types';
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer';
import theme from './assets/styles/AppTheme';
import DatastoreProvider from './context/DatastoreProvider';
import Reports from './layouts/Reports'
import Dashboard from './layouts/Dashboard';
import MemberInfo from './layouts/MemberInfo';
import NotFound from './notFound';

export default function ProtectedRoute({ authenticated }) {
  return (
    <DatastoreProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route path="/reports" component={Reports} />
          <Route path="/member/:id" render={({ match }) => <MemberInfo id={match.params.id} />} />
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
