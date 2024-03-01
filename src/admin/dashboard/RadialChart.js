import React from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const RadialChart = ({dataColors}) => {
  const radialChartColors = getChartColorsArray(dataColors);

  const series = [44, 55, 67, 83]
  const options = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return 249
            },
          },
        },
      },
    },

    labels: ["BlueCoral", "The Little Things", "Blu Kiosk", "MUMUSO"],
    colors: radialChartColors,
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height="280"
      className="apex-charts"
    />
  )
}

export default RadialChart
