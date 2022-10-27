import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material'

class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="not-found">
        <h1>404 Error</h1>
        <p className="not-found__explanation">
          The page you&apos;re seeking is not found. You may wish to return to the
          <Link
              component={RouterLink}
              to="/"
            >
              &nbsp;main page.
            </Link>
        </p>
      </div>
    );
  }
}

export default NotFound;
