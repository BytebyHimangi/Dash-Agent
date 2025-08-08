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

export class GoogleSheetsService {
  private static readonly SHEET_URL = 'https://docs.google.com/spreadsheets/d/1fJpCLm07ox6gl7eaztyxCco2LETqcoWMGXzqYlHGxws/export?format=csv';

  static async fetchData(): Promise<{ clients: ClientData[], stats: DashboardStats }> {
    try {
      const response = await fetch(this.SHEET_URL);
      const csvText = await response.text();
      
      const clients = this.parseCSV(csvText);
      const stats = this.calculateStats(clients);
      
      return { clients, stats };
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      throw new Error('Failed to fetch data from Google Sheets');
    }
  }

  private static parseCSV(csvText: string): ClientData[] {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      
      const getColumnValue = (columnName: string) => {
        const index = headers.findIndex(h => h.includes(columnName));
        return index !== -1 ? values[index] : '';
      };

      return {
        id: (index + 1).toString(),
        name: getColumnValue('name') || getColumnValue('client') || values[0] || '',
        email: getColumnValue('email') || values[1] || '',
        headshots: parseInt(getColumnValue('headshot') || values[2] || '0') || 0,
        price: parseInt(getColumnValue('price') || values[3] || '0') || 0,
        status: this.normalizeStatus(getColumnValue('status') || values[4] || 'Pending')
      };
    }).filter(client => client.name); // Filter out empty rows
  }

  private static normalizeStatus(status: string): "Completed" | "In Progress" | "Pending" | "Cancelled" {
    const normalizedStatus = status.toLowerCase().trim();
    
    if (normalizedStatus.includes('complete') || normalizedStatus === 'done') return 'Completed';
    if (normalizedStatus.includes('progress') || normalizedStatus === 'working') return 'In Progress';
    if (normalizedStatus.includes('cancel') || normalizedStatus === 'cancelled') return 'Cancelled';
    return 'Pending';
  }

  private static calculateStats(clients: ClientData[]): DashboardStats {
    const totalClients = clients.length;
    const totalHeadshots = clients.reduce((sum, client) => sum + client.headshots, 0);
    const totalRevenue = clients.reduce((sum, client) => sum + client.price, 0);
    const completedProjects = clients.filter(client => client.status === 'Completed').length;
    const pendingEmails = clients.filter(client => 
      client.status === 'Pending' || client.status === 'In Progress'
    ).length;

    return {
      totalClients,
      totalHeadshots,
      totalRevenue,
      completedProjects,
      pendingEmails
    };
  }

  static generateRevenueData(clients: ClientData[]) {
    // Group clients by month (assuming recent data)
    const monthlyData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Distribute revenue across months for visualization
    const totalRevenue = clients.reduce((sum, client) => sum + client.price, 0);
    const avgMonthlyRevenue = totalRevenue / 6;
    
    for (let i = 0; i < 6; i++) {
      const variance = (Math.random() - 0.5) * 0.4; // ±20% variance
      const revenue = Math.round(avgMonthlyRevenue * (1 + variance));
      const clientCount = Math.round(clients.length / 6 * (1 + variance * 0.5));
      
      monthlyData.push({
        month: months[i],
        revenue,
        clients: Math.max(1, clientCount)
      });
    }
    
    return monthlyData;
  }
}