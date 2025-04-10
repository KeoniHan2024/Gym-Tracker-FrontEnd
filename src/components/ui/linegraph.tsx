
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale,  ChartOptions} from 'chart.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

ChartJS.register(
  LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale
)

interface WeightSet {
  weight: number;
  reps: number;
  date_worked: string; // Assuming 'YYYY-MM-DD' format
  // Add other properties as needed
}

function LineGraph({selectedExercise}: {selectedExercise: number}) {
  const API_GET_SETS = (import.meta.env.VITE_APP_API_URL?.concat("/sets/allSets")) as string
  const [labels, setLabels] = useState<String[]>([])
  const [data, setData] = useState<number[]>([]) 
  const [groupedSets, setGroupedSets] = useState()
  const token = localStorage.getItem('token')


  const queryParams = {exercise_id : selectedExercise}


  // in this get request we want to return all dates and all volume. seperate by exercise type if that exists
  useEffect(()=> {
    if (selectedExercise != -1) {
      axios.get(API_GET_SETS, {
        headers: {Authorization: `Bearer ${token}`},
        params: queryParams
        }).then((response) => {
          setData(response.data.averages)
          setLabels(response.data.labels)
          setGroupedSets(response.data.groupedSets)
        }).catch(err => {  
            // localStorage.removeItem("token")
      })
    }
  },[selectedExercise])

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Average Weight Over Time', 
        color: 'white',
        font: {
          size: 20, 
          weight: 'bold' 
        },
        padding: { 
          top: 10,
          bottom: 10
        }
      }
    },
    scales: {
      x:{
        ticks: {
          color: "white"
        },
        title: {
          display: true,
          text: "Date",
          color: "white"
        }
      },
      y:{
        ticks: {
          color: "white"
        },
        title: {
          display: true,
          text: "Avg Weight Per Rep",
          color: "white"
        },
        beginAtZero: true
      }
    }
  }
  

  const lineChartData = {
    // create label for every dat
    labels: labels,
    datasets: [
      {
        label: "Avg Weight per Rep",
        data: data,
        borderColor: "white"
      }
    ]
  }

  return (
     <>
      <Line options = {options} data={lineChartData}></Line>
     </>
  );
}

export default LineGraph;
