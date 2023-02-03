import theme from './AppTheme';

// I've floated an idea to 'clean up' extensive
// custom MUI styling by importing an object right
// into the sx prop... It seems to be the best
// way to integrate MUI theming with a scss-y structure.
// So here is it is as an example:

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
}
