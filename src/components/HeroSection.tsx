import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroTrain from "@/assets/hero-train.jpg";

interface HeroSectionProps {
  onCheckPNR: (pnr: string) => void;
  pnrValue: string;
  setPnrValue: (value: string) => void;
}

const HeroSection = ({ onCheckPNR, pnrValue, setPnrValue }: HeroSectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnrValue.length === 10) {
      onCheckPNR(pnrValue);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroTrain}
          alt="High-speed train at sunset"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              🚂 India's #1 PNR Status Checker
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up-delay">
            Track Your Train Journey{" "}
            <span className="text-gradient">Instantly</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up-delay-2">
            Get real-time PNR status updates, live train tracking, and accurate seat confirmation predictions in seconds.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto animate-slide-up-delay-2">
  Get real-time PNR status updates, live train tracking, and accurate seat confirmation predictions in seconds.
</p>

<p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl mx-auto">
  For more online tools, visit{" "}
  <a
    href="https://thedapachecker.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline font-semibold text-primary"
  >
    The DA PA Checker
  </a>
  {" "}and for free astrology calculators, visit{" "}
  <a
    href="https://vedictemple.in/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline font-semibold text-primary"
  >
    Vedic Temple
  </a>.
</p>

          <form onSubmit={handleSubmit} className="animate-slide-up-delay-2">
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter 10-digit PNR number"
                  value={pnrValue}
                  onChange={(e) => setPnrValue(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-12 h-14 text-lg"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="xl"
                disabled={pnrValue.length !== 10}
              >
                Check Status
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>

          <p className="text-sm text-muted-foreground mt-4 animate-slide-up-delay-2">
            Enter your 10-digit PNR number to check your train booking status
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-slide-up-delay-2">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">10M+</div>
              <div className="text-sm text-muted-foreground mt-1">PNR Checks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">99.9%</div>
              <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">2s</div>
              <div className="text-sm text-muted-foreground mt-1">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
