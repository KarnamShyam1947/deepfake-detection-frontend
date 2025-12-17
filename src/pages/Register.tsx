import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Label, Separator, GitHubIcon, GoogleIcon } from "@/components/ui/login-2";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, "");
      
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to DeepDetect AI!, your account created successfully",
      });
      
      navigate('/');
    } catch (error) {
      
      toast({
        title: "Registration failed",
        description: error.error,
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Registration`,
      description: "Social registration will be integrated with Supabase.",
    });
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center space-x-1.5 mb-6">
            <div className="text-3xl font-bold primary-gradient bg-clip-text text-transparent">
              <Link to="/">DeepDetect AI</Link>
            </div>
          </div>
          <h3 className="text-center text-lg font-semibold text-foreground">
            Create your account
          </h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </Link>
          </p>
          
          <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              variant="outline"
              className="flex-1 items-center justify-center space-x-2 py-2"
              onClick={() => handleSocialLogin("GitHub")}
            >
              <GitHubIcon className="size-5" aria-hidden={true} />
              <span className="text-sm font-medium">Register with GitHub</span>
            </Button>
            <Button
              variant="outline"
              className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
              onClick={() => handleSocialLogin("Google")}
            >
              <GoogleIcon className="size-4" aria-hidden={true} />
              <span className="text-sm font-medium">Register with Google</span>
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Enter your full name"
                className="mt-2"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="your.email@example.com"
                className="mt-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Create a strong password"
                className="mt-2"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 8 characters with letters, numbers, and symbols
              </p>
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="mt-2"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-0.5"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="mt-4 w-full py-2 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;