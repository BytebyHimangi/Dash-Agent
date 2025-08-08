import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";

interface RevenueChartProps {
  data?: any[];
  isLoading?: boolean;
}

export function RevenueChart({ data = [], isLoading = false }: RevenueChartProps) {
  return (
    <div className="glass-card p-6 hover-scale">
      <div className="mb-6">
        <h3 className="text-xl font-semibold cyber-glow mb-2">Revenue Trends</h3>
        <p className="text-muted-foreground text-sm">Monthly revenue and client acquisition</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--glass))',
                border: '1px solid hsl(var(--glass-border))',
                borderRadius: '8px',
                backdropFilter: 'blur(16px)',
                boxShadow: 'var(--shadow-glass)'
              }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}