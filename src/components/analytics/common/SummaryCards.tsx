import React from 'react';
import './SummaryCards.css';

interface SummaryCardsProps {
  analytics: {
    openingBalance: number;
    closingBalance: number;
    netDifference: number;
    highestCredit: number;
    highestDebit: number;
    averageCredit: number;
    averageDebit: number;
    totalTransactions: number;
    mostActiveDay: {
      periodNumber: number;
      transactions: any[];
    };
  };
  periodLabel: string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ analytics, periodLabel }) => {
  const getNetDifferenceClass = (difference: number) => {
    if (difference > 0) return 'credit';
    if (difference < 0) return 'debit';
    return 'neutral';
  };

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h3>Opening Balance</h3>
        <p className="credit">+₹{analytics.openingBalance.toLocaleString()}</p>
      </div>

      <div className="summary-card">
        <h3>Closing Balance</h3>
        <p className={analytics.closingBalance >= analytics.openingBalance ? 'credit' : 'debit'}>
          {analytics.closingBalance >= analytics.openingBalance ? '+' : '-'}₹{Math.abs(analytics.closingBalance).toLocaleString()}
        </p>
      </div>

      <div className="summary-card">
        <h3>Net Change</h3>
        <p className={getNetDifferenceClass(analytics.netDifference)}>
          {analytics.netDifference > 0 ? '+' : analytics.netDifference < 0 ? '-' : ''}₹{Math.abs(analytics.netDifference).toLocaleString()}
        </p>
      </div>
      
      <div className="summary-card">
        <h3>Highest Credit</h3>
        <p className="credit">+₹{analytics.highestCredit.toLocaleString()}</p>
      </div>
      
      <div className="summary-card">
        <h3>Highest Debit</h3>
        <p className="debit">-₹{analytics.highestDebit.toLocaleString()}</p>
      </div>
      
      <div className="summary-card">
        <h3>Average Credit</h3>
        <p className="credit">+₹{analytics.averageCredit.toLocaleString()}</p>
      </div>
      
      <div className="summary-card">
        <h3>Average Debit</h3>
        <p className="debit">-₹{analytics.averageDebit.toLocaleString()}</p>
      </div>
      
      <div className="summary-card">
        <h3>Total Transactions</h3>
        <p>{analytics.totalTransactions}</p>
      </div>
      
      <div className="summary-card">
        <h3>Most Active {periodLabel}</h3>
        <p>{periodLabel} {analytics.mostActiveDay.periodNumber}</p>
        <p>{analytics.mostActiveDay.transactions.length} transactions</p>
      </div>
    </div>
  );
};

export default SummaryCards; 