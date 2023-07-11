import React from 'react';
import"./Barch.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "პროუქტის რაოდენობა ფასების მიხედვით",
      },
    },
  };
  


export default function Barch(props){
    const labels = props.labels;
  
    const data = {
      labels,
      datasets: [
        {
          label: 'რაოდენობა',
          data: props.data ,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
     
      ],
    };
    return <div className="barchart" style={{width:600,height:400}}> <Bar options={options} data={data} /></div>

}