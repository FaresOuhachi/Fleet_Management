import React from "react";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function ChartLine() {
  const ChartLineRef = useRef(null);
  useEffect(() => {
    // Chart Global Color
    Chart.defaults.color = "#e9ecef";
    Chart.defaults.borderColor = "#000";

    // Salse & Revenue Chart
    const ChartLineCtx = ChartLineRef.current.getContext("2d");
    const ChartLine = new Chart(ChartLineCtx, {
      type: "line",
      data: {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: "Gazoil",
            data: [215, 230, 255, 245, 270, 65, 85],
            pointRadius: 4,
            backgroundColor: "rgba(235, 22, 22)",
            borderColor: "#000",

            fill: false,
          },
          {
            label: "Escence",
            data: [99, 135, 170, 130, 190, 180, 270],
            pointRadius: 4,
            backgroundColor: "rgba(22, 22, 222)",
            borderColor: "#000",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    return () => {
      ChartLine.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={ChartLineRef} />
    </>
  );
}
