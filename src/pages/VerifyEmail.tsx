import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate('/verify/expired');
        return;
      }

      try {
        setIsVerifying(true);
        
        // Make API call to verify token
        const response = await axios.get(`http://127.0.0.1:8081/api/v1/auth/user/activate/${token}`);

        if (response.data.message) {
          navigate('/verify/success');
        } else {
          navigate('/verify/expired');
        }
      } catch (error) {
        console.error('Verification failed:', error);
        navigate('/verify/expired');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Verifying Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">
              Please wait while we verify your email address...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;