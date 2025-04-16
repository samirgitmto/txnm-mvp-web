import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Transaction } from '../types/transaction';
import './TransactionList.css';

const TransactionList: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null);

    useEffect(() => {
        // Try to get transactions from location state first
        if (location.state?.transactions) {
            setTransactions(location.state.transactions);
            setMessage(location.state.message);
            // Store in sessionStorage for persistence
            sessionStorage.setItem('transactions', JSON.stringify(location.state.transactions));
        } else {
            // If not in location state, try to get from sessionStorage
            const storedTransactions = sessionStorage.getItem('transactions');
            if (storedTransactions) {
                setTransactions(JSON.parse(storedTransactions));
            }
        }
    }, [location.state]);

    const groupTransactionsByPeriod = () => {
        const grouped = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const period = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            if (!acc[period]) {
                acc[period] = [];
            }
            acc[period].push(transaction);
            return acc;
        }, {} as Record<string, Transaction[]>);

        return Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a));
    };

    const calculatePeriodSummary = (transactions: Transaction[]) => {
        const totalCredit = transactions.reduce((sum, t) => sum + (t.credit || 0), 0);
        const totalDebit = transactions.reduce((sum, t) => sum + (t.debit || 0), 0);
        const netAmount = totalCredit - totalDebit;
        
        return {
            totalCredit,
            totalDebit,
            netAmount,
            transactionCount: transactions.length
        };
    };

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

    const handleAnalyticsClick = () => {
        navigate('/transactions/analytics', { state: { transactions } });
    };

    const groupedTransactions = groupTransactionsByPeriod();

    if (transactions.length === 0) {
        return (
            <div className="transaction-list-container">
                <div className="error">No transactions found. Please upload a statement to view transactions.</div>
            </div>
        );
    }

    return (
        <div className="transaction-list-container">
            <div className="transaction-header">
                <div className="header-left">
                    <button 
                        className="home-button"
                        onClick={() => navigate('/')}
                    >
                        ← Home
                    </button>
                    <h2>Transaction Summary</h2>
                </div>
                <div className="header-actions">
                    <button 
                        className="analytics-btn"
                        onClick={handleAnalyticsClick}
                    >
                        View Analytics
                    </button>
                </div>
            </div>

            {message && <div className="success-message">{message}</div>}

            <div className="transaction-table-container">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Total Credit</th>
                            <th>Total Debit</th>
                            <th>Net Amount</th>
                            <th>Transaction Count</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedTransactions.map(([period, periodTransactions]) => {
                            const summary = calculatePeriodSummary(periodTransactions);
                            const isExpanded = expandedPeriod === period;
                            
                            return (
                                <React.Fragment key={period}>
                                    <tr className="period-row">
                                        <td>{period}</td>
                                        <td>{formatAmount(summary.totalCredit)}</td>
                                        <td>{formatAmount(summary.totalDebit)}</td>
                                        <td className={summary.netAmount >= 0 ? 'positive' : 'negative'}>
                                            {formatAmount(summary.netAmount)}
                                        </td>
                                        <td>{summary.transactionCount}</td>
                                        <td>
                                            <button
                                                className="details-btn"
                                                onClick={() => setExpandedPeriod(isExpanded ? null : period)}
                                            >
                                                {isExpanded ? 'Hide Details' : 'Show Details'}
                                            </button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr className="details-row">
                                            <td colSpan={6}>
                                                <table className="details-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Reference</th>
                                                            <th>Credit</th>
                                                            <th>Debit</th>
                                                            <th>Balance</th>
                                                            <th>Bank</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {periodTransactions.map((transaction) => (
                                                            <tr key={transaction.tId}>
                                                                <td>{formatDate(transaction.date)}</td>
                                                                <td>{transaction.reference}</td>
                                                                <td className="positive">
                                                                    {transaction.credit ? formatAmount(transaction.credit) : '-'}
                                                                </td>
                                                                <td className="negative">
                                                                    {transaction.debit ? formatAmount(transaction.debit) : '-'}
                                                                </td>
                                                                <td>{formatAmount(transaction.balance)}</td>
                                                                <td>{transaction.bankName}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList; 