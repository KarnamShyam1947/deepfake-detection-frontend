import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { resendVerificationAPICall } from '@/services/AuthService';

const NotActivated: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      // TODO: Make API call to resend verification email
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
      const data = await resendVerificationAPICall();
      console.log(data);

      toast({
        title: "Verification email sent",
        description: "Please check your email for the verification link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-warning" />
            Account Not Activated
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Your account hasn't been activated yet. Please check your email for the verification link.
          </p>
          <p className="text-sm text-muted-foreground">
            If you haven't received the email, you can request a new verification link.
          </p>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleResendVerification}
              className="w-full"
              variant="default"
              disabled={isResending}
            >
              <Mail className="h-4 w-4 mr-2" />
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotActivated;