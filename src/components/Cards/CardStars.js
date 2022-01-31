import React from "react";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

 // components

 export default function CardStars() {
   return (
    <>
      <div className="margin-top-2">
        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value='3.5' readOnly />
       </div>
     </>
   );
 } 