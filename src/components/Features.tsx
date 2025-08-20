
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const features = [
    {
      title: "Advanced Neural Networks",
      description: "State-of-the-art deep learning models trained on millions of video samples for unparalleled accuracy",
      icon: "🧠",
      gradient: "bg-gradient-primary",
      badges: ["99.2% Accuracy", "Real-time", "GPU Accelerated"]
    },
    {
      title: "Multi-Format Support",
      description: "Supports all major video formats including MP4, WebM, AVI, and MOV with automatic format detection",
      icon: "🎥",
      gradient: "bg-gradient-neural",
      badges: ["MP4", "WebM", "AVI", "MOV"]
    },
    {
      title: "Batch Processing",
      description: "Upload and analyze multiple videos simultaneously with our enterprise-grade processing pipeline",
      icon: "⚡",
      gradient: "bg-secondary",
      badges: ["Bulk Upload", "Queue System", "Progress Tracking"]
    },
    {
      title: "API Integration",
      description: "RESTful API for seamless integration into your existing workflows and applications",
      icon: "🔌",
      gradient: "bg-accent",
      badges: ["REST API", "SDKs", "Webhooks"]
    },
    {
      title: "Forensic Analysis",
      description: "Detailed forensic reports with frame-by-frame analysis and manipulation detection heatmaps",
      icon: "🔍",
      gradient: "bg-gradient-primary",
      badges: ["Frame Analysis", "Heatmaps", "Evidence Export"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud infrastructure ensuring high availability and lightning-fast processing speeds",
      icon: "☁️",
      gradient: "bg-gradient-neural",
      badges: ["99.9% Uptime", "Auto-scaling", "Global CDN"]
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up text-foreground">
            Powerful <span className="primary-gradient bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Cutting-edge technology stack designed for accuracy, speed, and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="p-8 hover-lift glass-effect border-0 group animate-fade-in-up bg-card text-card-foreground"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:animate-neural`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {feature.badges.map((badge) => (
                  <Badge 
                    key={badge} 
                    variant="secondary" 
                    className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8 animate-fade-in-up text-foreground">
            Built with <span className="text-primary">Cutting-Edge Technology</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { name: "TensorFlow", icon: "🤖" },
              { name: "PyTorch", icon: "🔥" },
              { name: "OpenCV", icon: "👁️" },
              { name: "React", icon: "⚛️" },
              { name: "Spring Boot", icon: "🍃" },
              { name: "AWS", icon: "☁️" }
            ].map((tech) => (
              <div 
                key={tech.name}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-muted/30 transition-colors hover-lift group"
              >
                <div className="text-3xl mb-2 group-hover:animate-glow">{tech.icon}</div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
