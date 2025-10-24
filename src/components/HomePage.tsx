import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import transactionService from '../services/transactionService';
import { ApiResponse, Transaction } from '../types/transaction';
import { bankConfigs } from '../types/bank';
import LoginModal from './auth/LoginModal';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [statementKey, setStatementKey] = useState<string>('');
  const [keyError, setKeyError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bank = e.target.value;
    setSelectedBank(bank);
    setStatementKey('');
    setKeyError(null);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setStatementKey(key);
    
    if (selectedBank) {
      const bankConfig = bankConfigs[selectedBank];
      const regex = new RegExp(bankConfig.keyFormat);
      if (!regex.test(key)) {
        setKeyError(`Invalid format. ${bankConfig.keyHint}`);
      } else {
        setKeyError(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFilePath(file.name);
        setFile(file);
        setError('');
      } else {
        setError('Please upload a PDF file');
        setFilePath('');
        setFile(null);
      }
    }
  };

  const processTransaction = async () => {
    if (!file || !selectedBank || !statementKey || keyError) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const response = await transactionService.parseTransactions(
        file,
        statementKey,
        selectedBank
      );

      if (response.success) {
        navigate('/transactions', { 
          state: { 
            transactions: response.data,
            message: 'Transactions parsed successfully!' 
          } 
        });
      } else {
        setError(response.message || 'Failed to parse transactions');
      }
    } catch (err) {
      setError('An error occurred while processing the file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      await processTransaction();
    }
  };

  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    await processTransaction();
  };

  const selectedBankConfig = selectedBank ? bankConfigs[selectedBank] : null;

  return (
    <div className="home-page">
      <div className="advertisement">
        <h2>Welcome to Our Banking App</h2>
        <p>Experience seamless banking with our state-of-the-art platform</p>
        <div className="features">
          <div className="feature">
            <h3>Secure Transactions</h3>
            <p>Bank with confidence using our advanced security measures</p>
          </div>
          <div className="feature">
            <h3>Real-time Updates</h3>
            <p>Stay informed with instant transaction notifications</p>
          </div>
          <div className="feature">
            <h3>Easy Management</h3>
            <p>Manage your finances with our intuitive interface</p>
          </div>
        </div>
      </div>

      <div className="input-group">
        <div className="input-block">
          <select
            className="bank-select"
            value={selectedBank}
            onChange={handleBankChange}
            required
          >
            <option value="">Select Your Bank</option>
            {Object.entries(bankConfigs).map(([code, config]) => (
              <option key={code} value={code}>
                {config.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBank && (
          <div className="input-block">
            <input
              type="text"
              className="bank-select"
              value={statementKey}
              onChange={handleKeyChange}
              placeholder={selectedBankConfig?.keyPlaceholder}
              required
            />
            {keyError && <div className="error-message">{keyError}</div>}
            <div className="hint-text">{selectedBankConfig?.keyHint}</div>
          </div>
        )}

        <div className="input-block">
          <div className="file-input-container">
            <label htmlFor="pdf-upload" className="file-input-label">
              {filePath ? filePath : 'Upload PDF Statement'}
            </label>
            <input
              id="pdf-upload"
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="file-input"
              required
            />
          </div>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <button
          className="view-transactions-btn"
          onClick={handleSubmit}
          disabled={isLoading || !selectedBank || !filePath || !statementKey || !!keyError}
        >
          {isLoading ? 'Processing...' : 'Upload Statement'}
        </button>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default HomePage; 