import { Search, Loader2, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Enter PNR Number",
    description: "Enter your 10-digit PNR number from your railway ticket or booking confirmation.",
  },
  {
    icon: Loader2,
    step: "02",
    title: "We Fetch Details",
    description: "Our system connects to railway databases and retrieves your booking information instantly.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Get Status",
    description: "View comprehensive details including seat status, coach position, and journey information.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple <span className="text-gradient">3-Step</span> Process
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Checking your PNR status has never been easier. Just follow these simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((step, index) => (
            <div key={step.step} className="relative text-center">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center shadow-lg">
                    <step.icon className={`w-10 h-10 text-primary-foreground ${index === 1 ? 'animate-spin' : ''}`} style={index === 1 ? { animationDuration: '3s' } : {}} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
