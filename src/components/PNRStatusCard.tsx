import { Train, MapPin, Calendar, Clock, User, CheckCircle, AlertCircle, XCircle, IndianRupee, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Passenger {
  passengerSerialNumber: number;
  bookingStatus: string;
  bookingBerthNo: number;
  bookingStatusDetails: string;
  currentStatus: string;
  currentCoachId: string;
  currentBerthNo: number;
  currentStatusDetails: string;
}

interface PNRData {
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
  passengerList: Passenger[];
  bookingFare: number;
  ticketFare: number;
  quota: string;
  bookingDate: string;
  arrivalDate: string;
  distance: number;
  informationMessage?: string[];
}

interface PNRStatusCardProps {
  pnrData: PNRData | null;
  onReset: () => void;
}

const getStatusColor = (status: string) => {
  if (status === "CNF") {
    return "text-success";
  } else if (status === "WL") {
    return "text-amber-500";
  } else if (status === "RAC") {
    return "text-primary";
  } else if (status === "CAN") {
    return "text-destructive";
  }
  return "text-foreground";
};

const getStatusIcon = (status: string) => {
  if (status === "CNF") {
    return <CheckCircle className="w-5 h-5 text-success" />;
  } else if (status === "WL" || status === "RAC") {
    return <AlertCircle className="w-5 h-5 text-amber-500" />;
  } else if (status === "CAN") {
    return <XCircle className="w-5 h-5 text-destructive" />;
  }
  return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "CNF": return "Confirmed";
    case "WL": return "Waiting List";
    case "RAC": return "RAC";
    case "CAN": return "Cancelled";
    default: return status;
  }
};

const PNRStatusCard = ({ pnrData, onReset }: PNRStatusCardProps) => {
  if (!pnrData) return null;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

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
                    <p className="text-sm opacity-90">PNR: {pnrData.pnrNumber}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${pnrData.chartStatus === "Chart Prepared" ? "bg-primary-foreground/20" : "bg-primary-foreground/10"}`}>
                  {pnrData.chartStatus}
                </span>
              </div>

              {/* Journey Details */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{pnrData.boardingPoint}</p>
                  <p className="text-sm opacity-90">Boarding</p>
                  <p className="text-lg font-semibold mt-1">{formatTime(pnrData.dateOfJourney)}</p>
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
                  <p className="text-2xl font-bold">{pnrData.destinationStation}</p>
                  <p className="text-sm opacity-90">Destination</p>
                  <p className="text-lg font-semibold mt-1">{formatTime(pnrData.arrivalDate)}</p>
                </div>
              </div>
            </div>

            {/* Info Message */}
            {pnrData.informationMessage && pnrData.informationMessage.length > 0 && (
              <div className="px-6 py-3 bg-amber-500/10 border-b border-amber-500/20">
                {pnrData.informationMessage.map((msg, idx) => (
                  <p key={idx} className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    ⚠️ {msg}
                  </p>
                ))}
              </div>
            )}

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Journey Date</p>
                  <p className="font-medium">{formatDate(pnrData.dateOfJourney)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Class / Quota</p>
                  <p className="font-medium">{pnrData.journeyClass} / {pnrData.quota}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Route className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-medium">{pnrData.distance} km</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Fare</p>
                  <p className="font-medium">₹{pnrData.ticketFare}</p>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Passenger Details ({pnrData.numberOfpassenger})
              </h4>
              <div className="space-y-4">
                {pnrData.passengerList.map((passenger) => (
                  <div
                    key={passenger.passengerSerialNumber}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center text-primary font-bold">
                        {passenger.passengerSerialNumber}
                      </div>
                      <div>
                        <p className="font-medium">Passenger {passenger.passengerSerialNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          Booked: {passenger.bookingStatusDetails}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      {getStatusIcon(passenger.currentStatus)}
                      <div>
                        <p className={`font-semibold ${getStatusColor(passenger.currentStatus)}`}>
                          {passenger.currentStatusDetails || getStatusLabel(passenger.currentStatus)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getStatusLabel(passenger.currentStatus)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Info */}
            <div className="px-6 pb-4">
              <div className="text-sm text-muted-foreground flex flex-wrap gap-4">
                <span>Booked on: {formatDate(pnrData.bookingDate)}</span>
                <span>Arrival: {formatDate(pnrData.arrivalDate)}</span>
                <span>Total Fare: ₹{pnrData.bookingFare}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-card/50 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={onReset}>
                Check Another PNR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PNRStatusCard;
