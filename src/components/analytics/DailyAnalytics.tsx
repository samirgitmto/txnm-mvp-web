import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import SessionService from '../../services/sessionService';
import './DailyAnalytics.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DailyAnalyticsDTO {
    date: string;
    totalExpenditure: number;
    totalMoneyReceived: number;
    transactionCount: number;
    closingBalance: number;
}

interface ApiResponse<T> {
    message: string;
    data: T;
    success: boolean;
}

const DailyAnalytics: React.FC = () => {
    const [analytics, setAnalytics] = useState<DailyAnalyticsDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const sessionService = SessionService.getInstance();

    useEffect(() => {
        const fetchDailyAnalytics = async () => {
            try {
                const sessionId = sessionService.getSessionId();
                if (!sessionId) {
                    setError('No active session found');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:8241/transactions/get/analytics/daily?sessionId=${sessionId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result: ApiResponse<DailyAnalyticsDTO[]> = await response.json();
                
                if (result.success) {
                    setAnalytics(result.data);
                } else {
                    setError(result.message || 'Failed to fetch analytics data');
                }
            } catch (err) {
                setError('An error occurred while fetching analytics data');
            } finally {
                setLoading(false);
            }
        };

        fetchDailyAnalytics();
    }, []);

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getChartData = () => {
        const labels = analytics.map(day => formatDate(day.date));
        
        return {
            labels,
            datasets: [
                {
                    label: 'Closing Balance',
                    data: analytics.map(day => day.closingBalance),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    tension: 0.1
                }
            ]
        };
    };

    const getBarChartData = () => {
        const labels = analytics.map(day => formatDate(day.date));
        
        return {
            labels,
            datasets: [
                {
                    label: 'Total Expenditure',
                    data: analytics.map(day => day.totalExpenditure),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                },
                {
                    label: 'Total Money Received',
                    data: analytics.map(day => day.totalMoneyReceived),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }
            ]
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily Analytics'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading analytics data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="analytics-container">
            <div className="analytics-header">
                <button 
                    className="back-button"
                    onClick={() => navigate('/transactions')}
                >
                    ← Back to Transactions
                </button>
                <h2>Daily Transaction Analytics</h2>
            </div>

            <div className="charts-container">
                <div className="chart-wrapper">
                    <Line data={getChartData()} options={chartOptions} />
                </div>
                <div className="chart-wrapper">
                    <Bar data={getBarChartData()} options={chartOptions} />
                </div>
            </div>

            <div className="analytics-table-container">
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Expenditure</th>
                            <th>Total Money Received</th>
                            <th>Transaction Count</th>
                            <th>Closing Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analytics.map((day) => (
                            <tr key={day.date}>
                                <td>{formatDate(day.date)}</td>
                                <td className="negative">{formatAmount(day.totalExpenditure)}</td>
                                <td className="positive">{formatAmount(day.totalMoneyReceived)}</td>
                                <td>{day.transactionCount}</td>
                                <td>{formatAmount(day.closingBalance)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyAnalytics; 