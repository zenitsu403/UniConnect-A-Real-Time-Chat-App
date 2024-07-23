import React from 'react'
import { Line,Doughnut } from "react-chartjs-2"
import {ArcElement,CategoryScale,Chart as ChartJS,Filler,Legend,LineElement,LinearScale,PointElement,Tooltip,} from "chart.js";

ChartJS.register(Tooltip,CategoryScale,LinearScale,LineElement,PointElement,Filler,
ArcElement,Legend);

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },

    scales: {
        x: {
        grid: {
            display: false,
        },
        },
        y: {
        beginAtZero: true,
        grid: {
            display: false,
        },
        },
    },
}

const LineChart = ({value = []}) => {
  const data = {
    labels:["s","a","f","A","v","e","g"],
    datasets: [
        {
            data: value,
            label: "Revenue",
            fill: true,
            backgroundColor: "rgba(75,12,192,0.2)",
            borderColor: "rgba(75,12,192,1)"
        }
    ]
  };
  return <Line data={data} options={lineChartOptions}/>
}
const DoughnutChart = () => {
    return (
      <div>Charts</div>
    )
  }

export {LineChart, DoughnutChart}