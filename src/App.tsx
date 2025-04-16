import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import TransactionList from './components/TransactionList';
import WeeklyAnalytics from './components/analytics/WeeklyAnalytics';
import DailyAnalytics from './components/analytics/DailyAnalytics';
import FiveDayAnalytics from './components/analytics/FiveDayAnalytics';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transactions/analytics" element={<DailyAnalytics />} />
          <Route path="/analytics/weekly" element={<WeeklyAnalytics />} />
          <Route path="/analytics/daily" element={<DailyAnalytics />} />
          <Route path="/analytics/five-day" element={<FiveDayAnalytics />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
