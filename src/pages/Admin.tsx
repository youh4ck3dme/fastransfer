import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Check, 
  X, 
  RefreshCw,
  ArrowLeft,
  Filter,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_location: string;
  dropoff_location: string;
  booking_date: string;
  booking_time: string;
  passengers: number;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const fetchBookings = async () => {
    if (!adminKey) return;
    
    setLoading(true);
    try {
      // Use edge function to fetch bookings with service role
      const response = await fetch(
        `https://ypquwjjkzpqhadsuanmd.supabase.co/functions/v1/admin-bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            action: "list",
            adminKey 
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Chyba pri načítaní rezervácií");
      }

      setBookings(data.bookings || []);
      setIsAuthenticated(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Chyba",
        description: error.message || "Nepodarilo sa načítať rezervácie",
        variant: "destructive",
      });
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `https://ypquwjjkzpqhadsuanmd.supabase.co/functions/v1/admin-bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            action: "update",
            bookingId,
            status: newStatus,
            adminKey 
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Chyba pri aktualizácii");
      }

      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
      );

      toast({
        title: "Úspech",
        description: `Status zmenený na: ${getStatusLabel(newStatus)}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating booking:", error);
      toast({
        title: "Chyba",
        description: error.message || "Nepodarilo sa aktualizovať rezerváciu",
        variant: "destructive",
      });
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Čakajúca";
      case "confirmed": return "Potvrdená";
      case "completed": return "Dokončená";
      case "cancelled": return "Zrušená";
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "confirmed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch = 
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropoff_location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("sk-SK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin | FastTransfer VIP</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gradient-gold">Admin Prístup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Zadajte admin kľúč..."
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchBookings()}
              />
              <Button 
                onClick={fetchBookings} 
                className="w-full bg-gradient-gold text-primary-foreground"
                disabled={loading || !adminKey}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Prihlásiť sa
              </Button>
              <Link to="/" className="block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Späť na hlavnú stránku
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | FastTransfer VIP</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gradient-gold">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Správa rezervácií FastTransfer VIP
                </p>
              </div>
            </div>
            <Button onClick={fetchBookings} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Obnoviť
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{bookings.length}</div>
                <div className="text-sm text-muted-foreground">Celkom</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {bookings.filter(b => b.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Čakajúce</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {bookings.filter(b => b.status === "confirmed").length}
                </div>
                <div className="text-sm text-muted-foreground">Potvrdené</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {bookings.filter(b => b.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Dokončené</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Hľadať podľa mena, emailu, lokácie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter podľa statusu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky</SelectItem>
                <SelectItem value="pending">Čakajúce</SelectItem>
                <SelectItem value="confirmed">Potvrdené</SelectItem>
                <SelectItem value="completed">Dokončené</SelectItem>
                <SelectItem value="cancelled">Zrušené</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground">Načítavam rezervácie...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">Žiadne rezervácie nenájdené</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Main Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-lg">{booking.customer_name}</h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusLabel(booking.status)}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-muted-foreground text-xs">Odkiaľ</div>
                              <div>{booking.pickup_location}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-muted-foreground text-xs">Kam</div>
                              <div>{booking.dropoff_location}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary" />
                            {formatDate(booking.booking_date)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-primary" />
                            {booking.booking_time}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-primary" />
                            {booking.passengers} os.
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <a 
                            href={`tel:${booking.customer_phone}`}
                            className="flex items-center gap-1.5 text-primary hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {booking.customer_phone}
                          </a>
                          <a 
                            href={`mailto:${booking.customer_email}`}
                            className="flex items-center gap-1.5 text-primary hover:underline"
                          >
                            <Mail className="h-4 w-4" />
                            {booking.customer_email}
                          </a>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap lg:flex-col gap-2">
                        {booking.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Potvrdiť
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Zrušiť
                            </Button>
                          </>
                        )}
                        {booking.status === "confirmed" && (
                          <Button 
                            size="sm" 
                            onClick={() => updateBookingStatus(booking.id, "completed")}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Dokončiť
                          </Button>
                        )}
                        {(booking.status === "completed" || booking.status === "cancelled") && (
                          <span className="text-xs text-muted-foreground">
                            Vytvorené: {formatDate(booking.created_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;