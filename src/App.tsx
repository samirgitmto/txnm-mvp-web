import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import './App.css';
import HomePage from './components/HomePage';
import Individuals from './components/pages/Individuals';
import Businesses from './components/pages/Businesses';
import Register from './components/pages/Register';
import AboutUs from './components/pages/AboutUs';
import TransactionList from './components/TransactionList';
import WeeklyAnalytics from './components/analytics/WeeklyAnalytics';
import DailyAnalytics from './components/analytics/DailyAnalytics';
import FiveDayAnalytics from './components/analytics/FiveDayAnalytics';
import { SessionProvider } from './contexts/SessionContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GoogleLogin from './components/auth/GoogleLogin';
import { Container, Box, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider>
        <AuthProvider>
          <Router>
            <div className="app">
              <Header />
              <main className="main-content">
                <Container maxWidth="lg">
                  <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      TXNM MVP
                    </Typography>
                    <GoogleLogin />
                  </Box>
                </Container>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/individuals" element={<Individuals />} />
                  <Route path="/businesses" element={<Businesses />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/transactions" element={<TransactionList />} />
                  <Route path="/transactions/analytics" element={<DailyAnalytics />} />
                  <Route path="/analytics/weekly" element={<WeeklyAnalytics />} />
                  <Route path="/analytics/daily" element={<DailyAnalytics />} />
                  <Route path="/analytics/five-day" element={<FiveDayAnalytics />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
