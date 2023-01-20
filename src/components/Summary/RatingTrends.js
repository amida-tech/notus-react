import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import {
  Grid, Typography, Rating, Box,
} from '@mui/material';
import ToolTip from '@mui/material/Tooltip';
import theme from '../../assets/styles/AppTheme'
import TrendDisplay from './TrendDisplay';
import Info from '../Common/Info';
import { mainTrendCreator, sortedTrendsCreator } from './RatingTrendsUtils'
import RatingTrendBox from './RatingTrendBox';

const ratingTrendsTip = 'Rating and Trends displays the current projected star rating as well as highlighting large changes in tracked measures.'
const starsTip = 'Star rating subject to change depending on measures and other resources. For more information, please contact NCQA.';

// todo THIS NEEDS TO BE UPDATED WITH TRUE VALUE
const widgetCount = () => {
  // update count with true value
  const count = 4
  let widgetCount = ''
  for (let i = 0; i < 4; i++) {
    widgetCount += '1fr ';
  }
  return widgetCount.trimEnd()
}

function showStars(activeMeasure) {
  let returnBool = false;

  // Additional stars rules can be added here
  if (activeMeasure.denominator > 30 && activeMeasure.starRating >= 0) {
    returnBool = true;
  }

  return returnBool;
}

function RatingTrends({
  activeMeasure, trends, info, widgetPrefs
}) {
  // console.log(
  //   'RATING TRENDS > PROPS:',
  //   {activeMeasure, trends, info, widgetPrefs}
  // )
  const biggestGain = { measure: '', percentChange: undefined };
  const biggestLoss = { measure: '', percentChange: undefined };

  const measureTrend = trends
    .find((trend) => trend.measure === activeMeasure.measure);
  const mainTrend = mainTrendCreator(activeMeasure, info, measureTrend);
  const sortedTrends = sortedTrendsCreator(activeMeasure, trends, measureTrend);

  console.log('activeMeasure', activeMeasure)

  // if (sortedTrends.length > 1) {
  //   let { measure } = sortedTrends[0];
  //   biggestGain.measure = info[measure] !== undefined ? info[measure].displayLabel : measure;
  //   biggestGain.percentChange = sortedTrends[0].percentChange;

  //   measure = sortedTrends[sortedTrends.length - 1].measure;
  //   biggestLoss.measure = info[measure]?.displayLabel;
  //   biggestLoss.percentChange = sortedTrends[sortedTrends.length - 1].percentChange;

  //   return renderUI(activeMeasure, mainTrend, {
  //     displayAll: true, biggestGain, biggestLoss,
  //   });
  // }

  return (
    <Box sx={{ m: '0 1rem' }}>
      <Box sx={{ display: 'flex', mb: '1rem' }}>
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          Ratings & Trends
        </Typography>
        <Info infoText={ratingTrendsTip} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: '2rem',
          width: 'inherit',
          gridTemplateColumns: widgetCount
        }}
      >
        <RatingTrendBox value={0} widgetPrefs={widgetPrefs} info={info} trends={trends} />
        <RatingTrendBox value={1} widgetPrefs={widgetPrefs} info={info} trends={trends} />
        <RatingTrendBox value={2} widgetPrefs={widgetPrefs} info={info} trends={trends} />
        <RatingTrendBox value={3} widgetPrefs={widgetPrefs} info={info} trends={trends} />
      </Box>
    </Box>
  )

  // return renderUI(activeMeasure, mainTrend, widgetPrefs, {
  //   displayAll: false, biggestGain, biggestLoss,
  // });
}

// const renderUI = (activeMeasure, mainTrend, renderOptions) => (
//   <>
//     {/* OLD WIDGET */}
//     <Box sx={{ color: theme.palette?.bluegray.D1 }} className="rating-trends">
//       <Box className="rating-trends__main-header-align">
//         <Typography variant="h2" className="rating-trends__h2-header">
//           Ratings & Trends
//         </Typography>
//         <Info infoText={ratingTrendsTip} />
//       </Box>

//       <Box className="rating-trends__display-box">
//         <Box className="rating-trends__panel-box">
//           <Grid
//             sx={{ border: `1px solid ${theme.palette?.bluegray.L3}` }}
//             className={`rating-trends__panel 
//             rating-trends__panel${renderOptions.displayAll ? '--width-25' : '--width-50'}`}
//           >
//             <Grid className="rating-trends__header-align">
//               <Typography variant="h3" className="rating-trends__h3-header">
//                 Star Rating
//               </Typography>
//               <ToolTip title={starsTip}>
//                 <HelpIcon color="secondary" className="rating-trends__help-icon" fontSize="small" />
//               </ToolTip>
//             </Grid>
//             {showStars(activeMeasure) ? (
//               <Rating
//                 className="rating-trends__star-rating"
//                 name="read-only"
//                 value={activeMeasure.starRating}
//                 precision={0.5}
//                 readOnly
//               />
//             )
//               : (
//                 <Typography color={theme.palette?.bluegray.D4} className="rating-trends__not-available">
//                   N/A
//                 </Typography>
//               )}
//             <ToolTip title={activeMeasure.title} arrow>
//               <Typography className="rating-trends__star-rating-label">
//                 {activeMeasure.shortLabel && `(${activeMeasure.shortLabel})`}
//               </Typography>
//             </ToolTip>
//           </Grid>
//           <TrendDisplay
//             trend={mainTrend}
//             percentWidth={renderOptions.displayAll ? 25 : 50}
//           />
//           <TrendDisplay
//             trend={renderOptions.biggestGain}
//             percentWidth={renderOptions.displayAll ? 25 : 0}
//           />
//           <TrendDisplay
//             trend={renderOptions.biggestLoss}
//             percentWidth={renderOptions.displayAll ? 25 : 0}
//           />
//         </Box>
//       </Box>
//     </Box>
//   </>
// );

RatingTrends.propTypes = {
  activeMeasure: PropTypes.shape({
    measure: PropTypes.string,
    denominator: PropTypes.number,
    shortLabel: PropTypes.string,
    starRating: PropTypes.number,
    title: PropTypes.string,
  }),
  trends: PropTypes.arrayOf(
    PropTypes.shape({
      measure: PropTypes.string,
    }),
  ),
}

RatingTrends.defaultProps = {
  activeMeasure: {
    measure: '',
    denominator: 0,
    shortLabel: '',
    starRating: 0,
    title: '',
  },
  trends: [],
}

export default RatingTrends;
