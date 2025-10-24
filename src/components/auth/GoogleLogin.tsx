import React from 'react';
import { useSession } from '../../contexts/SessionContext';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLogin: React.FC = () => {
    const { isAuthenticated } = useSession();

    const handleGoogleLogin = () => {
        // Redirect to backend OAuth2 endpoint
        window.location.href = 'http://localhost:8241/oauth2/authorization/google';
    };

    if (isAuthenticated) {
        return null;
    }

    return (
        <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
                backgroundColor: '#fff',
                color: '#757575',
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                },
            }}
        >
            Sign in with Google
        </Button>
    );
};

export default GoogleLogin; 