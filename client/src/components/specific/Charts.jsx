import React from 'react'
import { Line,Doughnut } from "react-chartjs-2"
import {ArcElement,CategoryScale,Chart as ChartJS,Filler,Legend,LineElement,LinearScale,PointElement,Tooltip,} from "chart.js";
import { getLast7Days } from '../../lib/features';

ChartJS.register(Tooltip,CategoryScale,LinearScale,LineElement,PointElement,Filler,
ArcElement,Legend);

const labels = getLast7Days();

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

const doughnutChartOptions = {

}

const LineChart = ({value = []}) => {
  const data = {
    labels,
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
const DoughnutChart = ({labels = [], value= []}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: ["rgba(75,12,192,0.2)","rgba(234, 112, 112,0.2)"],
                borderColor: ["rgba(75,12,192,1)","#ea7070"],
                offset: 40
            }
        ]
      };
      return <Doughnut data={data} options={doughnutChartOptions}/>
  }

export {LineChart, DoughnutChart}