import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PNRStatusCard from "@/components/PNRStatusCard";
import Footer from "@/components/Footer";

// Demo PNR data
const demoPNRData = {
  pnr: "8547619283",
  trainNumber: "12301",
  trainName: "Howrah Rajdhani Express",
  fromStation: "New Delhi",
  fromCode: "NDLS",
  toStation: "Howrah Junction",
  toCode: "HWH",
  dateOfJourney: "25 Dec 2024",
  departureTime: "16:55",
  arrivalTime: "09:55",
  classType: "3A - Third AC",
  chartStatus: "Prepared",
  passengers: [
    {
      name: "Rahul Sharma",
      age: 32,
      gender: "Male",
      bookingStatus: "WL/15",
      currentStatus: "CNF/B2/45",
    },
    {
      name: "Priya Sharma",
      age: 28,
      gender: "Female",
      bookingStatus: "WL/16",
      currentStatus: "CNF/B2/46",
    },
    {
      name: "Arjun Sharma",
      age: 5,
      gender: "Male",
      bookingStatus: "WL/17",
      currentStatus: "CNF/B2/47",
    },
  ],
};

const Index = () => {
  const [pnrValue, setPnrValue] = useState("");
  const [pnrData, setPnrData] = useState<typeof demoPNRData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckPNR = (pnr: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPnrData({ ...demoPNRData, pnr });
      setIsLoading(false);
      // Scroll to results
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  const handleReset = () => {
    setPnrData(null);
    setPnrValue("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection
          onCheckPNR={handleCheckPNR}
          pnrValue={pnrValue}
          setPnrValue={setPnrValue}
        />
        
        {pnrData ? (
          <PNRStatusCard pnrData={pnrData} onReset={handleReset} />
        ) : (
          <>
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}
      </main>
      <Footer />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">Fetching PNR Status...</p>
            <p className="text-sm text-muted-foreground">Please wait a moment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
