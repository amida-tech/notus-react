import theme from './AppTheme';

// I've floated an idea to clean up extensive
// custom MUI styling by importing an object right
// into the sx prop... It seems to be the best
// way to integrate MUI theming with a scss-y structure
// and still be flexible when needed. (m-ox)

export const ratingTrendsBox = {
  outline: `1px solid ${theme.palette?.secondary.light}`,
  backgroundColor: theme.palette?.background.main,
  borderRadius: '1px',
  height: '12rem',
  display: 'grid',
  gridTemplateRows: '1fr 2fr 1fr',
  '& > *': {
    display: 'flex',
    placeContent: 'center',
    alignSelf: 'center',
  },
  '& > span': {
    padding: '0 2rem',
  },
};

// In some rare scenarios we may want a functional approach to scaling
// certain components as you can see here with 'repeat(4, 1fr)',
// but I don't think it'd be good to lean too heavily into it.
// The important part is we can directly target nested MUI components
// (refer to MUI API docs for global class information). (m-ox)
// EX: https://mui.com/material-ui/api/button/

export const ratingTrendsMeasureContainer = {
  display: 'grid',
  gap: '1rem',
  width: 'inherit',
  gridTemplateColumns: 'repeat(4, 1fr)',
  // overflowX: 'auto',
  overflowX: 'unset',
  overflowY: 'unset',
  padding: '.5rem',
  '& > div': {
    width: '21rem',
    justifyContent: 'center',
    '& > h4': {
      alignSelf: 'end',
    },
    '& > p': {
      margin: '1rem 0',
      height: 'unset',
      alignItems: 'self-end',
    },
    '& > span': {
      marginBottom: '-2rem',
    },
  },
}

export const ratingTrendsCompositeContainer = {
  display: 'grid',
  gap: '1rem',
  width: 'inherit',
  gridTemplateColumns: 'repeat(4, 1fr)',
  padding: '1rem',
}

export const ratingTrendsTitle = (label) => {
  const charCount = label.length > 45;
  return {
    padding: charCount ? '.5rem' : '1rem',
    fontWeight: 700,
    maxWidth: charCount ? '90%' : 'unset',
    height: 'fit-content',
    textAlign: 'center',
    justifySelf: 'center',
    fontSize: charCount ? '1rem' : '1.2rem',
  }
}
