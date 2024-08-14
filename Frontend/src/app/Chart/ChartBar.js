import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartBar() {
  const ChartBarRef = useRef(null);

  useEffect(() => {
    // Chart Global Color
    Chart.defaults.color = "#e9ecef";
    Chart.defaults.borderColor = "#000";

    // Worldwide Sales Chart
    const ChartBarCtx = ChartBarRef.current.getContext("2d");
    const ChartBar = new Chart(ChartBarCtx, {
      type: "bar",
      data: {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: "USA",
            data: [15, 30, 55, 65, 60, 80, 95],

            backgroundColor: "rgba(235, 22, 22, .7)",
          },
          {
            label: "UK",
            data: [8, 35, 40, 60, 70, 55, 75],

            backgroundColor: "rgba(235, 22, 22, .5)",
          },
          {
            label: "AU",
            data: [12, 25, 45, 55, 65, 70, 60],

            backgroundColor: "rgba(235, 22, 22, .3)",
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    return () => {
      ChartBar.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={ChartBarRef} />
    </>
  );
}
