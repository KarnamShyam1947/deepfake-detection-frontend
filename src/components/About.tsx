import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            About <span className="primary-gradient bg-clip-text text-transparent">DeepDetect AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Protecting digital authenticity through advanced artificial intelligence and neural network analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission Content */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                In an era where deepfake technology poses significant threats to digital trust, 
                DeepDetect AI stands as a guardian of authenticity. We leverage cutting-edge machine 
                learning algorithms to identify manipulated video content with unprecedented precision.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">The Problem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deepfake technology is becoming increasingly sophisticated, making it harder to 
                distinguish between real and fake content. This poses serious risks to journalism, 
                law enforcement, social media integrity, and personal security.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Our Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                DeepDetect AI uses advanced neural networks trained on millions of video samples 
                to detect even the most subtle signs of manipulation, providing users with confidence 
                scores and detailed analysis reports.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="p-6 glass-effect border-0">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">AI-Powered Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Advanced neural networks detect manipulation patterns invisible to the human eye
              </p>
            </Card>

            <Card className="p-6 glass-effect border-0">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Real-time Processing</h4>
              <p className="text-sm text-muted-foreground">
                Get detection results in seconds with our optimized AI pipeline
              </p>
            </Card>

            <Card className="p-6 glass-effect border-0">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Secure & Private</h4>
              <p className="text-sm text-muted-foreground">
                Your videos are processed securely and deleted immediately after analysis
              </p>
            </Card>

            <Card className="p-6 glass-effect border-0">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Detailed Reports</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive analysis with confidence scores and technical insights
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;