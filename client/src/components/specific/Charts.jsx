import React from 'react'
import { Line,Doughnut } from "react-chartjs-2"
import {ArcElement,CategoryScale,Chart as ChartJS,Filler,Legend,LineElement,LinearScale,PointElement,Tooltip, plugins,} from "chart.js";
import { getLast7Days } from '../../lib/features';
import zIndex from '@mui/material/styles/zIndex';

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
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    cutout: 120,
}

const LineChart = ({value = []}) => {
  const data = {
    labels,
    datasets: [
        {
            data: value,
            label: "Messages",
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
                backgroundColor: ["rgba(255,238,1,0.2)","rgba(0,255,210,0.2)"],
                hoverBackgroundColor: ["rgba(255,238,1,1)","rgba(0,255,210,1)"],
                borderColor: ["rgba(255,238,1,1)","rgba(0,255,210,1)"],
                offset: 30
            }
        ]
      };
      return <Doughnut style={{zIndex: 10}} data={data} options={doughnutChartOptions}/>
  }

export {LineChart, DoughnutChart}