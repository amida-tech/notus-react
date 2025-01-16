import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// A standard button with props as follows:
// children - Renders the wrapped children
// leftIcon - Icon, displays left of words
// rightIcon - Icon, displays right of words
// props - Props
// variant - Options of contained, outlined, or text
// onClick - onClick property for button

export const StandardButton = ({
  children,
  leftIcon,
  rightIcon,
  props,
  variant,
  onClick,
}) => {
  // Instantiate variables for colors set in "variant" switch statement
  let backgroundColor, hoverColor, textColor;
  switch (variant) {
    case 'contained':
      [backgroundColor, hoverColor] = ['#005EA2', '#0075CA'];
      break;
    case 'outlined':
      [backgroundColor, hoverColor, textColor] = [
        '#fffff',
        '#ECEFF1',
        '#005EA2',
      ];
      break;
    case 'text':
      textColor = '#005EA2';
      break;
    default:
      [backgroundColor, hoverColor] = ['#005EA2', '#0075CA'];
  }
  return (
    <Button
      onClick={onClick}
      disableElevation={true}
      sx={[
        {
          color: textColor,
          backgroundColor: backgroundColor,
          borderColor: textColor,
          '&:hover': {
            background: hoverColor,
            borderColor: textColor,
          },
        },
      ]}
      variant={variant}
      {...props}
    >
      {/* This grid aligns the icons and text in the button */}
      <Grid
        style={{ gap: '.5rem', pr: '1rem', pl: '1rem' }}
        container
        height={'1.5rem'}
      >
        {/* If there is a leftIcon prop passed, render it */}
        {leftIcon ? <Grid item>{leftIcon}</Grid> : <></>}

        {/* If there is a children prop passed, render it */}
        {children ? (
          <Grid item>
            <Typography
              sx={{ color: textColor }}
              fontWeight='500'
              textTransform='capitalize'
            >
              {children}
            </Typography>
          </Grid>
        ) : (
          <></>
        )}

        {/* If there is a rightIcon prop passed, render it */}
        {rightIcon ? <Grid item>{rightIcon}</Grid> : <></>}
      </Grid>
    </Button>
  );
};

StandardButton.propTypes = {
  children: PropTypes.node,
  leftIcon: PropTypes.elementType,
  rightIcon: PropTypes.elementType,
  props: PropTypes.object,
  variant: PropTypes.string,
  onClick: PropTypes.func,
}