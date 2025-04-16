import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsChartsProps {
  periodData: any[];
  viewType: 'weekly' | 'daily' | 'five-day';
  graphType: 'line' | 'bar';
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ periodData, viewType, graphType }) => {
  const getChartData = () => {
    const labels = periodData.map(period => 
      viewType === 'weekly' 
        ? `Week ${period.periodNumber}`
        : viewType === 'daily'
        ? `Day ${period.periodNumber}`
        : `Period ${period.periodNumber}`
    );

    const balances = calculateRunningBalance();

    return {
      labels,
      datasets: [
        {
          label: 'Balance',
          data: balances,
          backgroundColor: 'rgba(52, 152, 219, 0.5)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 1,
        }
      ],
    };
  };

  const getCreditDebitChartData = () => {
    const labels = periodData.map(period => 
      viewType === 'weekly' 
        ? `Week ${period.periodNumber}`
        : viewType === 'daily'
        ? `Day ${period.periodNumber}`
        : `Period ${period.periodNumber}`
    );

    return {
      labels,
      datasets: [
        {
          label: 'Credits',
          data: periodData.map(period => period.totalCredit),
          backgroundColor: 'rgba(46, 204, 113, 0.5)',
          borderColor: 'rgba(46, 204, 113, 1)',
          borderWidth: 1,
        },
        {
          label: 'Debits',
          data: periodData.map(period => period.totalDebit),
          backgroundColor: 'rgba(231, 76, 60, 0.5)',
          borderColor: 'rgba(231, 76, 60, 1)',
          borderWidth: 1,
        }
      ],
    };
  };

  const getTransactionCountChartData = () => {
    const labels = periodData.map(period => 
      viewType === 'weekly' 
        ? `Week ${period.periodNumber}`
        : viewType === 'daily'
        ? `Day ${period.periodNumber}`
        : `Period ${period.periodNumber}`
    );

    return {
      labels,
      datasets: [
        {
          label: 'Number of Transactions',
          data: periodData.map(period => period.transactions.length),
          backgroundColor: 'rgba(155, 89, 182, 0.5)',
          borderColor: 'rgba(155, 89, 182, 1)',
          borderWidth: 1,
        }
      ],
    };
  };

  const calculateRunningBalance = () => {
    let runningBalance = 50000;
    return periodData.map(period => {
      const netAmount = period.totalCredit - period.totalDebit;
      runningBalance += netAmount;
      return runningBalance;
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Account Balance by Period',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
    },
  };

  const creditDebitChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Credits and Debits by Period',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
    },
  };

  const transactionCountChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Number of Transactions by Period',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Transactions',
        },
      },
    },
  };

  return (
    <div className="analytics-charts">
      <div className="chart-container">
        {graphType === 'line' ? (
          <Line data={getChartData()} options={chartOptions} />
        ) : (
          <Bar data={getChartData()} options={chartOptions} />
        )}
      </div>

      <div className="chart-container">
        <Bar data={getCreditDebitChartData()} options={creditDebitChartOptions} />
      </div>

      <div className="chart-container">
        <Bar data={getTransactionCountChartData()} options={transactionCountChartOptions} />
      </div>
    </div>
  );
};

export default AnalyticsCharts; 