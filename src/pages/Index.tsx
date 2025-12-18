import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PNRStatusCard from "@/components/PNRStatusCard";
import Footer from "@/components/Footer";

interface PNRApiResponse {
  success: boolean;
  data?: {
    pnrNumber: string;
    trainNumber: string;
    trainName: string;
    sourceStation: string;
    destinationStation: string;
    reservationUpto: string;
    boardingPoint: string;
    dateOfJourney: string;
    journeyClass: string;
    chartStatus: string;
    numberOfpassenger: number;
    passengerList: Array<{
      passengerSerialNumber: number;
      bookingStatus: string;
      bookingBerthNo: number;
      bookingStatusDetails: string;
      currentStatus: string;
      currentCoachId: string;
      currentBerthNo: number;
      currentStatusDetails: string;
    }>;
    bookingFare: number;
    ticketFare: number;
    quota: string;
    bookingDate: string;
    arrivalDate: string;
    distance: number;
    informationMessage?: string[];
  };
  error?: string;
}

const Index = () => {
  const [pnrValue, setPnrValue] = useState("");
  const [pnrData, setPnrData] = useState<PNRApiResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckPNR = async (pnr: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('check-pnr', {
        body: { pnr }
      });

      if (error) {
        throw new Error(error.message);
      }

      const response = data as PNRApiResponse;

      if (response.success && response.data) {
        setPnrData(response.data);
        // Scroll to results
        setTimeout(() => {
          document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to fetch PNR status. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('PNR check error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch PNR status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
