import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Input, Label, Separator, GitHubIcon, GoogleIcon } from "@/components/ui/login-2";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { error } from "console";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();
  const { login, isLoading, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  localStorage.setItem("next", from);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data: any = await login(formData.email, formData.password);
      console.log(data);

      if (data.error) {
        throw new Error();
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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
    const pid = provider.toLowerCase();
    window.location.href = `http://localhost:8081/oauth2/authorization/${pid}`;
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
            Sign in to your account
          </h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign up
            </Link>
          </p>

          <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              variant="outline"
              className="flex-1 items-center justify-center space-x-2 py-2"
              onClick={() => handleSocialLogin("GitHub")}
            >
              <GitHubIcon className="size-5" aria-hidden={true} />
              <span className="text-sm font-medium">Login with GitHub</span>
            </Button>
            <Button
              variant="outline"
              className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
              onClick={() => handleSocialLogin("Google")}
            >
              <GoogleIcon className="size-4" aria-hidden={true} />
              <span className="text-sm font-medium">Login with Google</span>
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
                autoComplete="current-password"
                placeholder="Enter your password"
                className="mt-2"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full py-2 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;