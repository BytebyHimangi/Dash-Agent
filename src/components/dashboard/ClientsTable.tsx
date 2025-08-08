import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  email: string;
  headshots: number;
  price: number;
  status: "Completed" | "In Progress" | "Pending" | "Cancelled";
}

interface ClientsTableProps {
  clients?: Client[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function ClientsTable({ clients = [], isLoading = false, onRefresh }: ClientsTableProps) {
  const getStatusVariant = (status: Client["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-accent/20 text-accent border-accent/30";
      case "In Progress":
        return "bg-primary/20 text-primary border-primary/30";
      case "Pending":
        return "bg-warning/20 text-warning border-warning/30";
      case "Cancelled":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="glass-card p-6 hover-scale">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold cyber-glow mb-2">Recent Clients</h3>
          <p className="text-muted-foreground text-sm">Latest project updates and client information</p>
        </div>
        {onRefresh && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={isLoading}
            className="neon-border hover-glow"
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg neon-border">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border/50 bg-glass/30">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                  Client
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                  Headshots
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-muted-foreground">
                    No client data available
                  </td>
                </tr>
              ) : (
                clients.map((client, index) => (
                <tr 
                  key={client.id}
                  className="border-b border-glass-border/30 hover:bg-glass/20 transition-colors duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-foreground">{client.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-muted-foreground text-sm">{client.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-foreground font-semibold">{client.headshots}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-foreground font-semibold">
                      ₹{client.price.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className={cn("border", getStatusVariant(client.status))}>
                      {client.status}
                    </Badge>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}