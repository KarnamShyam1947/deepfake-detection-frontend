import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const VerifySuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Email Verified
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Your email address has been successfully verified!
          </p>
          <p className="text-sm text-muted-foreground">
            You can now log in to your account and access all features.
          </p>
          <Button 
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifySuccess;