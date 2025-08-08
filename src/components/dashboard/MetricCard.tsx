import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  glowColor?: "primary" | "secondary" | "accent";
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  glowColor = "primary"
}: MetricCardProps) {
  const trendColor = trend?.isPositive ? "text-accent" : "text-destructive";
  const trendSymbol = trend?.isPositive ? "+" : "-";

  return (
    <div className={cn(
      "glass-card p-6 hover-glow hover-scale group relative overflow-hidden",
      glowColor === "primary" && "hover:glow-primary",
      glowColor === "secondary" && "hover:glow-secondary", 
      glowColor === "accent" && "hover:glow-accent",
      className
    )}>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
          {trend && (
            <span className={cn("text-sm font-semibold", trendColor)}>
              {trendSymbol}{Math.abs(trend.value)}%
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            {title}
          </p>
          <p className="text-3xl font-bold cyber-glow text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="text-muted-foreground text-xs">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary/10 to-transparent rounded-tr-full" />
    </div>
  );
}