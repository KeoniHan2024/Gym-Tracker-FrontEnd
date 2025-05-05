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

function AverageWeightPerRepGraph({ selectedExercise }: { selectedExercise: number }) {
  const API_GET_SETS = import.meta.env.VITE_APP_API_URL?.concat(
    "/sets/"
  ) as string;
  const [labels, setLabels] = useState<String[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [groupedSets, setGroupedSets] = useState();
  const [setWeights, setSetWeights] = useState<{
    [date: string]: number[];
  }>({});
  const [setReps, setSetReps] = useState<{
    [date: string]: number[];
  }>({});
  const token = localStorage.getItem("token");

  // in this get request we want to return all dates and all volume. seperate by exercise type if that exists
  useEffect(() => {
    if (selectedExercise != -1) {
      axios
        .get(API_GET_SETS + selectedExercise, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setSetWeights(response.data.setWeights);
          setSetReps(response.data.setReps);
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
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: {
            enabled: true,
            mode: 'x'
        },
        zoom: {
            wheel: {
                enabled: true,
            },
            pinch: {
                enabled: true
            },
            mode: 'x',
        }
      },
      title: {
        display: true,
        text: "Average Weight Over Time",
        color: "white",
        font: {
          family: "Roboto Mono",
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
            const value = context.raw as number;
            let weightList = [];
            let repsList = [];
            
            // Check if weightListPerDay exists
            if (setWeights && setWeights[context.label]) {
              for (let i = 0; i < setWeights[context.label].length; i++) {
                weightList.push(`${setWeights[context.label][i]}lb`); // Push each weight as a separate string
              }
            } else {
              weightList.push("No weights recorded"); //handle the edge case
            }
            if (setReps && setReps[context.label]) {
              for (let i = 0; i < setReps[context.label].length; i++) {
                repsList.push(`${setReps[context.label][i]}`); // Push each weight as a separate string
              }
            } else {
              repsList.push("No weights recorded"); //handle the edge case
            }

            // Construct the return array
            const returnArray = [
              `${datasetLabel} ${value.toFixed(2)} lbs`,
              "------Sets------",
            ];

            // Add each weight to the return array
            weightList.forEach((weight, index) => {
              returnArray.push("• " + repsList[index] + " reps of " + weight);
            });
            return returnArray;
          },
        },
        font: {
          family: "Roboto Mono",
          size: 20,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      
      x: {
        ticks: {
          color: "white",
          autoSkip: true,
          maxTicksLimit: 10,
          font: {
            family: "Roboto Mono",
            size: 12
          },
        },
        title: {
          display: true,
          text: "Date",
          color: "white",
          font: {
            family: "Roboto Mono",
            size: 14,
            weight: "bold" as const,
          },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            family: "Roboto Mono",
            size: 12
          },
        },
        title: {
          display: true,
          text: "Avg Weight Per Rep",
          color: "white",
          font: {
            family: "Roboto Mono",
            size: 14,
            weight: "bold" as const,
          },
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
        label: "Avg weight per rep",
        data: data,
        borderColor: "white",
        pointRadius: 3,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <>
      <Line options={options} data={lineChartData}></Line>
    </>
  );
}

export default AverageWeightPerRepGraph;
