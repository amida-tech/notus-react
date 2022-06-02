import PropTypes from 'prop-types';

export const storeProps = PropTypes.shape({
  results: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
  currentResults: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
});

export const activeMeasureProps = PropTypes.shape({
  measure: PropTypes.string,
  denominator: PropTypes.number,
  shortLabel: PropTypes.string,
  starRating: PropTypes.number,
  title: PropTypes.string,
});

export const defaultActiveMeasure = {
  measure: 'composite',
  denominator: 0,
  shortLabel: '',
  starRating: 0,
  title: '',
};

export const dashboardStateProps = PropTypes.shape({
  filterDrawerOpen: PropTypes.bool,
});

export const dashboardActionsProps = PropTypes.shape({
  toggleFilterDrawer: PropTypes.func,
  setActiveMeasure: PropTypes.func,
});

export const colorMappingProps = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.string,
    color: PropTypes.string,
  }),
);
