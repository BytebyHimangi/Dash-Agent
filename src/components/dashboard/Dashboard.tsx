import { StatsGrid } from "./StatsGrid";
import { RevenueChart } from "./RevenueChart";
import { ClientsTable } from "./ClientsTable";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { GoogleSheetsService } from "@/services/googleSheetsService";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Activity, Database } from "lucide-react";

interface ClientData {
  id: string;
  name: string;
  email: string;
  headshots: number;
  price: number;
  status: "Completed" | "In Progress" | "Pending" | "Cancelled";
}

interface DashboardStats {
  totalClients: number;
  totalHeadshots: number;
  totalRevenue: number;
  completedProjects: number;
  pendingEmails: number;
}

export function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalClients: 0,
    totalHeadshots: 0,
    totalRevenue: 0,
    completedProjects: 0,
    pendingEmails: 0
  });
  const [clients, setClients] = useState<ClientData[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGoogleSheetsData();
  }, []);

  const fetchGoogleSheetsData = async () => {
    try {
      setIsLoading(true);
      const { clients: fetchedClients, stats } = await GoogleSheetsService.fetchData();
      const revenue = GoogleSheetsService.generateRevenueData(fetchedClients);
      
      setClients(fetchedClients);
      setDashboardStats(stats);
      setRevenueData(revenue);
      
      toast({
        title: "Data Updated",
        description: "Dashboard refreshed with latest Google Sheets data",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data from Google Sheets",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 glow-primary">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold cyber-glow bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Photography Dashboard
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Database className="h-4 w-4" />
              Real-time data from Google Sheets
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Dashboard Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Stats Grid */}
          <StatsGrid stats={dashboardStats} isLoading={isLoading} />

          {/* Charts and Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart data={revenueData} isLoading={isLoading} />
            <div className="glass-card p-6 hover-scale">
              <div className="mb-6">
                <h3 className="text-xl font-semibold cyber-glow mb-2">Performance Metrics</h3>
                <p className="text-muted-foreground text-sm">Key performance indicators and analytics</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/30">
                  <span className="text-muted-foreground">Conversion Rate</span>
                  <span className="text-xl font-bold text-accent">85.2%</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/30">
                  <span className="text-muted-foreground">Avg. Session Value</span>
                  <span className="text-xl font-bold text-primary">₹15,450</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/30">
                  <span className="text-muted-foreground">Client Satisfaction</span>
                  <span className="text-xl font-bold text-secondary">4.9/5</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/30">
                  <span className="text-muted-foreground">Booking Rate</span>
                  <span className="text-xl font-bold text-accent">92.1%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clients Table */}
          <ClientsTable clients={clients} isLoading={isLoading} onRefresh={fetchGoogleSheetsData} />
        </div>

        {/* Chatbot Sidebar */}
        <div className="xl:col-span-1">
          <div className="sticky top-6">
            <ChatBot onDataUpdate={fetchGoogleSheetsData} />
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="fixed top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl animate-float" />
      <div className="fixed bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
    </div>
  );
}