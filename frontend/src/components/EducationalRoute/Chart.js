import * as React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      align: 'center',
      usePointStyle: true,
    },
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(16, 16, 16, 0.1)',
        dashOffset: '',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, '#003790');
  }

  return gradient;
}

const labels = ['1 семестр', '2 семестр', '3 семестр', '4 семестр', '5 семестр', '6 семестр', '7 семестр', '8 семестр'];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Средний балл',
      // data: [4.64, 4.82, 4.26, 2.87, 3.53, 4.57, 3.42, 3.24],
      data: [3.75, 3.2, 4.0, 3.8, 4.33, 4.57, 4.57, 5.0],
      borderColor: '#264796',
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        return getGradient(ctx, chartArea);
      },
      pointRadius: 3,
      hoverRadius: 4,
      borderWidth: 1,
    },
  ],
};

const Container = styled.div`
  grid-area: chart;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 24px;
  margin: 0 0 0 24px;
  & h2 {
    font-size: 36px;
    line-height: 44px;
    text-align: center;
    margin: 0 0 16px 0;
  }
`;

export const Chart = () => {
  return (
    <Container>
      <h2>Сводная успеваемость</h2>
      <Line options={options} data={data} />
    </Container>
  );
};
