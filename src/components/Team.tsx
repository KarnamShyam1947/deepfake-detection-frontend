import { Card } from "@/components/ui/card";
import teamPlaceholder from "@/assets/team-placeholder.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Karnam Shyam",
      role: "Full Stack Developer",
      description: "Lead developer specializing in AI integration and full-stack architecture",
      image: teamPlaceholder,
      gradient: "bg-gradient-primary"
    },
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      description: "UI/UX specialist focused on creating intuitive user experiences",
      image: teamPlaceholder,
      gradient: "bg-gradient-neural"
    },
    {
      name: "Sarah Chen",
      role: "Backend Developer",
      description: "Backend architecture and API development expert",
      image: teamPlaceholder,
      gradient: "bg-secondary"
    },
    {
      name: "Michael Rodriguez",
      role: "UI/UX Designer",
      description: "Creative designer crafting beautiful and functional interfaces",
      image: teamPlaceholder,
      gradient: "bg-accent"
    },
    {
      name: "Prof. Dr. Emily Watson",
      role: "Project Supervisor",
      description: "Academic supervisor guiding the research and development process",
      image: teamPlaceholder,
      gradient: "bg-gradient-primary",
      isGuide: true
    }
  ];

  return (
    <section id="team" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Meet Our <span className="primary-gradient bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Passionate developers and researchers dedicated to advancing AI-powered detection technology
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers.filter(member => !member.isGuide).map((member, index) => (
            <Card 
              key={member.name}
              className="p-6 hover-lift glass-effect border-0 group text-center animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className={`w-24 h-24 ${member.gradient} rounded-full p-1 mx-auto group-hover:animate-glow`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-8 w-6 h-6 bg-success rounded-full border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Member Info */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              
              <p className="text-primary font-medium mb-3 text-sm">
                {member.role}
              </p>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Supervisor Section */}
        <div className="flex justify-center">
          {teamMembers.filter(member => member.isGuide).map((member) => (
            <Card 
              key={member.name}
              className="p-8 hover-lift glass-effect border-0 group text-center max-w-md animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="mb-4">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  PROJECT SUPERVISOR
                </span>
              </div>
              
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className={`w-32 h-32 ${member.gradient} rounded-full p-1 mx-auto group-hover:animate-glow`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Member Info */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              
              <p className="text-primary font-medium mb-4">
                {member.role}
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;