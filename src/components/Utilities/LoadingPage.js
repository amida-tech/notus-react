import { Box } from '@mui/material'
import { keyframes } from '@mui/system';

export default function LoadingPage() {
  const wave = keyframes`
    0%{background-position:0% 4%}
    50%{background-position:100% 97%}
    100%{background-position:0% 4%}
  `
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        placeContent: 'center',

        background: 'linear-gradient(313deg, #ffffff, #4b90d4)',
        backgroundSize: '400% 400%',
        animation: `${wave} 30s ease infinite`,
      }}
    />
  )
}
