import React from "react";
import { Doughnut } from "react-chartjs-2";

const Chart = props => {
  const data = {
    labels: [
      "Gemiddeld Moeilijk - Alle Opdrachten",
      "Gemiddeld Leuk - Alle Opdrachten",
    ],
    datasets: [
      {
        data: props.dataSet,
        backgroundColor: ["rgba(238, 3, 23,  1)", "rgba(255, 208, 0, 1)"],
        borderWidth: 1,
        hoverBorderWidth: 1,
        hoverBorderColor: ["rgba(238, 3, 23,  0.5)", "rgba(255, 208, 0, 0.5)"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    cutoutPercentage: 63,
  };

  return (
    <div className="donut_container">
      <Doughnut className="donut" data={data} options={options} />
    </div>
  );
};

export default Chart;
