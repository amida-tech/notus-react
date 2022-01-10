import React from "react";

// components

export default function CardTrends() {
  return (
    <>
      <h3>Impact and Trends</h3>
      <div>
        {/* First */}
        <div className="flex bb-grey">
          <div className="flex-col m-4">
            <p>&#8593; 10 %</p>
          </div>
          <div className="flex-col m-4">
            <p>AIS, % Compliant</p>
          </div>
        </div>

        {/* Second */}
        <div className="flex bb-grey">
          <div className="flex-col m-4">
            <p>&#8595; 5 %</p>
          </div>
          <div className="flex-col m-4">
            <p>DDR, % Compliant</p>
          </div>
        </div>

        {/* Third */}
        <div className="flex bb-grey">
          <div className="flex-col m-4">
            <p>$783</p>
          </div>
          <div className="flex-col m-4">
            <p>Projected PPM</p>
            <p>bonus next month</p>
          </div>
        </div>

        {/* Fourth */}
        <div className="flex bb-grey">
          <div className="flex-col m-4">
            <p>$40</p>
          </div>
          <div className="flex-col m-4">
            <p>Projected yearly</p>
            <p>bonus per plan</p>
          </div>
        </div>

        <div className="float-right m-4">
          <p>View Details</p>
        </div>
        
      </div>
    </>
  );
}