import { Zap, Shield, Bell, MapPin, Clock, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get PNR status in under 2 seconds with our optimized API infrastructure.",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your data is encrypted and never stored. Complete privacy guaranteed.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive instant notifications when your booking status changes.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your train's live location with real-time GPS updates.",
  },
  {
    icon: Clock,
    title: "Delay Predictions",
    description: "AI-powered delay predictions to help you plan better.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Fully responsive design works on any device, anywhere.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">RailTrack</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the most advanced PNR tracking system with features designed to make your journey stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
