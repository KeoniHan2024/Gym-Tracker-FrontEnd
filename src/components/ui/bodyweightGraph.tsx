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


function BodyweightGraph() {
  const API_GET_BODYWEIGHTS = import.meta.env.VITE_APP_API_URL?.concat(
    "/bodyweights/"
  ) as string;
  const [labels, setLabels] = useState<String[]>([]);
  const [data, setData] = useState<number[]>([]);
  const token = localStorage.getItem("token");

  // in this get request we want to return all dates and all volume. seperate by exercise type if that exists
  useEffect(() => {
      axios
        .get(API_GET_BODYWEIGHTS, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setData(response.data.data)
          setLabels(response.data.labels)
        })
        .catch((err) => {
          // localStorage.removeItem("token")
        });
  }, []);

  const options = {
    maintainAspectRatio: false,
    tension: 0.3, // You can still use tension within segments
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
        text: "7 Day Moving Average of Bodyweight",
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
          text: "Bodyweight",
          color: "white",
          font: {
            family: "Roboto Mono",
            size: 14,
            weight: "bold" as const,
          },
        },
        beginAtZero: false,
      },
    },
  };

  const lineChartData = {
    // create label for every dat
    labels: labels,
    datasets: [
      {
        label: "7 Day Moving Average",
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

export default BodyweightGraph;
