import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return (null);
}

ScrollToTop.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func,
  }),
}

ScrollToTop.defaultProps = {
  history: () => undefined,
}

export default withRouter(ScrollToTop);
