import { Users, Camera, DollarSign, CheckCircle, Mail } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface DashboardStats {
  totalClients: number;
  totalHeadshots: number;
  totalRevenue: number;
  completedProjects: number;
  pendingEmails: number;
}

interface StatsGridProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export function StatsGrid({ stats, isLoading = false }: StatsGridProps) {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <MetricCard
        title="Total Clients"
        value={stats.totalClients}
        icon={Users}
        trend={{ value: 12, isPositive: true }}
        glowColor="primary"
        className="animate-slide-in"
      />
      
      <MetricCard
        title="Headshots"
        value={stats.totalHeadshots}
        subtitle="Total captured"
        icon={Camera}
        trend={{ value: 8, isPositive: true }}
        glowColor="secondary"
        className="animate-slide-in"
      />
      
      <MetricCard
        title="Revenue"
        value={formatCurrency(stats.totalRevenue)}
        subtitle="Total earned"
        icon={DollarSign}
        trend={{ value: 15, isPositive: true }}
        glowColor="accent"
        className="animate-slide-in"
      />
      
      <MetricCard
        title="Completed"
        value={stats.completedProjects}
        subtitle="Projects done"
        icon={CheckCircle}
        trend={{ value: 5, isPositive: true }}
        glowColor="primary"
        className="animate-slide-in"
      />
      
      <MetricCard
        title="Emails"
        value={stats.pendingEmails}
        subtitle="Pending responses"
        icon={Mail}
        glowColor="secondary"
        className="animate-slide-in"
      />
    </div>
  );
}