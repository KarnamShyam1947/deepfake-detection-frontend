import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, RotateCcw } from 'lucide-react';

const VerifyExpired: React.FC = () => {
  const navigate = useNavigate();

  const handleResendVerification = async () => {
    // You can implement resend logic here if needed
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <XCircle className="h-6 w-6 text-destructive" />
            Verification Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The verification link has expired or is invalid.
          </p>
          <p className="text-sm text-muted-foreground">
            Please request a new verification email to continue.
          </p>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleResendVerification}
              className="w-full"
              variant="default"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Request New Link
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyExpired;