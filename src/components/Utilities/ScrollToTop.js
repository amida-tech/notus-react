import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ScrollToTop({ history }) {
  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return navigate(null);
}

ScrollToTop.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func,
  }),
}

ScrollToTop.defaultProps = {
  history: () => undefined,
}

export default ScrollToTop;
