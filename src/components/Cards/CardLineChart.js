import React, {useEffect} from "react";
import Chart from "chart.js";

export default function CardLineChart({data_line, data_predictions, arima_lower_bound, arima_upper_bound, title, xAxis, yAxis}) {

  useEffect(() => {
    var config = {
      type: "scatter",
      data: {
        datasets: [
          {
            label: 'Actual values',
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            pointRadius: 0,
            data: data_line,
            showLine: true,
          },
          {
            label: "Forecast",
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            pointRadius: 0,
            data: data_predictions,
            showLine: true,
          },
          {
            label: "Upper Bound",
            //type: "linear",
            backgroundColor: "#87CEEB",
            borderColor: "transparent",
            pointRadius: 0,
            fill: '+1',
            tension: 0,
            data: arima_upper_bound,
            showLine: true,
          },
          {
            label: "Lower Bound",
            backgroundColor: "#87CEEB",
            borderColor: "transparent",
            pointRadius: 0,
            fill: '-1',
            tension: 0,
            data: arima_lower_bound,
            showLine: true, 
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "gray",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time:{
                unit: 'month',
                displayFormats:{
                  day: 'Y-M-D'
                }
              },
              display:true,
              ticks: {
                fontColor: "gray", //"rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: xAxis,
                fontColor: "gray",
              },
              gridLines: {
                display: true,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                fontColor: "gray",//"rgba(255,255,255,.7)",
                //max: 5,
                //stepsize: 0.5,
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: yAxis,
                fontColor: "gray",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: true,
                color: "gray",//"rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById(`line-chart-${title}`).getContext("2d");
    window.myLine = new Chart (ctx, config)

    function getSliderValues() {

          var slides = document.getElementsByTagName("input");
          var min = parseFloat(slides[0].value);
          var max = parseFloat(slides[1].value);

          if (min > max) {
            var tmp = max;
            max = min;
            min = tmp;}

          var updates = window.myLine.data.datasets[0].data.slice(min,max)
          console.log(updates)
          data_line = updates        
          window.myLine.update()

          var displayElement = document.getElementsByClassName("rangeValues")[0];
          displayElement.innerHTML = "Min:" + min + " Max : " + max;
            }
    
            var sliderSections = document.getElementsByClassName("range-slider");
            for (var x = 0; x < sliderSections.length; x++) {
              var sliders = sliderSections[x].getElementsByTagName("input");
              for (var y = 0; y < sliders.length; y++) {
                if (sliders[y].type === "range") {
                  sliders[y].oninput = getSliderValues;
                  sliders[y].max = config.data.datasets[0].data.length;
                  sliders[y].oninput();
                }
              }
            }

  }, [data_line, data_predictions, arima_lower_bound, arima_upper_bound, title, xAxis, yAxis]); 

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              {/*<h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
                Overview
              </h6>*/}
              <h2 className="text-gray text-xl font-semibold">
                {title}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id={`line-chart-${title}`}></canvas>
            <section className="range-slider">
              <span className="rangeValues"></span>
              <input value="1" min="1" max="" type="range"></input>
              <input value="30" min="1" max="" type="range"></input>
            </section>
          </div>
          <div> 
          </div>
        </div>
      </div>
    </>
  );
}


//-----Copied below is the code that populated this script prior to adding the code above--------------------//


// import React from "react";
// import Chart from "chart.js";

// export default function CardLineChart() {
//   React.useEffect(() => {
//     var config = {
//       type: "line",
//       data: {
//         labels: [
//           "January",
//           "February",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "August",
//           "September",
//           "October",
//           "November",
//           "December"
//         ],
//         datasets: [
//           {
//             label: new Date().getFullYear(),
//             backgroundColor: "#4c51bf",
//             borderColor: "#4c51bf",
//             data: [4.5, 5, 4, 3.5, 4, 4.5, 4, 4.5, 5, 4, 3.5, 4],
//             fill: false,
//           },
//           {
//             label: new Date().getFullYear() - 1,
//             fill: false,
//             backgroundColor: "#fff",
//             borderColor: "#fff",
//             data: [4, 3.5, 3, 3.5, 4, 4, 4.5, 3.5, 4, 4.5, 4, 4.5],
//           },
//         ],
//       },
//       options: {
//         maintainAspectRatio: false,
//         responsive: true,
//         title: {
//           display: false,
//           text: "Sales Charts",
//           fontColor: "white",
//         },
//         legend: {
//           labels: {
//             fontColor: "white",
//           },
//           align: "end",
//           position: "bottom",
//         },
//         tooltips: {
//           mode: "index",
//           intersect: false,
//         },
//         hover: {
//           mode: "nearest",
//           intersect: true,
//         },
//         scales: {
//           xAxes: [
//             {
//               ticks: {
//                 fontColor: "rgba(255,255,255,.7)",
//               },
//               display: true,
//               scaleLabel: {
//                 display: false,
//                 labelString: "Month",
//                 fontColor: "white",
//               },
//               gridLines: {
//                 display: false,
//                 borderDash: [2],
//                 borderDashOffset: [2],
//                 color: "rgba(33, 37, 41, 0.3)",
//                 zeroLineColor: "rgba(0, 0, 0, 0)",
//                 zeroLineBorderDash: [2],
//                 zeroLineBorderDashOffset: [2],
//               },
//             },
//           ],
//           yAxes: [
//             {
//               display: true,
//               ticks: {
//                 fontColor: "rgba(255,255,255,.7)",
//                 max: 5,
//                 stepsize: 0.5,
//                 beginAtZero: true
//               },
//               scaleLabel: {
//                 display: false,
//                 labelString: "Value",
//                 fontColor: "white",
//               },
//               gridLines: {
//                 borderDash: [3],
//                 borderDashOffset: [3],
//                 drawBorder: false,
//                 color: "rgba(255, 255, 255, 0.15)",
//                 zeroLineColor: "rgba(33, 37, 41, 0)",
//                 zeroLineBorderDash: [2],
//                 zeroLineBorderDashOffset: [2],
//               },
//             },
//           ],
//         },
//       },
//     };
//     var ctx = document.getElementById("line-chart").getContext("2d");
//     window.myLine = new Chart(ctx, config);
//   }, []);
//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
//         <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
//           <div className="flex flex-wrap items-center">
//             <div className="relative w-full max-w-full flex-grow flex-1">
//               <h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
//                 Overview
//               </h6>
//               <h2 className="text-white text-xl font-semibold">Overall Score Over Time</h2>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 flex-auto">
//           {/* Chart */}
//           <div className="relative h-350-px">
//             <canvas id="line-chart"></canvas>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
