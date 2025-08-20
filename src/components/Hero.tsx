import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ai-detection.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/3 rounded-full blur-3xl animate-neural"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="block text-foreground mb-2">Detect</span>
              <span className="primary-gradient bg-clip-text text-transparent">
                Deepfakes
              </span>
              <span className="block text-foreground">with AI Precision</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Advanced AI-powered deepfake detection technology that analyzes videos 
              with cutting-edge neural networks to identify manipulated content with 
              unprecedented accuracy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/register">
                <Button size="lg" className="hover-lift font-semibold px-8 py-4 text-lg">
                  Try Detection Now
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="hover-lift border-primary/20 hover:border-primary/40 font-semibold px-8 py-4 text-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">1M+</div>
                <div className="text-sm text-muted-foreground">Videos Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Monitoring</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img
                src="/hero-image.png"
                alt="AI Neural Network Face Detection Visualization"
                className="w-full h-auto rounded-2xl shadow-neural hover-lift"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full animate-glow blur-sm opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-glass rounded-full animate-float border border-border/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-8 h-12 border-2 border-primary/30 rounded-full flex items-end justify-center pb-2 hover:border-primary/60 transition-colors"
        >
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </button>
      </div>
    </section>
  );
};

export default Hero;