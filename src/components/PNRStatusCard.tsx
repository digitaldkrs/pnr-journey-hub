import { Train, MapPin, Calendar, Clock, User, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PassengerStatus {
  name: string;
  age: number;
  gender: string;
  bookingStatus: string;
  currentStatus: string;
}

interface PNRData {
  pnr: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  fromCode: string;
  toStation: string;
  toCode: string;
  dateOfJourney: string;
  departureTime: string;
  arrivalTime: string;
  classType: string;
  chartStatus: string;
  passengers: PassengerStatus[];
}

interface PNRStatusCardProps {
  pnrData: PNRData | null;
  onReset: () => void;
}

const getStatusColor = (status: string) => {
  if (status.includes("CNF") || status.includes("Confirmed")) {
    return "text-success";
  } else if (status.includes("WL") || status.includes("Waiting")) {
    return "text-amber-500";
  } else if (status.includes("RAC")) {
    return "text-primary";
  } else if (status.includes("CAN")) {
    return "text-destructive";
  }
  return "text-foreground";
};

const getStatusIcon = (status: string) => {
  if (status.includes("CNF") || status.includes("Confirmed")) {
    return <CheckCircle className="w-5 h-5 text-success" />;
  } else if (status.includes("WL") || status.includes("RAC")) {
    return <AlertCircle className="w-5 h-5 text-amber-500" />;
  }
  return <XCircle className="w-5 h-5 text-destructive" />;
};

const PNRStatusCard = ({ pnrData, onReset }: PNRStatusCardProps) => {
  if (!pnrData) return null;

  return (
    <section id="demo" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-amber-500 p-6 text-primary-foreground">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Train className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">{pnrData.trainNumber} - {pnrData.trainName}</h3>
                    <p className="text-sm opacity-90">PNR: {pnrData.pnr}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${pnrData.chartStatus === "Prepared" ? "bg-primary-foreground/20" : "bg-primary-foreground/10"}`}>
                  Chart {pnrData.chartStatus}
                </span>
              </div>

              {/* Journey Details */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{pnrData.fromCode}</p>
                  <p className="text-sm opacity-90">{pnrData.fromStation}</p>
                  <p className="text-lg font-semibold mt-1">{pnrData.departureTime}</p>
                </div>
                <div className="flex-1 px-8">
                  <div className="relative">
                    <div className="h-0.5 bg-primary-foreground/30 w-full" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-foreground" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-foreground" />
                    <Train className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary text-primary-foreground rounded-full p-1" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{pnrData.toCode}</p>
                  <p className="text-sm opacity-90">{pnrData.toStation}</p>
                  <p className="text-lg font-semibold mt-1">{pnrData.arrivalTime}</p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{pnrData.dateOfJourney}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">8h 30m</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Class</p>
                  <p className="font-medium">{pnrData.classType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Passengers</p>
                  <p className="font-medium">{pnrData.passengers.length}</p>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Passenger Details
              </h4>
              <div className="space-y-4">
                {pnrData.passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{passenger.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {passenger.age} yrs, {passenger.gender}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      {getStatusIcon(passenger.currentStatus)}
                      <div>
                        <p className={`font-semibold ${getStatusColor(passenger.currentStatus)}`}>
                          {passenger.currentStatus}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Booked: {passenger.bookingStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-card/50 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={onReset}>
                Check Another PNR
              </Button>
              <Button variant="glass" size="lg">
                Set Alert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PNRStatusCard;
