import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface WeightSet {
  weight: number;
  reps: number;
  date_worked: string; // Assuming 'YYYY-MM-DD' format
  // Add other properties as needed
}

function LineGraph({ selectedExercise }: { selectedExercise: number }) {
  const API_GET_SETS = import.meta.env.VITE_APP_API_URL?.concat(
    "/sets/allSets"
  ) as string;
  const [labels, setLabels] = useState<String[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [groupedSets, setGroupedSets] = useState();
  const [weightListPerDay, setWeightListPerDay] = useState<{
    [date: string]: number[];
  }>({});
  const token = localStorage.getItem("token");

  const queryParams = { exercise_id: selectedExercise };

  // in this get request we want to return all dates and all volume. seperate by exercise type if that exists
  useEffect(() => {
    if (selectedExercise != -1) {
      axios
        .get(API_GET_SETS, {
          headers: { Authorization: `Bearer ${token}` },
          params: queryParams,
        })
        .then((response) => {
          setWeightListPerDay(response.data.setsPerDay);
          setData(response.data.averages);
          setLabels(response.data.labels);
          setGroupedSets(response.data.groupedSets);
        })
        .catch((err) => {
          // localStorage.removeItem("token")
        });
    }
  }, [selectedExercise]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Average Weight Over Time",
        color: "white",
        font: {
          size: 20,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: import("chart.js").TooltipItem<"line">) {
            const datasetLabel = context.dataset.label || "";
            const value = context.raw;
            let weightList = "";
            for (let i =0; i < weightListPerDay[context.label].length; i++) {
              weightList += weightListPerDay[context.label][i] + "lb, ";
            }

            weightList = weightList.slice(0, -2);

            return [
              `${datasetLabel}`,
              `Average Weight Per Rep: ${value}`,
              `Weight: ${weightList}`
            ];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        title: {
          display: true,
          text: "Date",
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        title: {
          display: true,
          text: "Avg Weight Per Rep",
          color: "white",
        },
        beginAtZero: true,
      },
    },
  };
  

  const lineChartData = {
    // create label for every dat
    labels: labels,
    datasets: [
      {
        label: "Avg Weight per Rep",
        data: data,
        borderColor: "white",
        pointRadius: 3,        
      pointHoverRadius: 8    
      },
    ],
  };

  return (
    <>
      <Line options={options} data={lineChartData}></Line>
    </>
  );
}

export default LineGraph;
