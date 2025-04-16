import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryCards from './common/SummaryCards';
import AnalyticsCharts from './common/AnalyticsCharts';
import './FiveDayAnalytics.css';

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface PeriodData {
  period: string;
  periodNumber: number;
  credits: number;
  debits: number;
  netAmount: number;
  transactions: Transaction[];
}

interface AnalyticsData {
  openingBalance: number;
  closingBalance: number;
  netDifference: number;
  highestCredit: number;
  highestDebit: number;
  averageCredit: number;
  averageDebit: number;
  totalTransactions: number;
  mostActiveDay: PeriodData;
}

const FiveDayAnalytics: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [graphType, setGraphType] = useState<'line' | 'bar'>('line');
  const state = location.state as { periodData: PeriodData[] } | null;
  
  if (!state?.periodData) {
    return (
      <div className="error-message">
        <h2>No data available</h2>
        <p>Please go back to the transactions page and try again.</p>
        <button className="back-to-summary-btn" onClick={() => navigate('/transactions')}>
          Back to Transactions
        </button>
      </div>
    );
  }

  const { periodData } = state;

  const getAnalyticsData = (): AnalyticsData => {
    const openingBalance = 50000;
    const closingBalance = openingBalance + periodData.reduce((sum, p) => sum + (p.credits - p.debits), 0);
    const netDifference = closingBalance - openingBalance;
    
    return {
      openingBalance,
      closingBalance,
      netDifference,
      highestCredit: Math.max(...periodData.map(p => p.credits)),
      highestDebit: Math.max(...periodData.map(p => p.debits)),
      averageCredit: periodData.reduce((sum, p) => sum + p.credits, 0) / periodData.length,
      averageDebit: periodData.reduce((sum, p) => sum + p.debits, 0) / periodData.length,
      totalTransactions: periodData.reduce((sum, p) => sum + p.transactions.length, 0),
      mostActiveDay: periodData.reduce((max, current) => 
        current.transactions.length > max.transactions.length ? current : max
      )
    };
  };

  const handleBackToTransactions = () => {
    navigate('/transactions');
  };

  return (
    <div className="analytics-view">
      <div className="analytics-header">
        <h2>5-Day Analytics</h2>
        <div className="controls-right">
          <select
            className="graph-type-select"
            value={graphType}
            onChange={(e) => setGraphType(e.target.value as 'line' | 'bar')}
          >
            <option value="line">Line Graph</option>
            <option value="bar">Bar Graph</option>
          </select>
          <button className="back-to-summary-btn" onClick={handleBackToTransactions}>
            Back to Transactions
          </button>
        </div>
      </div>
      <SummaryCards 
        analytics={getAnalyticsData()}
        periodLabel="5-Day"
      />
      <AnalyticsCharts
        periodData={periodData}
        graphType={graphType}
        viewType="five-day"
      />
    </div>
  );
};

export default FiveDayAnalytics; 