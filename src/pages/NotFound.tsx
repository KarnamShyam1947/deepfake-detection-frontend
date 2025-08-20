import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground primary-gradient bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-muted-foreground">Oops! Page not found</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="pt-4">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-300 hover-lift"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;